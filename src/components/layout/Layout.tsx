import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <Navigation />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;