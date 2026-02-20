import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { 
  Shield,
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Download,
  Calendar,
  User,
  Database,
  Activity,
  Filter,
  Bell
} from "lucide-react";

// Mock data for ethics monitoring
const ethicsData = {
  pendingApprovals: [
    {
      id: "ETH-2024-001",
      title: "Breast Cancer AI Dataset Collection",
      institution: "Lagos University Teaching Hospital",
      submittedBy: "Dr. Adebayo Ogundimu",
      submittedDate: "2024-01-15",
      status: "pending",
      urgency: "medium",
      type: "Initial Review"
    },
    {
      id: "ETH-2024-002", 
      title: "Lung Cancer Radiomics Study",
      institution: "University College Hospital Ibadan",
      submittedBy: "Prof. Chioma Ekezie",
      submittedDate: "2024-01-12",
      status: "pending",
      urgency: "high",
      type: "Amendment"
    }
  ],
  auditTrail: [
    {
      id: "AUD-001",
      action: "Data Access Granted",
      user: "Dr. John Smith (University of Edinburgh)",
      dataset: "Cervical Cancer Dataset v2.1",
      timestamp: "2024-01-16 14:30:00",
      details: "Research access approved for AI model training",
      compliance: "approved"
    },
    {
      id: "AUD-002",
      action: "Data Upload",
      user: "Dr. Fatima Ahmed (LUTH)",
      dataset: "Breast Cancer Images - January 2024",
      timestamp: "2024-01-16 09:15:00",
      details: "142 de-identified DICOM images uploaded",
      compliance: "compliant"
    },
    {
      id: "AUD-003",
      action: "Consent Review",
      user: "Ethics Officer",
      dataset: "Prostate Cancer MRI Dataset",
      timestamp: "2024-01-15 16:45:00",
      details: "Verified consent documentation for 89 patients",
      compliance: "approved"
    }
  ],
  complianceReports: [
    {
      month: "January 2024",
      totalSubmissions: 45,
      compliantSubmissions: 43,
      violations: 2,
      avgReviewTime: "3.2 days",
      status: "compliant"
    },
    {
      month: "December 2023",
      totalSubmissions: 52,
      compliantSubmissions: 50,
      violations: 2,
      avgReviewTime: "2.8 days",
      status: "compliant"
    }
  ],
  violations: [
    {
      id: "VIO-001",
      type: "Incomplete Consent",
      description: "Missing patient signature on 3 consent forms",
      institution: "Federal Medical Centre Katsina",
      severity: "medium",
      status: "resolved",
      dateReported: "2024-01-10",
      dateResolved: "2024-01-14"
    },
    {
      id: "VIO-002",
      type: "Data De-identification",
      description: "Patient ID visible in DICOM metadata",
      institution: "Jos University Teaching Hospital",
      severity: "high",
      status: "pending",
      dateReported: "2024-01-15",
      dateResolved: null
    }
  ]
};

export const EthicsOfficerModule = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Ethics & Compliance Dashboard</h2>
          <p className="text-gray-500">Monitor ethical compliance and audit platform activities</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts (2)
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{ethicsData.pendingApprovals.length}</div>
            <p className="text-xs text-gray-500">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">96%</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-gray-500">Requires action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Events</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="pending" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 ">Pending Reviews</TabsTrigger>
          <TabsTrigger value="audit" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 ">Audit Trail</TabsTrigger>
          <TabsTrigger value="violations" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 ">Violations</TabsTrigger>
          <TabsTrigger value="reports" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 ">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Ethics Approvals</CardTitle>
              <CardDescription>Research proposals and amendments awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ethicsData.pendingApprovals.map((approval) => (
                  <div key={approval.id} className="border border-gray-200  rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{approval.title}</h3>
                          <Badge className={approval.urgency === "high" ? "bg-red-500 text-white" : "bg-white border-gray-200"}>
                            {approval.urgency} priority
                          </Badge>
                          <Badge className="bg-blue-500 text-white">{approval.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">{approval.institution}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Submitted by: {approval.submittedBy}</span>
                          <span>Date: {approval.submittedDate}</span>
                          <span>ID: {approval.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{approval.title}</DialogTitle>
                              <DialogDescription>Ethics Review - {approval.id}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <strong>Institution:</strong> {approval.institution}
                                </div>
                                <div>
                                  <strong>Principal Investigator:</strong> {approval.submittedBy}
                                </div>
                                <div>
                                  <strong>Submission Date:</strong> {approval.submittedDate}
                                </div>
                                <div>
                                  <strong>Review Type:</strong> {approval.type}
                                </div>
                              </div>
                              <div>
                                <strong>Research Summary:</strong>
                                <p className="mt-2 p-3 bg-muted rounded text-sm">
                                  This study aims to develop AI-based diagnostic tools for early cancer detection 
                                  using radiological imaging data. The research will contribute to improving 
                                  healthcare outcomes in Nigeria by enabling faster and more accurate diagnoses.
                                </p>
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm">
                                  Request Changes
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit Trail</CardTitle>
                  <CardDescription>Complete log of all platform activities</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 border-gray-200 focus:ring-2 focus:ring-emerald-500"
                  />
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 ">
                      <SelectItem value="all" className="hover:bg-gray-200">All Events</SelectItem>
                      <SelectItem value="access" className="hover:bg-gray-200">Data Access</SelectItem>
                      <SelectItem value="upload" className="hover:bg-gray-200">Uploads</SelectItem>
                      <SelectItem value="consent" className="hover:bg-gray-200">Consent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ethicsData.auditTrail.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        event.compliance === "approved" ? "bg-green-500" : 
                        event.compliance === "compliant" ? "bg-blue-500" : "bg-yellow-500"
                      }`} />
                      <div>
                        <p className="font-medium">{event.action}</p>
                        <p className="text-sm text-gray-500">{event.user}</p>
                        <p className="text-xs text-gray-500">{event.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{event.dataset}</p>
                      <p className="text-xs text-gray-500">{event.timestamp}</p>
                      <Badge 
                        className={event.compliance === "approved" ? "bg-green-500 text-white" : "bg-blue-500 text-white"}
                       
                      >
                        {event.compliance}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="violations">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Violations</CardTitle>
              <CardDescription>Reported violations and their resolution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ethicsData.violations.map((violation) => (
                  <div key={violation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{violation.type}</h3>
                          <Badge className={
                            violation.severity === "high" ? "bg-red-500 text-white" : 
                            violation.severity === "medium" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                          }>
                            {violation.severity} severity
                          </Badge>
                          <Badge className={violation.status === "resolved" ? "bg-blue-500 text-white" : "bg-red-500 text-white"}>
                            {violation.status}
                          </Badge>
                        </div>
                        <p className="text-sm">{violation.description}</p>
                        <p className="text-sm text-gray-500">{violation.institution}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Reported: {violation.dateReported}</span>
                          {violation.dateResolved && <span>Resolved: {violation.dateResolved}</span>}
                          <span>ID: {violation.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        {violation.status === "pending" && (
                          <Button size="sm">
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Monthly compliance statistics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ethicsData.complianceReports.map((report, index) => (
                  <div key={report.month} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{report.month}</h3>
                      <Badge className="bg-green-500 text-white">{report.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{report.totalSubmissions}</p>
                        <p className="text-xs text-gray-500">Total Submissions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{report.compliantSubmissions}</p>
                        <p className="text-xs text-gray-500">Compliant</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{report.violations}</p>
                        <p className="text-xs text-gray-500">Violations</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{report.avgReviewTime}</p>
                        <p className="text-xs text-gray-500">Avg Review Time</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};