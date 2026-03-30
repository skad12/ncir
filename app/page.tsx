// app/page.tsx
"use client";

import Hero from "../src/components/Hero";
import NigeriaMap from "../src/components/NigeriaMap";
import { ResearchSection } from "../src/components/ResearchSection";
import { PublicDatasets } from "../src/components/PublicDatasets";
import { SubmitDataModal } from "../src/components/SubmitDataModal";
import { Button } from "../src/components/ui/button";
import { Upload } from "lucide-react";
import Navbar from "../src/components/layouts/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <Hero />

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
    </div>
  );
};

export default Index;