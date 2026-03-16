"use client";

import { useState } from "react";
import Navbar from "@/src/components/layouts/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Copy, ExternalLink, Users, Award, BookOpen, CheckCircle, Mail } from "lucide-react";
import { toast } from "sonner";

/**
 * About page modeled from the Publications page styling.
 * Drop this file in your pages/app route (e.g. app/about/page.tsx) or components as needed.
 */

const team = [
  {
    id: "t1",
    name: "Dr. Aisha Bello",
    role: "Lead Data Curator",
    bio: "Oversees dataset curation and metadata standards.",
    avatar: "/images/user.jpg",
  },
  {
    id: "t2",
    name: "Prof. John Okonkwo",
    role: "Clinical Advisor",
    bio: "Provides clinical oversight and partnerships.",
    avatar: "/images/user.jpg",
  },
  {
    id: "t3",
    name: "Chinedu Nwafor",
    role: "Engineering Lead",
    bio: "Responsible for platform architecture and integrations.",
    avatar: "/images/user.jpg",
  },
];

const stats = {
  datasets: 128,
  publications: 420,
  contributors: 86,
  openAccess: 74,
};

const About = () => {
  const [contactEmail, setContactEmail] = useState("contact@ncir.gov.ng");
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    toast.success("Contact email copied");
  };

  const handleSubscribe = () => {
    if (!subscribeEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    // pretend to subscribe
    toast.success("Subscribed — thank you!");
    setSubscribeEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">About NCIR</h1>
          <p className="text-lg text-gray-600">
            The National Cancer Imaging Repository (NCIR) is a curated collection of medical imaging datasets,
            created to accelerate cancer research, foster reproducible science, and support AI development in medical imaging.
            We partner with hospitals, research institutions, and clinicians to ensure high-quality, well-documented data.
          </p>
        </header>

        {/* Mission + Quick CTA */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
              <CardDescription>
                Advance cancer imaging research by providing accessible, ethically sourced, and well-documented datasets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  We believe open data — paired with strong governance and privacy safeguards — drives innovation.
                  NCIR enables researchers and developers to build, validate, and benchmark algorithms that can improve cancer
                  detection, diagnosis, and treatment planning.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Curated datasets:</strong> Expert-annotated imaging collections with rich metadata.</li>
                  <li><strong>Governance:</strong> Clear usage policies and data access controls.</li>
                  <li><strong>Community:</strong> Training, documentation, and reproducibility resources.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-emerald-600" />
              <div className="text-2xl font-bold">{stats.datasets}</div>
              <div className="text-sm text-gray-500">Datasets available</div>

              <div className="mt-4 flex flex-col gap-2">
                <Button variant="default" onClick={() => toast.success("Explore datasets clicked")}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Explore Datasets
                </Button>
                <Button variant="outline" onClick={handleCopyEmail}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy contact email
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.publications}</div>
                <div className="text-sm text-gray-500">Publications</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.contributors}</div>
                <div className="text-sm text-gray-500">Contributors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.openAccess}%</div>
                <div className="text-sm text-gray-500">Open Access Datasets</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">Ethical</div>
                <div className="text-sm text-gray-500">Privacy-first governance</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Meet the Team</h2>
            <div className="text-sm text-gray-500">Collaborators across clinical, research, and engineering</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex gap-4 items-start">
                  <img src={member.avatar} alt={member.name} className="h-14 w-14 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.role}</div>
                      </div>
                      <Badge className="text-xs">Core</Badge>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toast(`View ${member.name} profile`)}>
                        View Profile
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Contact</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Contact {member.name}</DialogTitle>
                          </DialogHeader>
                          <div className="py-2">
                            <p className="text-sm text-gray-600">To contact {member.name}, please email the NCIR team and note the intended recipient.</p>
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" onClick={() => { navigator.clipboard.writeText(contactEmail); toast.success("Email copied"); }}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Team Email
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => toast.success("Email client opened (placeholder)")}>
                                <Mail className="mr-2 h-4 w-4" />
                                Open email client
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline & How to cite / partner */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>History & Milestones</CardTitle>
              <CardDescription>Key moments in NCIR&apos;s development</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="border-l border-gray-200 ml-4 pl-4 space-y-6 text-sm">
                <li>
                  <div className="text-xs text-gray-500">2018</div>
                  <div className="font-medium">Project conception</div>
                  <div className="text-gray-600">Initial planning and stakeholder consultations.</div>
                </li>
                <li>
                  <div className="text-xs text-gray-500">2020</div>
                  <div className="font-medium">Pilot dataset release</div>
                  <div className="text-gray-600">First public dataset made available for research.</div>
                </li>
                <li>
                  <div className="text-xs text-gray-500">2023</div>
                  <div className="font-medium">Partnership expansion</div>
                  <div className="text-gray-600">New hospital partners and improved metadata standards.</div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Partner & Cite</CardTitle>
              <CardDescription>Collaborations, dataset contributions, and citation guidance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                Institutions interested in contributing datasets or collaborating on research should follow our contributor
                guidelines and reach out via the official contact email.
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Cite NCIR datasets</h4>
                  <div className="text-sm text-gray-600 mt-1">
                    Example: <code className="rounded bg-muted px-1 py-0.5 text-xs">NCR-001. Breast Cancer Mammography Collection. NCIR. University Hospital. (2024). DOI: 10.xxxx</code>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="default" onClick={() => { navigator.clipboard.writeText("NCR-001. Breast Cancer Mammography Collection. NCIR. University Hospital. (2024). DOI: 10.xxxx"); toast.success("Citation copied"); }}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Example
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("Partner request started (placeholder)")}>
                    <ExternalLink className="mr-2 h-4 w-4" /> Request Partnership
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Subscribe / Contact */}
        <section className="bg-white border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold">Stay updated</h3>
              <p className="text-sm text-gray-600">Subscribe to our newsletter to receive dataset releases, publications, and community updates.</p>
            </div>

            <div className="flex gap-2 items-center">
              <Input
                placeholder="you@domain.com"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubscribe}>Subscribe</Button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <div>Contact: <span className="font-medium">{contactEmail}</span></div>
            <div>
              <Button variant="ghost" size="sm" onClick={handleCopyEmail}>
                <Copy className="mr-2 h-4 w-4" /> Copy Email
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;