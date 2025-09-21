import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart3, 
  Download, 
  FileText, 
  TrendingUp,
  Microscope,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

interface StoredResult {
  filename: string;
  prediction: object | null;
  model_endpoint: object | null;
  status: string;
  timestamp: number;
}

const Results = () => {
  const [activeTab, setActiveTab] = useState("results");
  const [results, setResults] = useState<StoredResult[]>([]);

  useEffect(() => {
    const loadResults = () => {
      const storedResults = localStorage.getItem('predictionResults');
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      }
    };
    loadResults();
  }, []);

  const clearResults = () => {
    localStorage.removeItem('predictionResults');
    setResults([]);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const isError = (status: string): boolean => {
    return status !== 'success';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-prisma bg-card/95 backdrop-blur-sm border-border/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-scientific text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">PRISMA Analysis Results</CardTitle>
                <p className="text-muted-foreground">
                  {results.length} analysis result{results.length !== 1 ? 's' : ''} saved
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {results.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearResults}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
              <Button variant="prisma" size="sm" asChild>
                <Link to="/upload">
                  New Analysis
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Results Content */}
      {results.length === 0 ? (
        <Card className="shadow-prisma bg-card/95 backdrop-blur-sm border-border/80">
          <CardContent className="p-8 text-center">
            <Microscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload an AnnData file to start your first PRISMA analysis.
            </p>
            <Button variant="prisma" asChild>
              <Link to="/upload">
                Start Analysis
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={index} className="shadow-prisma bg-card/95 backdrop-blur-sm border-border/80">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isError(result.status) ? (
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-scientific-blue" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{result.filename}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(result.timestamp)} • Status: {result.status}
                      </p>
                    </div>
                  </div>
                  <Badge variant={isError(result.status) ? "destructive" : "secondary"}>
                    {isError(result.status) ? "Error" : "Success"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Complete Response:</h4>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <pre className="text-xs overflow-auto max-h-48 whitespace-pre-wrap">
                        {JSON.stringify({
                          filename: result.filename,
                          prediction: result.prediction,
                          model_endpoint: result.model_endpoint,
                          status: result.status
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                  
                  {isError(result.status) && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Analysis failed with status: {result.status}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;