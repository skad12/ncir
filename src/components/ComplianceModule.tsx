import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription } from "../components/ui/alert";
import { 
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Lock,
  Eye,
  Download,
  Calendar,
  Clock,
  Users,
  Database,
  Settings,
  Bell
} from "lucide-react";

const complianceData = {
  ndprCompliance: {
    overall: 98,
    categories: [
      { name: "Data De-identification", score: 100, status: "compliant" },
      { name: "Consent Management", score: 98, status: "compliant" },
      { name: "Access Controls", score: 100, status: "compliant" },
      { name: "Data Encryption", score: 100, status: "compliant" },
      { name: "Audit Logging", score: 100, status: "compliant" },
      { name: "Data Retention", score: 95, status: "compliant" },
      { name: "Cross-border Transfer", score: 90, status: "attention" }
    ]
  },
  hipaaCompliance: {
    overall: 95,
    categories: [
      { name: "Administrative Safeguards", score: 98, status: "compliant" },
      { name: "Physical Safeguards", score: 100, status: "compliant" },
      { name: "Technical Safeguards", score: 95, status: "compliant" },
      { name: "Breach Notification", score: 90, status: "attention" }
    ]
  },
  gdprCompliance: {
    overall: 97,
    categories: [
      { name: "Data Subject Rights", score: 95, status: "compliant" },
      { name: "Privacy by Design", score: 100, status: "compliant" },
      { name: "Data Protection Officer", score: 100, status: "compliant" },
      { name: "Impact Assessments", score: 92, status: "compliant" }
    ]
  },
  recentAudits: [
    {
      id: "AUD-2024-001",
      type: "NDPR Compliance Review",
      date: "2024-01-10",
      auditor: "Nigerian IT Development Agency",
      status: "passed",
      score: 98,
      findings: 2,
      nextDue: "2024-07-10"
    },
    {
      id: "AUD-2024-002",
      type: "Security Assessment",
      date: "2024-01-05",
      auditor: "CyberSec Nigeria",
      status: "passed",
      score: 96,
      findings: 3,
      nextDue: "2024-04-05"
    }
  ],
  violations: [
    {
      id: "VIO-001",
      type: "Minor Data Exposure",
      severity: "low",
      date: "2024-01-12",
      description: "Temporary exposure of anonymized metadata during system maintenance",
      status: "resolved",
      resolution: "Additional access controls implemented"
    }
  ],
  certifications: [
    {
      name: "ISO 27001",
      status: "active",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      certifyingBody: "BSI Group"
    },
    {
      name: "SOC 2 Type II",
      status: "active", 
      issueDate: "2023-09-20",
      expiryDate: "2024-09-20",
      certifyingBody: "KPMG"
    }
  ]
};

