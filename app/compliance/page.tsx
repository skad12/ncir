"use client";

import { useState } from "react";
import Navbar from "@/src/components/layouts/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { toast } from "sonner";
import { ShieldCheck, FileText, Download, Users, Clock, Mail } from "lucide-react";

/**
 * compliance.tsx
 * - Single-file React page designed to match the styling used in your other pages
 * - Uses existing UI components (Card, Tabs, Badge, Button, Dialog)
 * - Place this file in `app/compliance/page.tsx` or a similar route depending on your Next.js structure
 */

const Compliance = () => {
  const [selectedTab, setSelectedTab] = useState("policy");
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);

  const downloadPolicy = (slug: string) => {
    // placeholder action — replace with real download link
    toast.success(`Preparing download: ${slug}.pdf`);
  };

  const requestAuditLog = () => {
    // placeholder for actual request flow
    toast.success("Audit log request submitted — we will follow up via email");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold">Compliance & Governance</h1>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
            NCIR is committed to responsible data stewardship. This page summarizes our privacy, security,
            access, and audit policies and provides tools to request compliance-related artifacts.
          </p>
        </header>

        {/* Top Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <ShieldCheck className="mx-auto h-6 w-6 text-emerald-600 mb-2" />
              <div className="text-2xl font-bold">Privacy-first</div>
              <div className="text-sm text-gray-500">Data minimization & de-identification</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="mx-auto h-6 w-6 text-emerald-600 mb-2" />
              <div className="text-2xl font-bold">Policies</div>
              <div className="text-sm text-gray-500">Downloadable governance artifacts</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="mx-auto h-6 w-6 text-emerald-600 mb-2" />
              <div className="text-2xl font-bold">Audit Ready</div>
              <div className="text-sm text-gray-500">Retention & logging practices</div>
            </CardContent>
          </Card>
        </section>

        {/* Tabs */}
        <section>
          <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v)}>
            <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="policy" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Policies</TabsTrigger>
              <TabsTrigger value="access" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Access & Datasets</TabsTrigger>
              <TabsTrigger value="audit" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Audit & Logs</TabsTrigger>
            </TabsList>

            {/* Policies Tab */}
            <TabsContent value="policy" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Privacy Policy</CardTitle>
                    <CardDescription>How we protect patient privacy and handle PHI.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700">
                      NCIR implements strong de-identification, access controls, and minimum necessary principles. Data
                      contributors and approved projects access only the metadata and de-identified imagery necessary for
                      their analyses.
                    </p>

                    <div className="flex gap-1 mt-4">
                      <Button variant="outline" onClick={() => setShowPolicyDialog(true)}>
                        View Summary
                      </Button>
                      <Button variant="default" onClick={() => downloadPolicy("privacy-policy")}>
                        <Download className=" h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Use Agreement</CardTitle>
                    <CardDescription>Terms for researchers accessing NCIR data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Access requires a signed Data Use Agreement (DUA) that specifies permitted use, publication rules, and
                      obligations for data security and acknowledgment.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" onClick={() => downloadPolicy("dua-template")}>Download DUA</Button>
                      <Button variant="ghost" onClick={() => toast.success("Initiate DUA request (placeholder)")}>Request DUA</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security & Controls</CardTitle>
                    <CardDescription>Encryption, access controls, and testing cadence.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Data at rest and in transit are encrypted. Role-based access and regular security assessments ensure
                      only authorized researchers can run experiments on the datasets.
                    </p>
                    <div className="mt-4">
                      <Badge className="bg-emerald-100 text-emerald-800">ISO aligned</Badge>
                      <Badge className="ml-2">HIPAA-aware</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Access & Datasets Tab */}
            <TabsContent value="access" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Process</CardTitle>
                  <CardDescription>Steps required to request and gain access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                    <li>Register an institutional account and submit a research proposal.</li>
                    <li>Sign the Data Use Agreement (DUA) and complete required training.</li>
                    <li>Receive scoped dataset access and complete a security checklist.</li>
                    <li>Access datasets via approved tooling and reproducible workspaces.</li>
                  </ol>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={() => toast.success("Start access request (placeholder)")}>Start Access Request</Button>
                    <Button variant="outline" onClick={() => downloadPolicy("access-guide")}>
                      <Download className="mr-2 h-4 w-4" /> Download Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dataset Classification</CardTitle>
                  <CardDescription>Levels of sensitivity & what is shared</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="font-medium">Public</div>
                    <div className="text-sm text-gray-600">Low-risk datasets available to all users.</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Controlled</div>
                    <div className="text-sm text-gray-600">Requires DUA and approval.</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Restricted</div>
                    <div className="text-sm text-gray-600">Highly sensitive — limited access, additional controls.</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit & Logs Tab */}
            <TabsContent value="audit" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit & Logging</CardTitle>
                  <CardDescription>How we retain and provide logs for compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">We retain access logs, dataset access history, and administrative changes for a minimum of 3 years. Requests for audit artifacts are processed through a formal request and review.</p>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={() => requestAuditLog()}>Request Audit Log</Button>
                    <Button variant="outline" onClick={() => toast.success("Download sample log (placeholder)")}>Download Sample Log</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retention & Deletion</CardTitle>
                  <CardDescription>Retention periods & how to request removal</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">Datasets and logs are retained according to contributor agreements and legal requirements. Data removal requests follow validation and governance steps to protect research integrity while honoring legitimate removal requests.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Footer actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Contacts</CardTitle>
              <CardDescription>Primary points of contact for compliance requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Protection Officer</div>
                  <div className="text-gray-500">dpo@ncir.gov.ng</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText("dpo@ncir.gov.ng"); toast.success("Email copied"); }}>Copy</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Security Team</div>
                  <div className="text-gray-500">security@ncir.gov.ng</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText("security@ncir.gov.ng"); toast.success("Email copied"); }}>Copy</Button>
              </div>

              <div className="mt-4">
                <Button onClick={() => toast.success("Compliance request started (placeholder)")}>Start Compliance Request</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certification & Attestations</CardTitle>
              <CardDescription>Third-party certifications</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li>Annual security assessment completed</li>
                <li>Privacy impact assessments for new datasets</li>
                <li>Third-party penetration testing (select projects)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Common compliance artifacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start" onClick={() => downloadPolicy("privacy-policy")}>
                  <FileText className="mr-2 h-4 w-4" /> Privacy Policy
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => downloadPolicy("dua-template")}>
                  <FileText className="mr-2 h-4 w-4" /> Data Use Agreement
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => downloadPolicy("security-report")}>
                  <FileText className="mr-2 h-4 w-4" /> Security Report (summary)
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Policy summary dialog */}
        <Dialog open={showPolicyDialog} onOpenChange={(v) => setShowPolicyDialog(v)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Privacy Policy — Summary</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-sm text-gray-700 space-y-3">
              <p><strong>De-identification:</strong> We remove direct identifiers and apply robust de-identification before dataset release.</p>
              <p><strong>Access controls:</strong> Role-based access, DUA-based approvals, and minimal privilege.</p>
              <p><strong>Data sharing:</strong> Only approved projects may access controlled datasets; public datasets are accessible without a DUA.</p>
              <p><strong>Incident response:</strong> We maintain an incident response plan and notify stakeholders per legal requirements.</p>
              <div className="mt-4 text-right">
                <Button onClick={() => setShowPolicyDialog(false)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Compliance;
