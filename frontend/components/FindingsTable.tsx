'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, AlertOctagon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Finding {
  type: string;
  risk: 'critical' | 'high' | 'medium' | 'low';
  lineNumber: number;
  message?: string;
}

interface FindingsTableProps {
  findings: Finding[];
}

export default function FindingsTable({ findings }: FindingsTableProps) {
  const getRiskStyles = (risk: string): { bg: string; border: string; badge: string } => {
    switch (risk) {
      case 'critical':
        return {
          bg: 'bg-red-500/5 hover:bg-red-500/10',
          border: 'border-red-500/20',
          badge: 'bg-red-500/20 text-red-400',
        };
      case 'high':
        return {
          bg: 'bg-orange-500/5 hover:bg-orange-500/10',
          border: 'border-orange-500/20',
          badge: 'bg-orange-500/20 text-orange-400',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-500/5 hover:bg-yellow-500/10',
          border: 'border-yellow-500/20',
          badge: 'bg-yellow-500/20 text-yellow-400',
        };
      case 'low':
        return {
          bg: 'bg-blue-500/5 hover:bg-blue-500/10',
          border: 'border-blue-500/20',
          badge: 'bg-blue-500/20 text-blue-400',
        };
      default:
        return {
          bg: 'bg-gray-500/5 hover:bg-gray-500/10',
          border: 'border-gray-500/20',
          badge: 'bg-gray-500/20 text-gray-400',
        };
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical':
        return <AlertOctagon className="h-4 w-4 text-red-400" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const criticalCount = findings.filter(f => f.risk === 'critical').length;
  const highCount = findings.filter(f => f.risk === 'high').length;
  const mediumCount = findings.filter(f => f.risk === 'medium').length;
  const lowCount = findings.filter(f => f.risk === 'low').length;

  return (
    <Card className="border-border space-y-0 overflow-hidden bg-gradient-to-br from-card via-card to-card/50">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Security Findings</h3>
        
        {/* Risk Count Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {criticalCount > 0 && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center hover:bg-red-500/15 transition-colors">
              <p className="text-xs text-red-400 font-semibold uppercase tracking-wide">Critical</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{criticalCount}</p>
            </div>
          )}
          {highCount > 0 && (
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-center hover:bg-orange-500/15 transition-colors">
              <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide">High</p>
              <p className="text-2xl font-bold text-orange-400 mt-1">{highCount}</p>
            </div>
          )}
          {mediumCount > 0 && (
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center hover:bg-yellow-500/15 transition-colors">
              <p className="text-xs text-yellow-400 font-semibold uppercase tracking-wide">Medium</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">{mediumCount}</p>
            </div>
          )}
          {lowCount > 0 && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center hover:bg-blue-500/15 transition-colors">
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">Low</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">{lowCount}</p>
            </div>
          )}
        </div>

        {/* Findings List */}
        <div className="space-y-2 max-h-[500px] overflow-y-auto px-6 pb-6">
          {findings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No findings detected</p>
            </div>
          ) : (
            findings.map((finding, index) => {
              const styles = getRiskStyles(finding.risk);
              return (
                <div
                  key={index}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all cursor-pointer group',
                    styles.bg,
                    styles.border
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                        {getRiskIcon(finding.risk)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{finding.type}</p>
                          <span className="text-xs font-mono text-muted-foreground bg-background/40 px-2 py-1 rounded">
                            L{finding.lineNumber}
                          </span>
                        </div>
                        {finding.message && (
                          <p className="text-sm text-muted-foreground leading-relaxed">{finding.message}</p>
                        )}
                      </div>
                    </div>
                    <Badge
                      className={cn('flex-shrink-0 text-xs font-bold px-2.5 py-1.5', styles.badge)}
                      variant="outline"
                    >
                      {finding.risk.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
}
