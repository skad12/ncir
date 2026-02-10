import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ContributorModule } from "../components/ContributorModule";
import { AnnotationModule } from "../components/AnnotationModule";
import { ResearcherModule } from "../components/ResearcherModule";
import { AnalyticsModule } from "../components/AnalyticsModule";
import { EthicsOfficerModule } from "../components/EthicsOfficerModule";
import { ComplianceModule } from "../components/ComplianceModule";
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
  Eye,
  Download
} from "lucide-react";

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

export const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super-admin': return 'bg-red-500';
      case 'contributor': return 'bg-blue-500';
      case 'annotator': return 'bg-green-500';
      case 'researcher': return 'bg-purple-500';
      case 'ethics-officer': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super-admin': return 'Super Admin';
      case 'contributor': return 'Contributor';
      case 'annotator': return 'Annotator';
      case 'researcher': return 'Researcher';
      case 'ethics-officer': return 'Ethics Officer';
      default: return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">NCIR Dashboard</h1>
                <Badge className={getRoleColor(userRole)}>
                  {getRoleDisplayName(userRole)}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Images</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,531</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Across 15 institutions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annotations</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18,442</div>
              <p className="text-xs text-muted-foreground">75% completion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-xs text-muted-foreground">NDPR compliant</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks for {getRoleDisplayName(userRole).toLowerCase()}s
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {userRole === 'contributor' && (
                <>
                  <Button variant="medical" className="h-20 flex-col">
                    <Upload className="h-6 w-6 mb-2" />
                    Upload Images
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Submit Ethics
                  </Button>
                </>
              )}
              
              {userRole === 'annotator' && (
                <>
                  <Button variant="medical" className="h-20 flex-col">
                    <Brain className="h-6 w-6 mb-2" />
                    Start Annotation
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Activity className="h-6 w-6 mb-2" />
                    Review Queue
                  </Button>
                </>
              )}

              {userRole === 'researcher' && (
                <>
                  <Button variant="medical" className="h-20 flex-col">
                    <Search className="h-6 w-6 mb-2" />
                    Browse Datasets
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Request Access
                  </Button>
                </>
              )}

              {userRole === 'super-admin' && (
                <>
                  <Button variant="medical" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    Analytics
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Manage Users
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
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
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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
            {userRole === 'contributor' && <ContributorModule userRole={userRole} />}
            {userRole === 'annotator' && <AnnotationModule userRole={userRole} />}
            {userRole === 'researcher' && <ResearcherModule userRole={userRole} />}
            {userRole === 'super-admin' && <ComplianceModule />}
            {userRole === 'ethics-officer' && <EthicsOfficerModule />}
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
};