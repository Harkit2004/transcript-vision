import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  FileText, 
  TrendingUp,
  Microscope,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Results = () => {
  const [activeTab, setActiveTab] = useState("predictions");

  // Mock data for demonstration
  const mockPredictions = [
    { mechanism: "DNA Damage Response", confidence: 94.2, category: "High Confidence" },
    { mechanism: "Cell Cycle Arrest", confidence: 87.6, category: "High Confidence" },
    { mechanism: "Apoptosis Induction", confidence: 76.3, category: "Medium Confidence" },
    { mechanism: "Protein Synthesis Inhibition", confidence: 62.8, category: "Medium Confidence" },
    { mechanism: "Membrane Disruption", confidence: 43.1, category: "Low Confidence" }
  ];

  const mockEmbeddings = {
    originalDimensions: 18420,
    reducedDimensions: 30,
    varianceExplained: 89.4,
    processingTime: "2.3 seconds"
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-scientific-blue";
    if (confidence >= 60) return "text-scientific-teal";
    return "text-muted-foreground";
  };

  const getConfidenceBadge = (category: string) => {
    const colors = {
      "High Confidence": "bg-scientific-blue/10 text-scientific-blue border-scientific-blue/20",
      "Medium Confidence": "bg-scientific-teal/10 text-scientific-teal border-scientific-teal/20",
      "Low Confidence": "bg-muted text-muted-foreground border-border"
    };
    return colors[category as keyof typeof colors] || colors["Low Confidence"];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-scientific text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Analysis Results</CardTitle>
                <p className="text-muted-foreground">SCVI-processed gene expression predictions</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
              <Button variant="scientific" size="sm" asChild>
                <Link to="/upload">
                  New Analysis
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-scientific-blue" />
              <div>
                <p className="font-medium">Processing Complete</p>
                <p className="text-sm text-muted-foreground">SCVI analysis successful</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Microscope className="h-8 w-8 text-scientific-teal" />
              <div>
                <p className="font-medium">5 Mechanisms Identified</p>
                <p className="text-sm text-muted-foreground">Multi-class predictions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-data-green" />
              <div>
                <p className="font-medium">Processing Time</p>
                <p className="text-sm text-muted-foreground">{mockEmbeddings.processingTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Results */}
      <Card className="shadow-elegant">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="predictions">Mechanism Predictions</TabsTrigger>
              <TabsTrigger value="embeddings">SCVI Embeddings</TabsTrigger>
              <TabsTrigger value="details">Analysis Details</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Compound Mechanism of Action Predictions</h3>
              </div>
              
              <div className="space-y-4">
                {mockPredictions.map((prediction, index) => (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-muted-foreground">
                              #{index + 1}
                            </span>
                            <div>
                              <h4 className="font-medium">{prediction.mechanism}</h4>
                              <Badge 
                                variant="outline" 
                                className={getConfidenceBadge(prediction.category)}
                              >
                                {prediction.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                              {prediction.confidence}%
                            </p>
                            <p className="text-sm text-muted-foreground">Confidence</p>
                          </div>
                          <div className="w-24">
                            <Progress 
                              value={prediction.confidence} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="embeddings" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Microscope className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">SCVI Embedding Summary</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Dimensionality Reduction</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Original Dimensions</span>
                      <span className="font-bold">{mockEmbeddings.originalDimensions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Reduced Dimensions</span>
                      <span className="font-bold text-scientific-blue">{mockEmbeddings.reducedDimensions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Variance Explained</span>
                      <span className="font-bold text-scientific-teal">{mockEmbeddings.varianceExplained}%</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Processing Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Model Type</span>
                      <span className="font-bold">SCVI</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Processing Time</span>
                      <span className="font-bold">{mockEmbeddings.processingTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant="outline" className="bg-scientific-blue/10 text-scientific-blue border-scientific-blue/20">
                        Complete
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Technical Details</h3>
              </div>
              
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="prose prose-sm max-w-none">
                    <h4 className="text-base font-semibold mb-3">Analysis Pipeline</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Raw transcriptome data was loaded from the uploaded AnnData file</li>
                      <li>Gene expression matrix was normalized using standard SCVI preprocessing</li>
                      <li>SCVI model encoded the data into latent space representations</li>
                      <li>Latent representations were decoded to 30-dimensional embeddings</li>
                      <li>Multi-classification model predicted mechanism of action categories</li>
                      <li>Confidence scores were calculated based on prediction probabilities</li>
                    </ol>
                    
                    <h4 className="text-base font-semibold mb-3 mt-6">Model Information</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>SCVI Version:</strong> 1.0.3</p>
                        <p><strong>Embedding Dimensions:</strong> 30</p>
                        <p><strong>Training Epochs:</strong> 400</p>
                      </div>
                      <div>
                        <p><strong>Classification Model:</strong> Multi-class Neural Network</p>
                        <p><strong>Accuracy:</strong> 89.2%</p>
                        <p><strong>F1 Score:</strong> 0.87</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;