export const ComplianceModule = () => {
  const [selectedFramework, setSelectedFramework] = useState("ndpr");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-green-600";
      case "attention": return "text-yellow-600";
      case "violation": return "text-red-600";
      default: return "text-gray-6000";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant": return <Badge className="bg-green-500">Compliant</Badge>;
      case "attention": return <Badge className="text-red-500">Needs Attention</Badge>;
      case "violation": return <Badge className="text-red-500">Violation</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
          <p className="text-gray-500">Monitor regulatory compliance and security standards</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NDPR Compliance</CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceData.ndprCompliance.overall}%</div>
            <Progress value={complianceData.ndprCompliance.overall} className="mt-2" />
            <p className="text-xs text-gray-500 mt-2">Nigeria Data Protection Regulation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HIPAA Compliance</CardTitle>
            <Lock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceData.hipaaCompliance.overall}%</div>
            <Progress value={complianceData.hipaaCompliance.overall} className="mt-2 " />
            <p className="text-xs text-gray-500 mt-2">Health Insurance Portability Act</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GDPR Compliance</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceData.gdprCompliance.overall}%</div>
            <Progress value={complianceData.gdprCompliance.overall} className="mt-2" />
            <p className="text-xs text-gray-500 mt-2">General Data Protection Regulation</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Alert className="border-gray-200">
        <Bell className="h-4 w-4" />
        <AlertDescription>
          SOC 2 Type II certification expires in 8 months. Schedule renewal assessment with KPMG.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="frameworks" className="space-y-6">
      <div className="bg-gray-100 rounded-lg ">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-gray-100 p-1 rounded-lg ">
          <TabsTrigger className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
               "  value="frameworks" >Frameworks</TabsTrigger>
          <TabsTrigger className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
               "  value="audits">Audits</TabsTrigger>
          <TabsTrigger className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
               "  value="violations">Violations</TabsTrigger>
          <TabsTrigger className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
               "  value="certifications">Certifications</TabsTrigger>
        </TabsList></div>

        <TabsContent value="frameworks">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Framework Selector */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Compliance Frameworks</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedFramework === "ndpr" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFramework("ndpr")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  NDPR - Nigeria
                </Button>
                <Button
                  variant={selectedFramework === "hipaa" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFramework("hipaa")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  HIPAA - USA
                </Button>
                <Button
                  variant={selectedFramework === "gdpr" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFramework("gdpr")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  GDPR - EU
                </Button>
              </div>
            </div>

            {/* Framework Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedFramework === "ndpr" && "NDPR Compliance Details"}
                    {selectedFramework === "hipaa" && "HIPAA Compliance Details"}
                    {selectedFramework === "gdpr" && "GDPR Compliance Details"}
                    <Badge className="bg-green-500 text-white">
                      {selectedFramework === "ndpr" && `${complianceData.ndprCompliance.overall}%`}
                      {selectedFramework === "hipaa" && `${complianceData.hipaaCompliance.overall}%`}
                      {selectedFramework === "gdpr" && `${complianceData.gdprCompliance.overall}%`}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Detailed breakdown of compliance requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedFramework === "ndpr" && complianceData.ndprCompliance.categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className={`h-5 w-5 ${getStatusColor(category.status)}`} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`font-bold ${getStatusColor(category.status)}`}>{category.score}%</span>
                          <span className="text-white">{getStatusBadge(category.status)}</span>
                        </div>
                      </div>
                    ))}
                    
                    {selectedFramework === "hipaa" && complianceData.hipaaCompliance.categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className={`h-5 w-5 ${getStatusColor(category.status)}`} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`font-bold ${getStatusColor(category.status)}`}>{category.score}%</span>
                          <span className="text-white">{getStatusBadge(category.status)}</span>
                        </div>
                      </div>
                    ))}
                    
                    {selectedFramework === "gdpr" && complianceData.gdprCompliance.categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className={`h-5 w-5 ${getStatusColor(category.status)}`} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`font-bold ${getStatusColor(category.status)}`}>{category.score}%</span>
                          <span className="text-white">{getStatusBadge(category.status)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audits">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Audits</CardTitle>
              <CardDescription>Recent and upcoming compliance audits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.recentAudits.map((audit) => (
                  <div key={audit.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{audit.type}</h3>
                          <Badge variant={audit.status === "passed" ? "default" : "destructive"}>
                            {audit.status}
                          </Badge>
                         <Badge variant="outline" className="border-gray-200">Score: {audit.score}%</Badge> 
                        </div>
                        <p className="text-sm text-gray-500">Auditor: {audit.auditor}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Date: {audit.date}</span>
                          <span>Findings: {audit.findings}</span>
                          <span>Next Due: {audit.nextDue}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
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
              <CardDescription>Security incidents and compliance breaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.violations.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Violations</h3>
                    <p className="text-gray-500">All compliance requirements are currently met</p>
                  </div>
                ) : (
                  complianceData.violations.map((violation) => (
                    <div key={violation.id} className="border border-gray-200 rounded-lg p-4">
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
                          <p className="text-xs text-gray-500">Date: {violation.date}</p>
                          {violation.resolution && (
                            <p className="text-xs text-green-600">Resolution: {violation.resolution}</p>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Security Certifications</CardTitle>
              <CardDescription>Current certifications and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.certifications.map((cert) => (
                  <div key={cert.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{cert.name}</h3>
                          <Badge className="bg-green-500 text-white">{cert.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">Certifying Body: {cert.certifyingBody}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Issued: {cert.issueDate}</span>
                          <span>Expires: {cert.expiryDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Renew
                        </Button>
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