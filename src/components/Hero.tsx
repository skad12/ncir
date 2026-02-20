// src/components/Hero.tsx
"use client";
import React from "react";
import { Button } from "./ui/button";
import { Shield, Database, Brain, Lock } from "lucide-react";

interface HeroProps {
  onGetStarted?: () => void;
}

export default function Hero({ onGetStarted = () => {} }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-white to-green-100  sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Nigeria&apos;s Leading
            <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Cancer Imaging Repository
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Secure, NDPR-compliant platform for collecting, storing, and sharing
            radiological and histopathological cancer imaging datasets for
            research and AI-based diagnosis.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={onGetStarted}
              variant="medical"
              size="lg"
              className="text-lg px-8"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8"
            >
              Learn More
            </Button>
          </div>

          {/* Attribution */}
          <p className="text-sm text-gray-500 mb-12">
            Developed by{" "}
            <span className="font-semibold text-green-600">
              Algorizmi Health Ltd
            </span>{" "}
            in collaboration with NICRAT
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            {/* Card 1 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                NDPR Compliant
              </h3>
              <p className="text-sm text-gray-600">
                Full compliance with Nigerian data protection regulations
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <Database className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Secure Storage
              </h3>
              <p className="text-sm text-gray-600">
                End-to-end encrypted medical imaging storage
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <Brain className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                AI Ready
              </h3>
              <p className="text-sm text-gray-600">
                Datasets prepared for machine learning and AI training
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Role-Based Access
              </h3>
              <p className="text-sm text-gray-600">
                Granular permissions for researchers and clinicians
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}