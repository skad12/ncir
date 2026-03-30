
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import {
  BookOpen,
  FileText,
  Users,
  Eye,
  Download,
  Calendar,
  Search,
} from "lucide-react";
import Navbar from "@/src/components/layouts/Navbar";
import { listJournals, type JournalItem } from "@/src/services/journalApi";

type JournalArticleView = {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  type: string;
  status: "Published" | "Under Review";
  doi?: string;
  publishDate?: string;
  views: number;
  downloads: number;
  citations: number;
  abstract: string;
  keywords: string[];
};

const mockReviewers = [
  { id: 1, name: "Prof. Sarah Thompson", specialty: "Breast Imaging", institution: "Johns Hopkins" },
  { id: 2, name: "Dr. Michael Chen", specialty: "AI in Radiology", institution: "Stanford University" },
  { id: 3, name: "Prof. Amara Kone", specialty: "African Health Systems", institution: "University of Cape Town" },
];

const normalizeNumber = (value: string | number | null | undefined) => {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const toViewModel = (item: JournalItem): JournalArticleView => {
  const isPublished = Boolean(item.status);

  return {
    id: item.id,
    title: item.title || "Untitled Journal",
    authors: item.authors
      ? item.authors.split(",").map((a) => a.trim()).filter(Boolean)
      : [],
    institution: item.institution || "N/A",
    type: item.type || "Journal Article",
    status: isPublished ? "Published" : "Under Review",
    doi: item.doi || undefined,
    publishDate: item.pub_date ? new Date(item.pub_date).toLocaleDateString() : undefined,
    views: normalizeNumber(item.views),
    downloads: normalizeNumber(item.downloads),
    citations: normalizeNumber(item.citations),
    abstract: item.content || "No abstract/content provided.",
    keywords: item.type ? [item.type] : [],
  };
};

const Journal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<JournalArticleView | null>(null);
  const [articles, setArticles] = useState<JournalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadJournals = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await listJournals();
        if (mounted) setArticles(data);
      } catch (err) {
        if (mounted) {
          setError("Failed to load journal articles.");
          setArticles([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadJournals();

    return () => {
      mounted = false;
    };
  }, []);

  const normalizedArticles = useMemo(
    () => articles.map(toViewModel),
    [articles]
  );

  const filteredArticles = normalizedArticles.filter((article) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      article.title.toLowerCase().includes(search) ||
      article.authors.some((author) => author.toLowerCase().includes(search)) ||
      article.institution.toLowerCase().includes(search);

    const matchesFilter = filterType === "all" || article.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              NCIR Journal of Cancer Imaging
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Open Access Platform for African Cancer Imaging Research
            </p>
            <div className="flex justify-center space-x-6 text-sm flex-wrap gap-3">
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

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-200 rounded-lg overflow-hidden">
            <TabsTrigger value="browse" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm">
              Browse Articles
            </TabsTrigger>
            <TabsTrigger value="submit" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm">
              Submit
            </TabsTrigger>
            <TabsTrigger value="review" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm">
              Review
            </TabsTrigger>
            <TabsTrigger value="editorial" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm">
              Editorial
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-md px-4 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="flex-1">
                    <Input
                      placeholder="Search articles, authors, institutions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-gray-200 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Article Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="Dataset Article">Dataset Article</SelectItem>
                      <SelectItem value="Technical Note">Technical Note</SelectItem>
                      <SelectItem value="Model Evaluation">Model Evaluation</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {loading && (
              <Card>
                <CardContent className="py-10 text-center text-gray-500">
                  Loading journal articles...
                </CardContent>
              </Card>
            )}

            {!loading && error && (
              <Card>
                <CardContent className="py-10 text-center text-red-500">
                  {error}
                </CardContent>
              </Card>
            )}

            {!loading && !error && filteredArticles.length === 0 && (
              <Card>
                <CardContent className="py-10 text-center text-gray-500">
                  No journal articles found.
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle
                          className="text-lg mb-2 cursor-pointer hover:text-green-500"
                          onClick={() => setSelectedArticle(article)}
                        >
                          {article.title}
                        </CardTitle>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>
                            <strong>Authors:</strong>{" "}
                            {article.authors.length > 0 ? article.authors.join(", ") : "N/A"}
                          </p>
                          <p>
                            <strong>Institution:</strong> {article.institution}
                          </p>
                          {article.doi && (
                            <p>
                              <strong>DOI:</strong> {article.doi}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge
                          className={
                            article.status === "Published"
                              ? "bg-green-500 text-white"
                              : "bg-blue-500 text-white"
                          }
                        >
                          {article.status}
                        </Badge>
                        <Badge className="border-gray-200">{article.type}</Badge>
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

                    <div className="flex justify-between items-center text-xs text-gray-500 gap-4 flex-wrap">
                      <div className="flex space-x-4 flex-wrap gap-2">
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
                        {article.publishDate || "No publish date"}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review">
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
              </CardContent>
            </Card>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About NCIR Journal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The NCIR Journal of Cancer Imaging is an open-access, peer-reviewed publication
                  dedicated to advancing cancer imaging research in Africa and globally.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Scope & Focus</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Cancer imaging datasets from African populations</li>
                      <li>• AI model validation and benchmarking</li>
                      <li>• Technical methods and tools</li>
                      <li>• Ethical considerations in medical imaging</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Publication Types</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Dataset Articles</li>
                      <li>• Technical Notes</li>
                      <li>• Model Evaluation Studies</li>
                      <li>• Review Articles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Journal;