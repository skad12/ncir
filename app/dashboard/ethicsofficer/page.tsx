// app/dashboard/ethics-officer/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import {
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Activity,
  Bell,
  Database,
  Brain
} from "lucide-react";

import { useAuth } from "@/src/context/AuthProvider";

/** Mock data (unchanged from your snippet) */
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

const ROLE_ROUTES: Record<string, string> = {
  "super-admin": "/dashboard/superadmin",
  contributor: "/dashboard/contributor",
  annotator: "/dashboard/annotator",
  researcher: "/dashboard/researcher",
  "ethicsofficer": "/dashboard/ethicsofficer",
};

export default function EthicsOfficerPage() {
  const { user, logout } = useAuth(); // requires AuthProvider wrapping app
  const router = useRouter();

  // client state
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // protect route client-side: if user exists but role mismatch, redirect them
  useEffect(() => {
    if (!user) return; // still loading/unauthenticated
    if (user.role !== "ethicsofficer") {
      const route = ROLE_ROUTES[user.role ?? "contributor"] ?? "/";
      router.replace(route);
    }
  }, [user, router]);

  const userRole = user?.role ?? "ethicsofficer"; // fallback while loading

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Ethics & Compliance</h1>
                <Badge className="bg-orange-500">Ethics Officer</Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => { /* export handler */ }}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={() => {/* show alerts panel */}}>
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>

              <Button onClick={logout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* page content (pad to avoid header overlap) */}
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Ethics & Compliance Dashboard</h2>
            <p className="text-muted-foreground">Monitor ethical compliance and audit platform activities</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{ethicsData.pendingApprovals.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">96%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Violations</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{ethicsData.violations.filter(v => v.status !== "resolved").length}</div>
              <p className="text-xs text-muted-foreground">Requires action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Audit Events</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="violations">Violations</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Pending Reviews */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Ethics Approvals</CardTitle>
                <CardDescription>Research proposals and amendments awaiting review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ethicsData.pendingApprovals.map((approval) => (
                    <div key={approval.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{approval.title}</h3>
                            <Badge variant={approval.urgency === "high" ? "destructive" : "outline"}>
                              {approval.urgency} priority
                            </Badge>
                            <Badge variant="secondary">{approval.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{approval.institution}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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
                                  <div><strong>Institution:</strong> {approval.institution}</div>
                                  <div><strong>Principal Investigator:</strong> {approval.submittedBy}</div>
                                  <div><strong>Submission Date:</strong> {approval.submittedDate}</div>
                                  <div><strong>Review Type:</strong> {approval.type}</div>
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

          {/* Audit Trail */}
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
                      className="w-64"
                    />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="access">Data Access</SelectItem>
                        <SelectItem value="upload">Uploads</SelectItem>
                        <SelectItem value="consent">Consent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {ethicsData.auditTrail
                    .filter((event) =>
                      selectedFilter === "all" ? true : event.action.toLowerCase().includes(selectedFilter)
                    )
                    .filter((event) => event.details.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${
                            event.compliance === "approved" ? "bg-green-500" :
                            event.compliance === "compliant" ? "bg-blue-500" : "bg-yellow-500"
                          }`} />
                          <div>
                            <p className="font-medium">{event.action}</p>
                            <p className="text-sm text-muted-foreground">{event.user}</p>
                            <p className="text-xs text-muted-foreground">{event.details}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-medium">{event.dataset}</p>
                          <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                          <Badge variant={event.compliance === "approved" ? "default" : "secondary"} className="text-xs">
                            {event.compliance}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Violations */}
          <TabsContent value="violations">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Violations</CardTitle>
                <CardDescription>Reported violations and their resolution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ethicsData.violations.map((violation) => (
                    <div key={violation.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{violation.type}</h3>
                            <Badge variant={
                              violation.severity === "high" ? "destructive" :
                              violation.severity === "medium" ? "default" : "secondary"
                            }>
                              {violation.severity} severity
                            </Badge>
                            <Badge variant={violation.status === "resolved" ? "secondary" : "destructive"}>
                              {violation.status}
                            </Badge>
                          </div>
                          <p className="text-sm">{violation.description}</p>
                          <p className="text-sm text-muted-foreground">{violation.institution}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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

          {/* Reports */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
                <CardDescription>Monthly compliance statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ethicsData.complianceReports.map((report) => (
                    <div key={report.month} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{report.month}</h3>
                        <Badge className="bg-green-500">{report.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{report.totalSubmissions}</p>
                          <p className="text-xs text-muted-foreground">Total Submissions</p>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{report.compliantSubmissions}</p>
                          <p className="text-xs text-muted-foreground">Compliant</p>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold text-red-600">{report.violations}</p>
                          <p className="text-xs text-muted-foreground">Violations</p>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold">{report.avgReviewTime}</p>
                          <p className="text-xs text-muted-foreground">Avg Review Time</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}