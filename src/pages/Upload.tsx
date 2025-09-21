import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Info,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

interface PredictionResult {
  filename: string;
  prediction: object | null;
  model_endpoint: object | null;
  status: string;
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Validate file type (h5ad is typical for AnnData)
      const validExtensions = ['.h5ad', '.h5', '.csv', '.tsv'];
      const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
      
      if (!validExtensions.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload an AnnData file (.h5ad) or compatible format (.h5, .csv, .tsv)",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
      setResult(null);
    }
  }, [toast]);

  const handleUpload = useCallback(async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data: PredictionResult = await response.json();
      setResult(data);

      // Save to local storage
      const existingResults = JSON.parse(localStorage.getItem('predictionResults') || '[]');
      const newResults = [...existingResults, { ...data, timestamp: Date.now() }];
      localStorage.setItem('predictionResults', JSON.stringify(newResults));

      setUploadProgress(100);
      
      toast({
        title: "Analysis complete!",
        description: "Your file has been processed successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [file, toast]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Create a mock file input change event
      const mockInput = document.createElement('input');
      mockInput.type = 'file';
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      mockInput.files = dataTransfer.files;
      
      const mockEvent = {
        target: mockInput
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(mockEvent);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-prisma bg-card/95 backdrop-blur-sm border-border/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-6 w-6 text-primary" />
            Upload AnnData File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Upload your AnnData file (.h5ad) containing single-cell RNA-seq data. 
              The PRISMA AI model will process this data to generate 30-dimensional gene expression embeddings.
            </AlertDescription>
          </Alert>

          {/* Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {file ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-lg">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    AnnData File Ready
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <UploadIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drop your AnnData file here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".h5ad,.h5,.csv,.tsv"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm font-medium">Processing your data...</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    Uploading and analyzing file...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Display */}
          {result && (
            <Card className="bg-scientific-blue/10 border-scientific-blue/30 shadow-glow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {result.status !== 'success' ? (
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-scientific-blue" />
                    )}
                    <div>
                      <p className="font-medium">
                        {result.status !== 'success' ? 'Analysis Error' : 'Analysis Complete'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        File: {result.filename} • Status: {result.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Complete Response:</h4>
                    <pre className="text-xs overflow-auto max-h-48 whitespace-pre-wrap">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => {setResult(null); setFile(null);}}>
                      Upload Another File
                    </Button>
                    <Button variant="prisma" asChild>
                      <Link to="/results" className="gap-2">
                        View All Results
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Button */}
          {file && !result && !isUploading && (
            <Button 
              onClick={handleUpload} 
              size="lg"
              className="w-full"
              variant="prisma"
            >
              <UploadIcon className="h-4 w-4 mr-2" />
              Start PRISMA Analysis
            </Button>
          )}
        </CardContent>
      </Card>

      {/* File Requirements */}
      <Card className="shadow-prisma bg-card/90 backdrop-blur-sm border-border/80">
        <CardHeader>
          <CardTitle className="text-lg">File Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AnnData (.h5ad) - Recommended</li>
                <li>• HDF5 (.h5)</li>
                <li>• Comma-separated (.csv)</li>
                <li>• Tab-separated (.tsv)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Data Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Single-cell RNA-seq data</li>
                <li>• Gene expression matrix</li>
                <li>• Standard normalization preferred</li>
                <li>• Maximum file size: 500MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;