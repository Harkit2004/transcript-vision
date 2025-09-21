import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Microscope, 
  Brain, 
  Database,
  ArrowRight,
  Github,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Introduction */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-scientific text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">About SCVI Gene Analysis</CardTitle>
              <p className="text-muted-foreground">
                Understanding the technology behind mechanism of action prediction
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Our platform leverages cutting-edge computational biology techniques to transform 
            raw transcriptome data into actionable insights about compound mechanisms of action. 
            By combining Single-Cell Variational Inference (SCVI) with advanced machine learning, 
            we enable researchers to predict how compounds affect cellular processes.
          </p>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-primary" />
            Core Technologies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-scientific-blue/5 border border-scientific-blue/20">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-scientific-blue" />
                  <h3 className="font-semibold">SCVI (Single-Cell Variational Inference)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  A probabilistic framework for analyzing single-cell RNA sequencing data, 
                  enabling robust dimensionality reduction and normalization of gene expression profiles.
                </p>
                <Badge variant="outline" className="mt-2 bg-scientific-blue/10 text-scientific-blue border-scientific-blue/20">
                  Dimensionality Reduction
                </Badge>
              </div>
              
              <div className="p-4 rounded-lg bg-scientific-teal/5 border border-scientific-teal/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-scientific-teal" />
                  <h3 className="font-semibold">Multi-Classification Neural Networks</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Deep learning models trained on processed gene expression embeddings to 
                  predict compound mechanisms of action across multiple biological pathways.
                </p>
                <Badge variant="outline" className="mt-2 bg-scientific-teal/10 text-scientific-teal border-scientific-teal/20">
                  Machine Learning
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-data-green/5 border border-data-green/20">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-data-green" />
                  <h3 className="font-semibold">AnnData Integration</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Native support for AnnData format, the standard for annotated data matrices 
                  in computational biology, ensuring seamless integration with existing workflows.
                </p>
                <Badge variant="outline" className="mt-2 bg-data-green/10 text-data-green border-data-green/20">
                  Data Format
                </Badge>
              </div>
              
              <div className="p-4 rounded-lg bg-analysis-purple/5 border border-analysis-purple/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-5 w-5 text-analysis-purple" />
                  <h3 className="font-semibold">Automated Pipeline</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  End-to-end automated processing from raw gene expression data to 
                  interpretable mechanism predictions with confidence scoring.
                </p>
                <Badge variant="outline" className="mt-2 bg-analysis-purple/10 text-analysis-purple border-analysis-purple/20">
                  Automation
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Details */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Analysis Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Data Upload & Validation</h4>
                <p className="text-sm text-muted-foreground">
                  AnnData files are uploaded and validated for proper format and gene expression content.
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-scientific-blue text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">SCVI Preprocessing</h4>
                <p className="text-sm text-muted-foreground">
                  Raw transcriptome data is normalized and prepared for variational inference modeling.
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-scientific-teal text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Encoding & Decoding</h4>
                <p className="text-sm text-muted-foreground">
                  SCVI model encodes gene expression into latent space, then decodes to 30-dimensional embeddings.
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-data-green text-white flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Mechanism Prediction</h4>
                <p className="text-sm text-muted-foreground">
                  Processed embeddings are fed into multi-classification models to predict compound mechanisms.
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-analysis-purple text-white flex items-center justify-center text-sm font-bold">
                5
              </div>
              <div>
                <h4 className="font-semibold mb-1">Results & Confidence Scoring</h4>
                <p className="text-sm text-muted-foreground">
                  Predictions are ranked by confidence scores and presented with detailed analysis summaries.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Model Performance</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall Accuracy:</span>
                  <span className="font-medium">89.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">F1 Score:</span>
                  <span className="font-medium">0.87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Training Dataset:</span>
                  <span className="font-medium">10,000+ compounds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mechanism Categories:</span>
                  <span className="font-medium">25+ pathways</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">System Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max File Size:</span>
                  <span className="font-medium">500 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Time:</span>
                  <span className="font-medium">~3-10 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supported Formats:</span>
                  <span className="font-medium">.h5ad, .h5, .csv</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gene Coverage:</span>
                  <span className="font-medium">18,000+ genes</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card className="bg-gradient-subtle border-primary/20 shadow-elegant">
        <CardContent className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Upload your AnnData file and experience the power of SCVI-driven 
            mechanism of action prediction for your transcriptome research.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="scientific" size="lg" asChild>
              <Link to="/upload" className="gap-2">
                Start Analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;