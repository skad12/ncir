import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { 
  Upload, 
  Server, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Download,
  Database,
  Network,
  Zap,
  HardDrive
} from "lucide-react";
import { toast } from "sonner";

interface ContributorModuleProps {
  userRole: string;
}

export const ContributorModule = ({ userRole }: ContributorModuleProps) => {
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'pacs'>('manual');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleManualUpload = () => {
    setIsUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Images uploaded successfully! De-identification in progress.");
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handlePACSConnect = () => {
    toast.success("PACS connection established successfully!");
  };

  if (userRole !== 'contributor') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            Access restricted to Contributors only.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Data Contribution</h2>
          <p className="text-gray-500">Upload and manage cancer imaging datasets</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1 bg-blue-500 text-white">
          Contributor Portal
        </Badge>
      </div>

      <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'manual' | 'pacs')}>
        <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="manual" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            <Upload className="h-4 w-4" />
            <span>Manual Upload</span>
          </TabsTrigger>
          <TabsTrigger value="pacs" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
            <Server className="h-4 w-4" />
            <span>PACS Integration</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm">
                <Upload className="h-5 w-5" />
                <span>Manual Image Upload</span>
              </CardTitle>
              <CardDescription>
                Upload DICOM files, imaging folders, or individual images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop files here or click to browse</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supports DICOM (.dcm), TIFF, PNG, JPEG2000. Maximum 500MB per file.
                </p>
                <Button variant="medical">
                  Select Files
                </Button>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading images...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Metadata Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modality">Imaging Modality</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select modality" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="ct">CT Scan</SelectItem>
                      <SelectItem value="mri">MRI</SelectItem>
                      <SelectItem value="xray">X-Ray</SelectItem>
                      <SelectItem value="mammography">Mammography</SelectItem>
                      <SelectItem value="pet">PET Scan</SelectItem>
                      <SelectItem value="histopathology">Histopathology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancer-type">Cancer Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cancer type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="breast">Breast Cancer</SelectItem>
                      <SelectItem value="lung">Lung Cancer</SelectItem>
                      <SelectItem value="cervical">Cervical Cancer</SelectItem>
                      <SelectItem value="prostate">Prostate Cancer</SelectItem>
                      <SelectItem value="liver">Liver Cancer</SelectItem>
                      <SelectItem value="brain">Brain Cancer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital/Institution</Label>
                  <Input 
                    id="hospital" 
                    placeholder="e.g., Lagos University Teaching Hospital"
                    className="border-gray-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-count">Number of Patients</Label>
                  <Input 
                    id="patient-count" 
                    type="number" 
                    placeholder="e.g., 25"
                    className="border-gray-200 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Dataset Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the imaging dataset, patient demographics, clinical context..."
                  rows={3}
                   className="border-gray-200 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Ethics and Compliance */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Ethics & Compliance Checklist</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Institutional Ethics Committee approval obtained</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Patient consent forms signed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">NDPR compliance verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Auto de-identification will be performed</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button 
                  variant="medical" 
                  className="flex-1"
                  onClick={handleManualUpload}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Dataset'}
                </Button>
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pacs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="h-5 w-5" />
                <span>PACS Integration</span>
              </CardTitle>
              <CardDescription>
                Connect directly to your hospital&apos;s PACS system for automated data transfer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PACS Connection Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pacs-server">PACS Server Address</Label>
                  <Input 
                    id="pacs-server" 
                    placeholder="e.g., pacs.hospital.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pacs-port">Port</Label>
                  <Input 
                    id="pacs-port" 
                    placeholder="e.g., 11112"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ae-title">AE Title</Label>
                  <Input 
                    id="ae-title" 
                    placeholder="e.g., NCIR_CLIENT"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="called-ae">Called AE Title</Label>
                  <Input 
                    id="called-ae" 
                    placeholder="e.g., HOSPITAL_PACS"
                  />
                </div>
              </div>

              {/* Connection Status */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">PACS Connection Status</span>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Last successful connection: 2 minutes ago
                  </p>
                </CardContent>
              </Card>

              {/* Query Parameters */}
              <div className="space-y-4">
                <h3 className="font-semibold">Query Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">Past Week</SelectItem>
                        <SelectItem value="month">Past Month</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="study-type">Study Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select study type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ct">CT Studies</SelectItem>
                        <SelectItem value="mri">MRI Studies</SelectItem>
                        <SelectItem value="mammography">Mammography</SelectItem>
                        <SelectItem value="all">All Cancer Studies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Available Studies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: "CT-2024-001", patient: "ANON-001", date: "2024-01-15", modality: "CT", studies: 3 },
                      { id: "MRI-2024-002", patient: "ANON-002", date: "2024-01-15", modality: "MRI", studies: 2 },
                      { id: "CT-2024-003", patient: "ANON-003", date: "2024-01-14", modality: "CT", studies: 4 },
                    ].map((study) => (
                      <div key={study.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <input type="checkbox" className="rounded" />
                          <div>
                            <p className="font-medium">{study.id}</p>
                            <p className="text-sm text-gray-500">
                              {study.patient} • {study.date} • {study.studies} series
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{study.modality}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={handlePACSConnect}>
                  <Network className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="medical" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Retrieve Selected Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
          <CardDescription>Your latest dataset uploads and their processing status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                id: "DS-2024-001", 
                name: "Breast Cancer Mammography Series", 
                date: "Jan 15, 2024", 
                images: 156, 
                status: "Processing",
                progress: 75
              },
              { 
                id: "DS-2024-002", 
                name: "Lung CT Scan Collection", 
                date: "Jan 12, 2024", 
                images: 89, 
                status: "Completed",
                progress: 100
              },
              { 
                id: "DS-2024-003", 
                name: "Cervical Histopathology", 
                date: "Jan 10, 2024", 
                images: 234, 
                status: "Under Review",
                progress: 100
              },
            ].map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{upload.name}</p>
                    <p className="text-sm text-gray-500">
                      {upload.id} • {upload.date} • {upload.images} images
                    </p>
                    {upload.status === "Processing" && (
                      <div className="mt-2 w-32">
                        <Progress value={upload.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
                <Badge 
                  className={
                    upload.status === "Completed" ? "bg-green-500 text-white" :
                    upload.status === "Processing" ? "bg-blue-500 text-white" : "bg-orange-500 text-white"
                  }
                >
                  {upload.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};