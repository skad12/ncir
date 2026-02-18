

"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { BookOpen, FileText, Users, Eye, Download, Calendar, Search, Filter } from "lucide-react";
import Navbar from "@/src/components/layouts/Navbar";

// Mock data for journal articles
const mockArticles = [
  {
    id: 1,
    title: "AI-Assisted Breast Cancer Detection in Nigerian Women: A Multi-Center Study",
    authors: ["Dr. Adebayo Ogundimu", "Prof. Chioma Nwafor", "Dr. Kemi Adeleke"],
    institution: "University of Lagos Teaching Hospital",
    type: "Dataset Article",
    status: "Published",
    volume: "2024",
    issue: "Q1",
    doi: "10.5281/ncir.2024.001",
    submissionDate: "2024-01-15",
    publishDate: "2024-03-20",
    views: 1847,
    downloads: 423,
    citations: 12,
    abstract: "This study presents a comprehensive dataset of 2,847 mammography images from Nigerian women, annotated by expert radiologists. The dataset includes diverse breast density patterns common in African populations and demonstrates the effectiveness of AI models trained on locally relevant data.",
    keywords: ["Breast Cancer", "Mammography", "AI Detection", "African Population"],
    datasetId: "NCIR-BC-2024-001",
    ethicsApproval: "LUTH-IRB-2023-045"
  },
  {
    id: 2,
    title: "Cervical Cancer Screening Using Low-Cost Imaging: A Technical Note",
    authors: ["Dr. Fatima Abdullahi", "Dr. Ibrahim Musa"],
    institution: "Ahmadu Bello University Teaching Hospital",
    type: "Technical Note",
    status: "Under Review",
    submissionDate: "2024-02-10",
    views: 234,
    downloads: 0,
    citations: 0,
    abstract: "This technical note describes a novel approach to cervical cancer screening using low-cost colposcopy equipment suitable for resource-limited settings in Sub-Saharan Africa.",
    keywords: ["Cervical Cancer", "Colposcopy", "Low-cost Imaging", "Screening"],
    ethicsApproval: "ABU-IRB-2023-089"
  },
  {
    id: 3,
    title: "MONAI-Based Liver Segmentation: Validation on West African Population",
    authors: ["Dr. Kwame Asante", "Dr. Ama Boateng", "Prof. Samuel Oppong"],
    institution: "University of Ghana Medical Centre",
    type: "Model Evaluation",
    status: "Published",
    volume: "2024",
    issue: "Q1",
    doi: "10.5281/ncir.2024.002",
    submissionDate: "2023-12-05",
    publishDate: "2024-02-28",
    views: 923,
    downloads: 187,
    citations: 8,
    abstract: "We validate a MONAI-based liver segmentation model on CT scans from 456 West African patients, demonstrating improved performance when training data includes regional anatomical variations.",
    keywords: ["Liver Segmentation", "MONAI", "CT Imaging", "West Africa"],
    datasetId: "NCIR-LV-2024-002",
    ethicsApproval: "UGMC-IRB-2023-067"
  }
];

const mockReviewers = [
  { id: 1, name: "Prof. Sarah Thompson", specialty: "Breast Imaging", institution: "Johns Hopkins" },
  { id: 2, name: "Dr. Michael Chen", specialty: "AI in Radiology", institution: "Stanford University" },
  { id: 3, name: "Prof. Amara Kone", specialty: "African Health Systems", institution: "University of Cape Town" }
];

