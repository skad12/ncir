// src/components/ResearchSection.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ExternalLink,
  Download,
  Calendar,
  Users,
  BookOpen,
  Target,
  Database,
  Award,
} from "lucide-react";

const activeResearch = [
  {
    title: "AI-Powered Breast Cancer Detection in Nigerian Women",
    institution: "University of Lagos",
    principal: "Dr. Adebayo Ogundimu",
    status: "Active",
    funding: "₦45M",
    description:
      "Developing machine learning models for early breast cancer detection using mammography datasets from NCIR.",
    datasets: "Mammography (8,432 images)",
    publications: 3,
    deadline: "Dec 2024",
    type: "PhD Research",
  },
  {
    title: "Cervical Cancer Screening Enhancement Project",
    institution: "Ahmadu Bello University",
    principal: "Prof. Hauwa Salisu",
    status: "Recruiting",
    funding: "₦28M",
    description:
      "Large-scale study to improve cervical cancer screening accuracy using histopathological imaging data.",
    datasets: "Histopathology (12,156 images)",
    publications: 1,
    deadline: "Mar 2025",
    type: "Multi-center Study",
  },
  {
    title: "Lung Cancer Radiomics in Sub-Saharan Africa",
    institution: "University of Ibadan",
    principal: "Dr. Chioma Ezenwaka",
    status: "Analysis Phase",
    funding: "₦32M",
    description:
      "Radiomics analysis of lung cancer patterns specific to sub-Saharan African populations.",
    datasets: "CT Scans (6,789 images)",
    publications: 5,
    deadline: "Aug 2024",
    type: "International Collaboration",
  },
];

const datasetRequests = [
  {
    title: "Pediatric Brain Tumor Classification",
    requester: "Children's Hospital Lagos",
    urgency: "High",
    description:
      "Seeking MRI datasets of pediatric brain tumors for developing age-specific diagnostic AI models.",
    targetSize: "500+ cases",
    deadline: "Feb 2024",
    ethics: "Approved",
    contact: "dr.adunni@chl.org",
  },
  {
    title: "Prostate Cancer Staging Enhancement",
    requester: "Federal Medical Centre Kano",
    urgency: "Medium",
    description:
      "Multi-parametric MRI datasets needed for improving prostate cancer staging accuracy.",
    targetSize: "300+ cases",
    deadline: "May 2024",
    ethics: "Under Review",
    contact: "prof.ibrahim@fmck.edu.ng",
  },
];

export const ResearchSection: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500 text-white";
      case "Recruiting":
        return "bg-blue-500 text-white";
      case "Analysis Phase":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="space-y-8">
      {/* Active Research Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Active Research Projects</h2>
            <p className="text-sm text-gray-600">Ongoing studies utilizing NCIR datasets</p>
          </div>
          <Button variant="outline" className="inline-flex text-sm items-center gap-2">
            <BookOpen className="h-4 w-4 mr-1" />
            View All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeResearch.map((project, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  {/* status badge (use className to control color explicitly) */}
                  
                    <Badge className={`${getStatusColor(project.status)} `}>{project.status}</Badge>
                    <Badge className="bg-transparent text-xs border border-gray-200 text-gray-700 px-2 py-0.5"> {project.type} </Badge>
                 
                </div>

                <CardTitle className="text-lg leading-tight text-gray-800">{project.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{project.institution}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{project.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">PI:</span>
                    </div>
                    <p className="font-medium text-gray-800">{project.principal}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">Funding:</span>
                    </div>
                    <p className="font-medium text-gray-800">{project.funding}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Dataset:</span>
                    <span className="font-medium text-gray-800">{project.datasets}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Publications:</span>
                    <span className="font-medium text-gray-800">{project.publications}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Expected completion:</span>
                    <span className="font-medium text-gray-800">{project.deadline}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 inline-flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button variant="medical" size="sm" className="flex-1 inline-flex items-center justify-center">
                    <Award className="h-4 w-4 mr-1" />
                    Collaborate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dataset Requests */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dataset Requests</h2>
            <p className="text-sm text-gray-600">Researchers seeking specific cancer imaging datasets</p>
          </div>
          <Button variant="medical" className="inline-flex items-center text-sm gap-2">
            <Database className="h-4 w-4 mr-1" />
            Submit Request
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {datasetRequests.map((request, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${getUrgencyColor(request.urgency)} px-2 text-white py-0.5 text-xs`}>
                    {request.urgency} Priority
                  </Badge>
                  <Badge className="bg-blue-500 text-xs text-white border border-gray-200  px-3 py-1">
                    {request.ethics}
                  </Badge>
                </div>

                <CardTitle className="text-lg text-gray-800">{request.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{request.requester}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{request.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-sm text-gray-600">Target Size:</span>
                    <p className="font-medium text-gray-800">{request.targetSize}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Deadline:</span>
                    <p className="font-medium text-gray-800">{request.deadline}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">Contact Researcher</Button>
                  <Button variant="medical" size="sm" className="flex-1 inline-flex items-center justify-center">
                    <Download className="h-4 w-4 mr-1" />
                    Contribute Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Research Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">Research Impact</CardTitle>
          <CardDescription className="text-sm text-gray-600">How NCIR datasets are advancing cancer research in Nigeria</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-2">47</div>
              <p className="text-sm text-gray-600">Active Research Projects</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">156</div>
              <p className="text-sm text-gray-600">Published Papers</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500 mb-2">23</div>
              <p className="text-sm text-gray-600">AI Models Developed</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">89%</div>
              <p className="text-sm text-gray-600">Diagnostic Improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};