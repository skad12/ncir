// app/dashboard/superadmin/page.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ContributorModule } from "@/src/components/ContributorModule";
import { AnnotationModule } from "@/src/components/AnnotationModule";
import { ResearcherModule } from "@/src/components/ResearcherModule";
import { AnalyticsModule } from "@/src/components/AnalyticsModule";
import { EthicsOfficerModule } from "@/src/components/EthicsOfficerModule";
import { ComplianceModule } from "@/src/components/ComplianceModule";
import {
  Upload,
  Search,
  Users,
  FileText,
  BarChart3,
  Shield,
  Database,
  Brain,
  Activity,
  LogOut,
  Settings,
} from "lucide-react";

import { useAuth } from "@/src/context/AuthProvider";
// if you have a dashboard nav component, optionally import and render it here:

export default function Page() {
  // must have AuthProvider mounted in app layout
  const { user, logout } = useAuth(); // will throw if provider missing
  const userRole = user?.role ?? "super-admin"; // fallback while loading
  const [activeTab, setActiveTab] = useState("overview");

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "super-admin": return "Super Admin";
      case "contributor": return "Contributor";
      case "annotator": return "Annotator";
      case "researcher": return "Researcher";
      case "ethics-officer": return "Ethics Officer";
      default: return "User";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <h1 className="text-xl font-bold">NCIR — {getRoleDisplayName(userRole)}</h1>
                <Badge className="bg-red-500 text-white">{getRoleDisplayName(userRole)}</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Button>

              <Button onClick={logout} variant="outline" size="sm" aria-label="Logout" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 ">
          <div className="bg-gray-100 rounded-lg ">
          <TabsList className="grid w-full grid-cols-4  ">
            <TabsTrigger value="overview" className="focus:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="workspace" className="focus:bg-white">Workspace</TabsTrigger>
            <TabsTrigger value="analytics" className="focus:bg-white">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="focus:bg-white">Settings</TabsTrigger>
          </TabsList>
          </div>


          <TabsContent value="overview">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
    <CardTitle className="text-sm">Total Images</CardTitle>
    <Database className="h-4 w-4 text-gray-500" />
  </CardHeader>

  <CardContent>
    <div className="text-2xl font-bold">24,531</div>
    <p className="text-xs text-gray-500">+12% from last month</p>
  </CardContent>
</Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-gray-500">Across 15 institutions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm">Annotations</CardTitle>
                  <Brain className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18,442</div>
                  <p className="text-xs text-gray-500">75% completion rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm">Compliance</CardTitle>
                  <Shield className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <p className="text-xs text-gray-500">NDPR compliant</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Admin quick tasks</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="medical" className="h-20 flex-col text-sm">
                    <BarChart3 className="h-4 w-4 mb-2" />
                     Analytics
                  </Button>
                  <Button variant="outline" className="h-20 flex-col text-sm">
                    <Users className="h-4 w-4 mb-2" />
                    Manage Users
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New dataset uploaded</p>
                      <p className="text-xs text-muted-foreground">Lagos University Hospital</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2m ago</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Annotation completed</p>
                      <p className="text-xs text-muted-foreground">Chest X-ray series</p>
                    </div>
                    <span className="text-xs text-muted-foreground">15m ago</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Research access approved</p>
                      <p className="text-xs text-muted-foreground">University of Ibadan</p>
                    </div>
                    <span className="text-xs text-muted-foreground">1h ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workspace">
            {userRole === "super-admin" && <ComplianceModule />}
            {userRole === "contributor" && <ContributorModule userRole={userRole} />}
            {userRole === "annotator" && <AnnotationModule userRole={userRole} />}
            {userRole === "researcher" && <ResearcherModule userRole={userRole} />}
            {userRole === "ethicsofficer" && <EthicsOfficerModule />}
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsModule />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6 text-center">
                <Settings className="h-16 w-16 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                <p className="text-muted-foreground">Configure platform settings and preferences</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}