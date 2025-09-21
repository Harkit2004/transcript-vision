import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Upload, 
  ArrowRight, 
  Dna, 
  Brain, 
  TrendingUp,
  Microscope,
  Database,
  Zap
} from "lucide-react";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden shadow-prisma border-border/80 bg-card/95 backdrop-blur-sm">
        <div className="bg-gradient-scientific text-white p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="h-8 w-8" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 shadow-glow">
                PRISMA-Powered Analysis
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              PRISMA: Gene Expression Analysis
            </h1>
            <p className="text-xl opacity-90 mb-6 max-w-3xl">
              Transform raw transcriptome data into actionable insights using state-of-the-art 
              SCVI embeddings and multi-classification models to predict compound mechanisms of action.
            </p>
            <div className="flex gap-4">
              <Button variant="prisma" size="lg" asChild>
                <Link to="/upload" className="gap-2">
                  <Upload className="h-5 w-5" />
                  Start Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white/50 text-white hover:bg-white/20 hover:shadow-glow">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Workflow Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-prisma hover:shadow-glow transition-all duration-500 bg-card/90 backdrop-blur-sm border-border/80">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-scientific-blue/10 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-scientific-blue" />
            </div>
            <CardTitle className="text-lg">1. Upload AnnData</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Upload your AnnData file containing raw transcriptome data. 
              Our system accepts standard single-cell RNA-seq formats.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-prisma hover:shadow-glow transition-all duration-500 bg-card/90 backdrop-blur-sm border-border/80">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-scientific-teal/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-scientific-teal" />
            </div>
            <CardTitle className="text-lg">2. SCVI Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gene expression data is normalized and encoded using SCVI, 
              then decoded to create 30-dimensional embeddings.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-prisma hover:shadow-glow transition-all duration-500 bg-card/90 backdrop-blur-sm border-border/80">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-data-green/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-data-green" />
            </div>
            <CardTitle className="text-lg">3. Mechanism Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The processed embeddings are fed into our multi-classification 
              model to predict compound mechanisms of action.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="shadow-prisma bg-card/90 backdrop-blur-sm border-border/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Dna className="h-5 w-5 text-scientific-blue mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">SCVI Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Leverages Single-Cell Variational Inference for robust gene expression analysis
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Brain className="h-5 w-5 text-scientific-teal mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Multi-Classification</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced ML models trained to identify diverse mechanism categories
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Database className="h-5 w-5 text-data-green mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Normalized Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated data normalization and dimensionality reduction to 30D
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="h-5 w-5 text-analysis-purple mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Fast Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Efficient pipeline from raw data to actionable predictions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-subtle border-primary/30 shadow-prisma bg-card/80 backdrop-blur-sm">
        <CardContent className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Analyze Your Data?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Upload your AnnData file and discover the mechanisms of action 
            hidden in your transcriptome data with our SCVI-powered analysis pipeline.
          </p>
          <Button variant="prisma" size="lg" asChild>
            <Link to="/upload" className="gap-2">
              <Upload className="h-5 w-5" />
              Upload AnnData File
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;