const Journal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || article.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <Navbar/>
      
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              NCIR Journal of Cancer Imaging
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Open Access Platform for African Cancer Imaging Research
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Peer Reviewed</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>Open Access</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>International Editorial Board</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <div className="container mx-auto px-4 py-8 ">
        
        <Tabs value={activeTab} onValueChange={setActiveTab} >
          <TabsList className="grid w-full grid-cols-5 bg-gray-200 rounded-lg overflow-hidden">
            <TabsTrigger value="browse" className="rounded-md px-4 py-1.5 text-sm font-medium 
                 data-[state=active]:bg-white 
                 data-[state=active]:text-black 
                 data-[state=active]:shadow-sm" >Browse Articles</TabsTrigger>
            <TabsTrigger value="submit" className="rounded-md px-4 py-1.5 text-sm font-medium 
                 data-[state=active]:bg-white 
                 data-[state=active]:text-black 
                 data-[state=active]:shadow-sm" >Submit</TabsTrigger>
            <TabsTrigger value="review" className="rounded-md px-4 py-1.5 text-sm font-medium 
                 data-[state=active]:bg-white 
                 data-[state=active]:text-black 
                 data-[state=active]:shadow-sm">Review</TabsTrigger>
            <TabsTrigger value="editorial" className="rounded-md px-4 py-1.5 text-sm font-medium 
                 data-[state=active]:bg-white 
                 data-[state=active]:text-black 
                 data-[state=active]:shadow-sm">Editorial</TabsTrigger>
            <TabsTrigger value="about" className="rounded-md px-4 py-1.5 text-sm font-medium 
                 data-[state=active]:bg-white 
                 data-[state=active]:text-black 
                 data-[state=active]:shadow-sm">About</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search articles, authors, keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className=" border-gray-200 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Article Type" />
                    </SelectTrigger>
                    <SelectContent className='bg-white border-gray-200'>
                      <SelectItem value="all" className="hover:bg-gray-200">All Types</SelectItem>
                      <SelectItem value="Dataset Article" className="hover:bg-gray-200">Dataset Article</SelectItem>
                      <SelectItem value="Technical Note" className="hover:bg-gray-200">Technical Note</SelectItem>
                      <SelectItem value="Model Evaluation" className="hover:bg-gray-200">Model Evaluation</SelectItem>
                      <SelectItem value="Review" className="hover:bg-gray-200">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Articles List */}
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 cursor-pointer hover:text-green-500 "
                                  onClick={() => setSelectedArticle(article)}>
                          {article.title}
                        </CardTitle>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p><strong>Authors:</strong> {article.authors.join(", ")}</p>
                          <p><strong>Institution:</strong> {article.institution}</p>
                          {article.doi && <p><strong>DOI:</strong> {article.doi}</p>}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={article.status === "Published" ? "bg-green-500 text-white" : "bg-blue-500 text-white"}>
                          {article.status}
                        </Badge>
                        <Badge className="border-gray-200 ">{article.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                      {article.abstract}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.keywords.map((keyword, index) => (
                        <Badge key={index} className="border-gray-200 text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex space-x-4">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views} views
                        </span>
                        <span className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {article.downloads} downloads
                        </span>
                        {article.citations > 0 && (
                          <span>{article.citations} citations</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.publishDate || `Submitted ${article.submissionDate}`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Submit to NCIR Journal</CardTitle>
                <CardDescription>
                  Submit your cancer imaging research for peer review and publication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-2 border-dashed hover:border-green-500 cursor-pointer transition-colors">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <h3 className="font-semibold mb-2">Dataset Article</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Describe and publish annotated imaging datasets
                      </p>
                      <Button>Start Submission</Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6 border-2 border-dashed hover:border-green-500 cursor-pointer transition-colors">
                    <div className="text-center">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <h3 className="font-semibold mb-2">Technical Note</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Share technical methods and tools
                      </p>
                      <Button>Start Submission</Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6 border-2 border-dashed hover:border-green-500 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <h3 className="font-semibold mb-2">Model Evaluation</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Validate AI models on African populations
                      </p>
                      <Button>Start Submission</Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6 border-2 border-dashed hover:border-green-500 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Search className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <h3 className="font-semibold mb-2">Review Article</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Comprehensive reviews and meta-analyses
                      </p>
                      <Button>Start Submission</Button>
                    </div>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Submission Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Ethics approval (IRB/Ethics Committee)</li>
                      <li>✓ ORCID ID for all authors</li>
                      <li>✓ Data availability statement</li>
                      <li>✓ Conflict of interest declaration</li>
                      <li>✓ Institutional affiliation verification</li>
                      <li>✓ Compliance with NCIR data policies</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reviewer Dashboard</CardTitle>
                  <CardDescription>
                    Manage your peer review assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">3</div>
                          <div className="text-sm text-gray-500">Pending Reviews</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">12</div>
                          <div className="text-sm text-gray-500">Completed Reviews</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">8.4</div>
                          <div className="text-sm text-gray-500">Avg Review Time (days)</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Pending Reviews</h3>
                    {mockArticles.filter(a => a.status === "Under Review").map((article) => (
                      <Card key={article.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium mb-2">{article.title}</h4>
                              <p className="text-sm text-gray-500 pb-2">
                                Submitted: {article.submissionDate}
                              </p>
                              <Badge className="border-gray-200">{article.type}</Badge>
                            </div>
                            <div className="text-right space-y-2">
                              <Badge className="bg-blue-500 text-white">Due: Mar 15</Badge>
                              <div>
                                <Button size="sm">Start Review</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="editorial">
            <Card>
              <CardHeader>
                <CardTitle>Editorial Dashboard</CardTitle>
                <CardDescription>
                  Manage journal operations and editorial decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-gray-500">New Submissions</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">15</div>
                        <div className="text-sm text-gray-500">Under Review</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">45</div>
                        <div className="text-sm text-gray-500">Published</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">67%</div>
                        <div className="text-sm text-gray-500">Acceptance Rate</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Recent Editorial Actions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-200 rounded">
                      <span className="text-sm">Assigned reviewers for &quot;AI-Assisted Breast Cancer Detection&quot;</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-200 rounded">
                      <span className="text-sm">Accepted &quot;MONAI-Based Liver Segmentation&quot; for publication</span>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-200 rounded">
                      <span className="text-sm">Requested revisions for &quot;Cervical Cancer Screening&quot; study</span>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About NCIR Journal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The NCIR Journal of Cancer Imaging is an open-access, peer-reviewed publication 
                    dedicated to advancing cancer imaging research in Africa and globally. We focus 
                    on publishing high-quality datasets, technical innovations, and research findings 
                    that contribute to improved cancer diagnosis and treatment.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Scope & Focus</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Cancer imaging datasets from African populations</li>
                        <li>• AI model validation and benchmarking</li>
                        <li>• Technical methods and tools</li>
                        <li>• Ethical considerations in medical imaging</li>
                        <li>• Resource-limited setting adaptations</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Publication Types</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Dataset Articles</li>
                        <li>• Technical Notes</li>
                        <li>• Model Evaluation Studies</li>
                        <li>• Review Articles</li>
                        <li>• Ethical Case Studies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Editorial Board</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockReviewers.map((reviewer) => (
                      <Card key={reviewer.id}>
                        <CardContent className="pt-6 text-center">
                          <div className="w-16 h-16 bg-green-500/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <Users className="w-8 h-8 text-green-500" />
                          </div>
                          <h4 className="font-medium">{reviewer.name}</h4>
                          <p className="text-sm text-gray-500">{reviewer.specialty}</p>
                          <p className="text-xs text-gray-500">{reviewer.institution}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Journal;