import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  Database,
  Activity,
  MapPin,
  Shield,
  FileText,
  Brain,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

// Mock analytics data
const analyticsData = {
  overview: {
    totalImages: 24531,
    totalUsers: 89,
    totalAnnotations: 18442,
    datasetRequests: 156,
    compliance: 100,
    growth: {
      images: 12,
      users: 8,
      annotations: 15,
      requests: 23
    }
  },
  datasets: [
    { type: "Breast Cancer", count: 8542, annotations: 7234, completion: 85 },
    { type: "Lung Cancer", count: 6789, annotations: 5123, completion: 75 },
    { type: "Cervical Cancer", count: 4321, annotations: 3987, completion: 92 },
    { type: "Prostate Cancer", count: 2987, annotations: 2456, completion: 82 },
    { type: "Liver Cancer", count: 1892, annotations: 1642, completion: 87 }
  ],
  institutions: [
    { name: "Lagos University Teaching Hospital", images: 4521, users: 12, compliance: 100 },
    { name: "University College Hospital Ibadan", images: 3756, users: 8, compliance: 100 },
    { name: "National Hospital Abuja", images: 3214, users: 10, compliance: 95 },
    { name: "UNTH Enugu", images: 2891, users: 7, compliance: 100 },
    { name: "University of Port Harcourt Teaching Hospital", images: 2456, users: 6, compliance: 98 }
  ],
  research: [
    { project: "AI-Assisted Breast Cancer Detection", datasets: 3, status: "Active", publications: 2 },
    { project: "Cervical Cancer Screening Optimization", datasets: 2, status: "Completed", publications: 1 },
    { project: "Lung Cancer Radiomics Analysis", datasets: 4, status: "Active", publications: 0 },
    { project: "Multi-Modal Cancer Diagnosis", datasets: 5, status: "Pending", publications: 0 }
  ],
  timeline: [
    { month: "Jan", uploads: 1200, annotations: 890, downloads: 45 },
    { month: "Feb", uploads: 1450, annotations: 1100, downloads: 52 },
    { month: "Mar", uploads: 1680, annotations: 1320, downloads: 61 },
    { month: "Apr", uploads: 1890, annotations: 1450, downloads: 58 },
    { month: "May", uploads: 2100, annotations: 1680, downloads: 73 },
    { month: "Jun", uploads: 2340, annotations: 1890, downloads: 81 }
  ]
};

export const AnalyticsModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-gray-500 text-white">Comprehensive analytics and reporting tools</p>
        </div>
        <div className="flex items-center space-x-3 ">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod} >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-12 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="overview" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="datasets" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm">Datasets</TabsTrigger>
          <TabsTrigger value="institutions" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm">Institutions</TabsTrigger>
          <TabsTrigger value="research" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm">Research</TabsTrigger>
          <TabsTrigger value="compliance" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Images</CardTitle>
                <Database className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.totalImages.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.overview.growth.images}% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.totalUsers}</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.overview.growth.users}% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annotations</CardTitle>
                <Brain className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.totalAnnotations.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.overview.growth.annotations}% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Research Requests</CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.overview.datasetRequests}</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.overview.growth.requests}% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Activity Timeline</CardTitle>
              <CardDescription>Monthly trends in uploads, annotations, and downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analyticsData.timeline.map((month, index) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center space-y-2">
                    <div className="w-full bg-muted rounded-t">
                      <div 
                        className="bg-green-500 rounded-t transition-all duration-300"
                        style={{ height: `${(month.uploads / 2500) * 100}px` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{month.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center space-x-6 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Uploads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Annotations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                  <span>Downloads</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Distribution</CardTitle>
                <CardDescription>Cancer types and annotation progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.datasets.map((dataset, index) => (
                  <div key={dataset.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{dataset.type}</span>
                      <Badge variant="outline" className="border-gray-200">{dataset.count.toLocaleString()} images</Badge>
                    </div>
                    <Progress value={dataset.completion} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{dataset.annotations.toLocaleString()} annotated</span>
                      <span>{dataset.completion}% complete</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Dataset quality and validation status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">High Quality</p>
                      <p className="text-xs text-gray-500">Expert validated</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">78%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Under Review</p>
                      <p className="text-xs text-gray-500">Pending validation</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">18%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Needs Attention</p>
                      <p className="text-xs text-gray-500">Quality issues</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">4%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="institutions">
          <Card>
            <CardHeader>
              <CardTitle>Institutional Performance</CardTitle>
              <CardDescription>Contributing institutions and their metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.institutions.map((institution, index) => (
                  <div key={institution.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">{institution.name}</p>
                        <p className="text-sm text-gray-500">{institution.users} active users</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold">{institution.images.toLocaleString()}</p>
                      <Badge 
                        className={institution.compliance === 100 ? "bg-green-500 text-white" : "bg-blue-500 text-white text-xs"}
                       
                      >
                        {institution.compliance}% compliant
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Research Impact</CardTitle>
              <CardDescription>Active projects and publications using NCIR data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.research.map((project, index) => (
                  <div key={project.project} className="flex items-center justify-between p-4 border border-gray-200  rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{project.project}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{project.datasets} datasets used</span>
                        <span>{project.publications} publications</span>
                      </div>
                    </div>
                    <Badge 
                      className={
                        project.status === "Active" ? "bg-green-500 text-white" : 
                        project.status === "Completed" ? "bg-blue-500 text-white" : 
                        "bg-white border-gray-200" 
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>NDPR Compliance</CardTitle>
                <CardDescription>Nigeria Data Protection Regulation status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Data De-identification</span>
                  <Badge className="bg-green-500 text-white">100%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Consent Documentation</span>
                  <Badge className="bg-green-500 text-white">100%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Access Controls</span>
                  <Badge className="bg-green-500 text-white">100%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Trail</span>
                  <Badge className="bg-green-500 text-white">100%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
                <CardDescription>Platform security and access monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Failed Login Attempts</span>
                  <Badge variant="outline" className="border-gray-200">0 today</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active 2FA Users</span>
                  <Badge className="bg-green-500 text-white">89/89</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Encryption</span>
                  <Badge className="bg-green-500 text-white">AES-256</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Security Audit</span>
                  <Badge variant="outline" className="border-gray-200" >7 days ago</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};