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

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
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
      setUploadComplete(false);
    }
  }, [toast]);

  const handleUpload = useCallback(async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadProgress(100);
      setUploadComplete(true);
      
      toast({
        title: "Upload successful!",
        description: "Your AnnData file has been processed and is ready for analysis.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      clearInterval(interval);
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
      <Card className="shadow-elegant">
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
              The SCVI model will process this data to generate 30-dimensional gene expression embeddings.
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
                    {uploadProgress < 30 && "Uploading file..."}
                    {uploadProgress >= 30 && uploadProgress < 60 && "Validating data format..."}
                    {uploadProgress >= 60 && uploadProgress < 90 && "Processing with SCVI..."}
                    {uploadProgress >= 90 && "Finalizing analysis..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Success */}
          {uploadComplete && (
            <Card className="bg-scientific-blue/5 border-scientific-blue/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-scientific-blue" />
                  <div className="flex-1">
                    <p className="font-medium">Analysis Complete</p>
                    <p className="text-sm text-muted-foreground">
                      Your gene expression data has been successfully processed into 30D embeddings.
                    </p>
                  </div>
                  <Button variant="scientific" asChild>
                    <Link to="/results" className="gap-2">
                      View Results
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Button */}
          {file && !uploadComplete && (
            <Button 
              onClick={handleUpload} 
              disabled={isUploading}
              size="lg"
              className="w-full"
              variant="scientific"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Start SCVI Analysis
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* File Requirements */}
      <Card className="shadow-elegant">
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