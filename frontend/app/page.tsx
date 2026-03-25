'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Upload, Shield, TrendingUp, AlertTriangle, Lock, Eye, Zap, Check } from 'lucide-react';
import FileUploadSection from '@/components/FileUploadSection';
import RiskSummaryPanel from '@/components/RiskSummaryPanel';
import FindingsTable from '@/components/FindingsTable';
import AIInsightsPanel from '@/components/AIInsightsPanel';
import { analyzeFile } from "../services/api";
import LogViewer from "@/components/LogViewer";

interface Finding {
  type: string;
  risk: 'critical' | 'high' | 'medium' | 'low';
  lineNumber: number;
  message?: string;
}

interface AnalysisResult {
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  totalFindings: number;
  findings: Finding[];
  aiSummary: string;
  aiInsights: string[];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [rawText, setRawText] = useState<string>('');



const handleAnalyze = async () => {
  setLoading(true);
  setError("");
  

  try {
    let fileToSend: File | Blob;

    if (file) {
  const text = await file.text();
  setRawText(text);
  fileToSend = file;
} else if (textContent) {
  setRawText(textContent);
  fileToSend = new Blob([textContent], { type: "text/plain" });

    } else {
      setError("Please upload a file or paste log content");
      setLoading(false);
      return;
    }

    const raw = await analyzeFile(fileToSend);

const formatted = {
  riskScore: raw.risk_score,
  riskLevel: raw.risk_level,
  totalFindings: raw.findings.length,
  findings: raw.findings.map((f: any) => ({
    type: f.type,
    risk: f.risk,
    lineNumber: f.line,
  })),
  aiSummary: raw.summary,
  aiInsights: raw.insights,
};

setResult(formatted);

  } catch (err) {
    setError("Failed to analyze file. Make sure backend is running.");
  } finally {
    setLoading(false);
  }
};

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'critical':
        return 'text-red-400';
      case 'high':
        return 'text-orange-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRiskBgColor = (risk: string): string => {
    switch (risk) {
      case 'critical':
        return 'bg-red-500/20 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 border-blue-500/30';
      default:
        return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const getRiskLevelColor = (level: string): 'destructive' | 'default' | 'outline' | 'secondary' => {
    switch (level) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-3 shadow-lg shadow-primary/20">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Secure Data Intelligence</h1>
                <p className="text-xs text-muted-foreground">Enterprise Security Analysis Platform</p>
              </div>
            </div>
            <Badge className="gap-2 bg-accent/20 text-accent border border-accent/50 hover:bg-accent/30">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              AI Powered
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Hero Section with Info Cards */}
        {!result && !loading && (
          <div className="mb-12">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Why Security Analysis Matters</h2>
              <p className="text-base text-muted-foreground max-w-3xl">
                In today's threat landscape, proactive security analysis is critical. Log files contain vital clues about system health, user activity, and potential security incidents.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-border bg-card/50 backdrop-blur-sm p-6 hover:bg-card/80 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3 mt-1">
                    <Eye className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Early Threat Detection</h3>
                    <p className="text-sm text-muted-foreground">Identify suspicious patterns and anomalies before they become serious security incidents.</p>
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-sm p-6 hover:bg-card/80 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3 mt-1">
                    <Lock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Compliance & Auditing</h3>
                    <p className="text-sm text-muted-foreground">Meet regulatory requirements and maintain detailed records of system access and activities.</p>
                  </div>
                </div>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-sm p-6 hover:bg-card/80 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-accent/10 p-3 mt-1">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Faster Response</h3>
                    <p className="text-sm text-muted-foreground">AI-powered analysis accelerates incident response time, reducing damage and downtime.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Upload & Results */}
          <div className="lg:col-span-2 space-y-6">
            <FileUploadSection
              file={file}
              textContent={textContent}
              onFileChange={setFile}
              onTextChange={setTextContent}
              onAnalyze={handleAnalyze}
              isLoading={loading}
            />
              {result && (
              <>
                <FindingsTable findings={result.findings} />

                {/* ✅ BONUS FEATURE ADDED */}
                <LogViewer rawText={rawText} findings={result.findings} />
              </>
            )}

            {error && (
              <Card className="border border-destructive bg-destructive/10 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Analysis Error</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
              </Card>
            )}

            {loading && (
              <Card className="p-8 text-center border-dashed border-accent/50 bg-accent/5">
                <Spinner className="mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Analyzing your file with AI intelligence...</p>
                <p className="text-xs text-muted-foreground mt-2">This typically takes 10-30 seconds</p>
              </Card>
            )}

            {result && (
              <>
                <FindingsTable findings={result.findings} />
              </>
            )}

            {!result && !loading && !file && !textContent && (
              <Card className="p-12 text-center border-dashed border-border">
                <Upload className="h-12 w-12 mx-auto mb-4 text-accent/60" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Upload a log file or paste your content to begin AI-powered security analysis
                </p>
              </Card>
            )}
          </div>

          {/* Right Column - Risk Summary & AI Insights */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            {result && (
              <>
                <RiskSummaryPanel result={result} />
                <AIInsightsPanel insights={result.aiInsights} summary={result.aiSummary} />
              </>
            )}

            {!result && !loading && (
              <div className="space-y-4">
                <Card className="border-border bg-card/50 backdrop-blur-sm p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    What We Analyze
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent">•</span>
                      <span>Authentication failures and brute force attempts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">•</span>
                      <span>Unauthorized access patterns</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">•</span>
                      <span>Privilege escalation indicators</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">•</span>
                      <span>Suspicious command execution</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">•</span>
                      <span>Anomalous network traffic patterns</span>
                    </li>
                  </ul>
                </Card>

                <Card className="border-border bg-card/50 backdrop-blur-sm p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                    Risk Severity Levels
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Critical</span>
                      <Badge className="bg-destructive/20 text-destructive border-destructive/50">Immediate Action</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">High</span>
                      <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/50">Urgent</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Medium</span>
                      <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">Review Soon</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Low</span>
                      <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">Monitor</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
