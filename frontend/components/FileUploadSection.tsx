'use client';

import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Upload, FileText, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadSectionProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  textContent: string;
  onTextChange: (content: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export default function FileUploadSection({
  file,
  onFileChange,
  textContent,
  onTextChange,
  onAnalyze,
  isLoading,
}: FileUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      if (file.name.endsWith('.log') || file.name.endsWith('.txt')) {
        onFileChange(file);
        onTextChange('');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
      onTextChange('');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
    if (e.target.value.trim()) {
      onFileChange(null);
    }
  };

  return (
    <div className="space-y-0">
      {/* Tabs */}
      <div className="flex gap-0 border-b border-border rounded-t-lg overflow-hidden bg-card">
        <button
          onClick={() => {
            setActiveTab('upload');
            onTextChange('');
          }}
          className={cn(
            'flex-1 py-4 px-6 font-medium transition-colors border-b-2 -mb-px',
            activeTab === 'upload'
              ? 'bg-accent/5 text-accent border-accent'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          )}
        >
          <Upload className="h-4 w-4 inline mr-2" />
          Upload File
        </button>

        <button
          onClick={() => {
            setActiveTab('paste');
            onFileChange(null);
          }}
          className={cn(
            'flex-1 py-4 px-6 font-medium transition-colors border-b-2 -mb-px',
            activeTab === 'paste'
              ? 'bg-accent/5 text-accent border-accent'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          )}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Paste Content
        </button>
      </div>

      <Card className="border-t-0 rounded-t-none">
        {activeTab === 'upload' && (
          <div className="p-8">
            <div
              ref={dropZoneRef}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className={cn(
                'rounded-lg border-2 border-dashed p-12 text-center transition-colors',
                file
                  ? 'border-accent/50 bg-accent/5'
                  : 'border-border hover:border-accent/50 hover:bg-accent/5'
              )}
            >
              <Upload className="h-8 w-8 text-accent mx-auto mb-4" />

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".log,.txt"
                className="hidden"
              />

              <Button onClick={() => fileInputRef.current?.click()}>
                Choose File
              </Button>

              {file && (
                <div className="mt-4">
                  <p>{file.name}</p>
                  <Button
                    variant="outline"
                    onClick={() => onFileChange(null)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'paste' && (
          <div className="p-8">
            <textarea
              value={textContent}
              onChange={handleTextChange}
              className="w-full border p-4 rounded-lg min-h-40"
              placeholder="Paste logs here..."
            />
          </div>
        )}
      </Card>

      <div className="p-6 border-t border-border">
        <Button
          onClick={onAnalyze}
          disabled={isLoading || (!file && !textContent)}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Start Security Analysis
            </>
          )}
        </Button>
      </div>
    </div>
  );
}