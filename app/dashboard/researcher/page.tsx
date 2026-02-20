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
import { useRouter } from "next/navigation";
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

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // while auth loads
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard…</div>
      </div>
    );
  }

  const userRole = user.role ?? "user";

  const getRoleColor = (role: string) => {
    switch (role) {
      case "super-admin":
        return "bg-red-500";
      case "contributor":
        return "bg-blue-500";
      case "annotator":
        return "bg-green-500";
      case "researcher":
        return "bg-purple-500";
      case "ethics-officer":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "super-admin":
        return "Super Admin";
      case "contributor":
        return "Contributor";
      case "annotator":
        return "Annotator";
      case "researcher":
        return "Researcher";
      case "ethics-officer":
        return "Ethics Officer";
      default:
        return "User";
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
                <h1 className="text-xl font-bold">NCIR Dashboard</h1>
                <Badge className={`${getRoleColor(userRole)} text-white`}>{getRoleDisplayName(userRole)}</Badge>
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
        <Tabs defaultValue="overview" className="space-y-6 ">
          <div className="bg-gray-100 rounded-lg ">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-gray-100 p-1 rounded-lg  ">
            <TabsTrigger value="overview" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 ">Overview</TabsTrigger>
            <TabsTrigger value="workspace" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 " >Workspace</TabsTrigger>
            <TabsTrigger value="analytics" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 " >Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
                 ">Settings</TabsTrigger>
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
                <Button variant="medical" className="h-20 flex-col">
                         <Search className="h-4 w-4 mb-2" />
                        Browse Datasets
                       </Button>
                       <Button variant="outline" className="h-20 flex-col">
                         <FileText className="h-4 w-4 mb-2" />
                         Request Access
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
                      <p className="text-xs text-gray-500">Lagos University Hospital</p>
                    </div>
                    <span className="text-xs text-gray-500">2m ago</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Annotation completed</p>
                      <p className="text-xs text-gray-500">Chest X-ray series</p>
                    </div>
                    <span className="text-xs text-gray-500">15m ago</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Research access approved</p>
                      <p className="text-xs text-gray-500">University of Ibadan</p>
                    </div>
                    <span className="text-xs text-gray-500">1h ago</span>
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
                <Settings className="h-16 w-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                <p className="text-gray-500">Configure platform settings and preferences</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}