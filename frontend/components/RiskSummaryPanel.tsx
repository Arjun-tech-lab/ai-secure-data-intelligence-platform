'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, AlertTriangle, AlertCircle, Info, TrendingDown, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AnalysisResult {
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  totalFindings: number;
  findings: any[];
}

interface RiskSummaryPanelProps {
  result: AnalysisResult;
}

export default function RiskSummaryPanel({ result }: RiskSummaryPanelProps) {
  const { riskScore, riskLevel, totalFindings, findings } = result;
  const getRiskColor = (level: string): string => {
    switch (level) {
      case 'critical':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'high':
        return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'low':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      default:
        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <ShieldAlert className="h-6 w-6" />;
      case 'high':
        return <AlertTriangle className="h-6 w-6" />;
      case 'medium':
        return <AlertCircle className="h-6 w-6" />;
      case 'low':
        return <Info className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const criticalCount = findings.filter((f) => f.risk === 'critical').length;
  const highCount = findings.filter((f) => f.risk === 'high').length;
  const mediumCount = findings.filter((f) => f.risk === 'medium').length;
  const lowCount = findings.filter((f) => f.risk === 'low').length;

  return (
    <Card className="p-6 border-border space-y-6 sticky top-20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-widest">Risk Analysis</h3>
        
        {/* Main Risk Level Card */}
        <div className={`p-6 rounded-xl border-2 space-y-3 text-center bg-gradient-to-br ${getRiskColor(riskLevel)}`}>
          <div className="flex justify-center">
            <div className="rounded-full bg-background/20 p-3">
              {getRiskIcon(riskLevel)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Risk Level</p>
            <p className="text-3xl font-bold mt-2">{riskLevel.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Risk Score Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Overall Risk Score</span>
          <span className="text-lg font-bold text-accent">{riskScore}/100</span>
        </div>
        <Progress value={riskScore} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {riskScore >= 75 ? 'Critical - Immediate action required' : riskScore >= 50 ? 'High - Review soon' : riskScore >= 25 ? 'Medium - Monitor' : 'Low - Keep under review'}
        </p>
      </div>

      {/* Finding Breakdown */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Flame className="h-4 w-4 text-accent" />
          Finding Breakdown
        </p>
        
        <div className="space-y-2 text-sm">
          {criticalCount > 0 && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <span className="text-red-400 font-medium">Critical</span>
              <span className="text-red-400 font-bold">{criticalCount}</span>
            </div>
          )}
          {highCount > 0 && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <span className="text-orange-400 font-medium">High</span>
              <span className="text-orange-400 font-bold">{highCount}</span>
            </div>
          )}
          {mediumCount > 0 && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-yellow-400 font-medium">Medium</span>
              <span className="text-yellow-400 font-bold">{mediumCount}</span>
            </div>
          )}
          {lowCount > 0 && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400 font-medium">Low</span>
              <span className="text-blue-400 font-bold">{lowCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Total Stats */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg border border-accent/20">
          <span className="text-sm text-foreground font-medium">Total Issues Found</span>
          <span className="text-lg font-bold text-accent">{totalFindings}</span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-xs pt-2">
        <span className="h-2 w-2 bg-accent rounded-full animate-pulse" />
        <span className="text-muted-foreground">Analysis Complete</span>
      </div>
    </Card>
  );
}
