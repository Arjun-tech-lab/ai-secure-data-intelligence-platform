'use client';

interface Props {
  rawText: string;
  findings: any[];
}

export default function LogViewer({ rawText, findings }: Props) {
  const lines = rawText.split('\n');

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-500/20 border-red-500';
      case 'high': return 'bg-orange-500/20 border-orange-500';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500';
      case 'low': return 'bg-blue-500/20 border-blue-500';
      default: return '';
    }
  };

  return (
    <div className="mt-6 border rounded-lg p-4 bg-black/40">
      <h3 className="mb-3 font-semibold text-white">Raw Log Analysis</h3>

      <div className="space-y-1 text-sm font-mono">
        {lines.map((line, index) => {
          const finding = findings.find(f => f.lineNumber === index + 1);

          return (
            <div
              key={index}
              className={`flex gap-4 px-3 py-1 rounded ${
                finding ? getRiskColor(finding.risk) : ''
              }`}
            >
              <span className="text-gray-400 w-8">{index + 1}</span>
              <span className="text-white">{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}