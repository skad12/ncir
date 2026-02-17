// app/dashboard/researcher/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  Search,
  Download,
  FileText,
  Database,
  BarChart3,
  Eye,
  BookOpen,
  Calendar,
  Users,
} from "lucide-react";

import { useAuth } from "@/src/context/AuthProvider";

/* Mock data (unchanged from your snippet) */
const availableDatasets = [
  {
    id: "DS-BRC-001",
    title: "Nigerian Breast Cancer Mammography Dataset",
    description: "Comprehensive mammography dataset from 5 major hospitals across Nigeria",
    institution: "Lagos University Teaching Hospital",
    cancerType: "Breast Cancer",
    modality: "Mammography",
    images: 8432,
    patients: 2134,
    annotated: 95,
    dateAdded: "2023-12-15",
    size: "24.5 GB",
    access: "Approved",
    downloads: 47
  },
  {
    id: "DS-LNG-002",
    title: "Lung Cancer CT Scan Collection",
    description: "High-resolution CT scans with expert radiologist annotations",
    institution: "University of Ibadan",
    cancerType: "Lung Cancer",
    modality: "CT Scan",
    images: 6789,
    patients: 1897,
    annotated: 87,
    dateAdded: "2023-11-28",
    size: "45.2 GB",
    access: "Pending",
    downloads: 23
  },
  {
    id: "DS-CRV-003",
    title: "Cervical Cancer Histopathology Images",
    description: "Histopathological slides with detailed staging information",
    institution: "Ahmadu Bello University Teaching Hospital",
    cancerType: "Cervical Cancer",
    modality: "Histopathology",
    images: 12156,
    patients: 3045,
    annotated: 78,
    dateAdded: "2023-10-10",
    size: "18.7 GB",
    access: "Approved",
    downloads: 62
  }
];

const researchProjects = [
  {
    id: "RP-001",
    title: "Machine Learning for Early Breast Cancer Detection",
    researcher: "Dr. Adebayo Ogundimu",
    institution: "University of Lagos",
    status: "Active",
    startDate: "2023-09-01",
    datasets: ["DS-BRC-001"],
    progress: 75,
    publications: 2
  },
  {
    id: "RP-002",
    title: "Federated Learning for Cancer Diagnosis",
    researcher: "Prof. Sarah Ahmed",
    institution: "Bayero University Kano",
    status: "Planning",
    startDate: "2024-02-01",
    datasets: ["DS-LNG-002", "DS-CRV-003"],
    progress: 15,
    publications: 0
  }
];

const ROLE_ROUTES: Record<string, string> = {
  "super-admin": "/dashboard/superadmin",
  contributor: "/dashboard/contributor",
  annotator: "/dashboard/annotator",
  researcher: "/dashboard/researcher",
  "ethics-officer": "/dashboard/ethics-officer",
};

