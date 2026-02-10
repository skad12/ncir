"use client";

import { useState } from "react";
import Hero from "../src/components/Hero";
import { LoginModal } from "../src/components/LoginModal";
import { Dashboard } from "../src/components/Dashboard";
import NigeriaMap from "../src/components/NigeriaMap";
import { ResearchSection } from "../src/components/ResearchSection";
import { PublicDatasets } from "../src/components/PublicDatasets";
import { SubmitDataModal } from "../src/components/SubmitDataModal";
import { Button } from "../src/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsLoggedIn(true);
    toast.success(`Welcome to NCIR! Logged in as ${role.replace("-", " ")}`);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    toast.info("Logged out successfully");
  };

  if (isLoggedIn) {
    return <Dashboard userRole={userRole} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <Hero onGetStarted={handleLoginClick} />

      {/* Submit Data Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Contribute to Cancer Research
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your cancer imaging data with the research community. Help advance
            AI-driven diagnostics and improve patient outcomes across Nigeria.
          </p>

          <SubmitDataModal>
            <Button variant="medical" size="lg" className="inline-flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Submit Your Data
            </Button>
          </SubmitDataModal>
        </div>
      </section>

      {/* Public datasets */}
      <PublicDatasets />

      {/* Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <NigeriaMap />
      </div>

      {/* Research */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="research">
        <ResearchSection />
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;