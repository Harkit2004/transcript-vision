import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { Home, Upload, BarChart3, FileText, Microscope } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/upload", label: "Upload Data", icon: Upload },
    { path: "/results", label: "Results", icon: BarChart3 },
    { path: "/about", label: "About", icon: FileText },
  ];

  return (
    <Card className="p-4 shadow-prisma bg-card/98 backdrop-blur-sm border-border/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-scientific text-white shadow-glow">
            <Microscope className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">PRISMA</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Gene Expression Analysis</p>
          </div>
        </div>
        
        <nav className="flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "scientific" : "ghost"}
                size="sm"
                asChild
                className="gap-2"
              >
                <Link to={item.path}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};

export default Navigation;