export default function ResearcherPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // local UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [cancerType, setCancerType] = useState<string>("all");
  const [modality, setModality] = useState<string>("all");
  const [accessStatus, setAccessStatus] = useState<string>("all");
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  // Redirect non-researchers
  useEffect(() => {
    if (!user) return; // still loading or unauthenticated
    if (user.role !== "researcher") {
      const route = ROLE_ROUTES[user.role ?? "contributor"] ?? "/";
      router.replace(route);
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading researcher portal…</div>
      </div>
    );
  }

  const getAccessColor = (access: string) => {
    switch (access) {
      case "Approved":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Denied":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // filtered datasets
  const filteredDatasets = availableDatasets.filter((d) => {
    const matchesSearch =
      !searchTerm ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.institution.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCancer = cancerType === "all" || d.cancerType.toLowerCase().includes(cancerType.toLowerCase());
    const matchesModality = modality === "all" || d.modality.toLowerCase().includes(modality.toLowerCase());
    const matchesAccess = accessStatus === "all" || d.access.toLowerCase() === accessStatus.toLowerCase();

    return matchesSearch && matchesCancer && matchesModality && matchesAccess;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Research Portal</span>
                <span className="text-xs text-muted-foreground">Datasets & Projects</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => {/* Export handler */}}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={logout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* content (pad for sticky header) */}
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Research Portal</h2>
            <p className="text-muted-foreground">Access and analyze cancer imaging datasets</p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">Researcher Portal</Badge>
        </div>

        <Tabs defaultValue="datasets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="datasets" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Browse Datasets</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>My Projects</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="datasets">
            <div className="space-y-6">
              {/* Search & Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dataset Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="search">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          className="pl-10"
                          placeholder="Search datasets..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cancer-type">Cancer Type</Label>
                      <Select value={cancerType} onValueChange={setCancerType}>
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="breast">Breast Cancer</SelectItem>
                          <SelectItem value="lung">Lung Cancer</SelectItem>
                          <SelectItem value="cervical">Cervical Cancer</SelectItem>
                          <SelectItem value="prostate">Prostate Cancer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modality">Modality</Label>
                      <Select value={modality} onValueChange={setModality}>
                        <SelectTrigger>
                          <SelectValue placeholder="All modalities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Modalities</SelectItem>
                          <SelectItem value="ct">CT Scan</SelectItem>
                          <SelectItem value="mri">MRI</SelectItem>
                          <SelectItem value="mammography">Mammography</SelectItem>
                          <SelectItem value="histopathology">Histopathology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="access">Access Status</Label>
                      <Select value={accessStatus} onValueChange={setAccessStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dataset Listing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredDatasets.map((dataset) => (
                  <Card key={dataset.id} className="h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getAccessColor(dataset.access)}>
                          {dataset.access}
                        </Badge>
                        <Badge variant="outline">{dataset.modality}</Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{dataset.title}</CardTitle>
                      <CardDescription>{dataset.institution}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{dataset.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Images:</span>
                          <p className="font-medium">{dataset.images.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Patients:</span>
                          <p className="font-medium">{dataset.patients.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Annotated:</span>
                          <p className="font-medium">{dataset.annotated}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <p className="font-medium">{dataset.size}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Added: {dataset.dateAdded}</span>
                        <span className="text-muted-foreground">{dataset.downloads} downloads</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedDataset(dataset.id)}>
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        {dataset.access === "Approved" ? (
                          <Button variant="medical" size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        ) : (
                          <Button variant="secondary" size="sm" className="flex-1">
                            <FileText className="h-3 w-3 mr-1" />
                            Request Access
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>My Research Projects</CardTitle>
                      <CardDescription>Track your ongoing research using NCIR datasets</CardDescription>
                    </div>
                    <Button variant="medical">
                      <FileText className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {researchProjects.map((project) => (
                      <Card key={project.id} className="border-l-4 border-l-primary">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{project.title}</h4>
                              <p className="text-sm text-muted-foreground">{project.researcher} • {project.institution}</p>
                            </div>
                            <Badge className={project.status === "Active" ? "bg-green-500" : "bg-blue-500"}>
                              {project.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-muted-foreground">Start Date:</span>
                              <p className="font-medium">{project.startDate}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Datasets:</span>
                              <p className="font-medium">{project.datasets.length}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Progress:</span>
                              <p className="font-medium">{project.progress}%</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Publications:</span>
                              <p className="font-medium">{project.publications}</p>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                            <Button variant="medical" size="sm">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Analytics
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <p className="text-xs text-muted-foreground">Datasets Accessed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-secondary">24,531</div>
                    <p className="text-xs text-muted-foreground">Images Downloaded</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <p className="text-xs text-muted-foreground">Active Projects</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-secondary">89GB</div>
                    <p className="text-xs text-muted-foreground">Total Downloaded</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Your research activity and dataset usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                    <p>Analytics dashboard will be implemented here</p>
                    <p className="text-sm">Track downloads, usage patterns, and research outcomes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}