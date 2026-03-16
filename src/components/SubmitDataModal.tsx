
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Upload, Building, FileText, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import {
  createCancerImaging,
  type CancerImagingCreatePayload,
} from "../services/cancerImagingApi";

interface SubmitDataModalProps {
  children: React.ReactNode;
}

export const SubmitDataModal = ({ children }: SubmitDataModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Applicant Information
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    position: "",
    department: "",

    // Data Information
    datasetTitle: "",
    description: "",
    cancerType: "",
    modality: "",
    approximateSize: "",
    numberOfImages: "",
    acquisitionPeriod: "",
    license: "", // UI / internal name

    // Ethics and Compliance
    ethicsApproval: false,
    ethicsNumber: "",
    patientConsent: false,
    ndprCompliance: false,
    institutionalApproval: false,

    // Additional Information
    fundingSource: "",
    collaborators: "",
    intendedUse: "",
    additionalNotes: ""
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      institution: "",
      position: "",
      department: "",
      datasetTitle: "",
      description: "",
      cancerType: "",
      modality: "",
      approximateSize: "",
      numberOfImages: "",
      acquisitionPeriod: "",
      license: "",
      ethicsApproval: false,
      ethicsNumber: "",
      patientConsent: false,
      ndprCompliance: false,
      institutionalApproval: false,
      fundingSource: "",
      collaborators: "",
      intendedUse: "",
      additionalNotes: ""
    });
    setCurrentStep(1);
  };

  const canProceedToStep2 = !!(formData.fullName && formData.email && formData.institution && formData.position);
  const canProceedToStep3 = !!(formData.datasetTitle && formData.description && formData.cancerType && formData.modality && formData.license);
  const canSubmit = formData.ethicsApproval && formData.patientConsent && formData.ndprCompliance && formData.institutionalApproval;

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Please confirm all compliance checkboxes before submitting.");
      return;
    }

    setLoading(true);
    const now = new Date().toISOString();
    const imagesNumber = Number(formData.numberOfImages) || 0;

    const payload: CancerImagingCreatePayload = {
      applicant_info: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        title: formData.position,
        institution: formData.institution,
        department: formData.department,
        status: true,
        pub_date: now,
      },
      dataset_info: {
        title: formData.datasetTitle,
        description: formData.description,
        primary_cancer_type: formData.cancerType,
        primary_modality: formData.modality,
        no_of_images: formData.numberOfImages || "",
        dataset_size: formData.approximateSize || "",
        data_acquisition_period: formData.acquisitionPeriod || "",
        // backend expects the misspelled key "licience"
        licience: formData.license || "", // <- intentional mapping
        status: true,
        pub_date: now,
      },
      compliance_info: {
        title: formData.ethicsNumber || "Ethics & Compliance",
        ethics_committee_approval: !!formData.ethicsApproval,
        patient_consent: !!formData.patientConsent,
        ndpr_compliance: !!formData.ndprCompliance,
        institutional_authorization: !!formData.institutionalApproval,
        pub_date: now,
      },
      additional_info: {
        funding_source: formData.fundingSource || "",
        intended_research_se: formData.intendedUse || "",
        note: formData.additionalNotes || "",
        pub_date: now,
      },
      title: formData.datasetTitle || "",
      description: formData.description || "",
      keywords: `${formData.cancerType || ""}, ${formData.modality || ""}`.trim(),
      institution: formData.institution || "",
      cancer_type: formData.cancerType || "",
      modality: formData.modality || "",
      // top-level misspelled key to match expected response body
      licience: formData.license || "", // <- intentional mapping
      file_size: formData.approximateSize || "",
      images: imagesNumber,
      downloads: 0,
      citations: 0,
      status: true,
      verified: false,
      pub_date: now,
    };

    try {
      await createCancerImaging(payload);
      toast.success(
        "Data submission request sent! We'll review your application and contact you within 5 business days."
      );
      resetForm();
      setIsOpen(false);
    } catch (err) {
      console.error("Submission error", err);
      const message =
        err instanceof Error ? err.message : "Failed to submit. Try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-green-500" />
            Submit Cancer Imaging Data
          </DialogTitle>
          <DialogDescription>
            Join the National Cancer Imaging Repository by contributing your institutional data. 
            All submissions undergo ethical review and quality assessment.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step ? <CheckCircle className="h-4 w-4 " /> : step}
              </div>
              {step < 4 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  currentStep > step ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Steps UI */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Applicant Information
              </CardTitle>
              <CardDescription>
                Please provide your contact and institutional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Dr. John Doe"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@hospital.ng"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+234 xxx xxx xxxx"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position/Title *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Senior Radiologist"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="institution">Institution/Hospital *</Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  placeholder="University College Hospital, Ibadan"
                  className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  placeholder="Department of Radiology"
                  className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dataset Information
              </CardTitle>
              <CardDescription>
                Describe the cancer imaging data you wish to contribute
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="datasetTitle">Dataset Title *</Label>
                <Input
                  id="datasetTitle"
                  value={formData.datasetTitle}
                  onChange={(e) => handleInputChange('datasetTitle', e.target.value)}
                  placeholder="Breast Cancer Mammography Collection - UCHIBADAN"
                  className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the dataset, including patient demographics, acquisition protocols, and clinical context..."
                  rows={4}
                  className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cancerType">Primary Cancer Type *</Label>
                  <Select value={formData.cancerType} onValueChange={(value) => handleInputChange('cancerType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cancer type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="breast">Breast Cancer</SelectItem>
                      <SelectItem value="lung">Lung Cancer</SelectItem>
                      <SelectItem value="cervical">Cervical Cancer</SelectItem>
                      <SelectItem value="prostate">Prostate Cancer</SelectItem>
                      <SelectItem value="colorectal">Colorectal Cancer</SelectItem>
                      <SelectItem value="liver">Liver Cancer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="modality">Primary Modality *</Label>
                  <Select value={formData.modality} onValueChange={(value) => handleInputChange('modality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select modality" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="mammography">Mammography</SelectItem>
                      <SelectItem value="ct">CT Scan</SelectItem>
                      <SelectItem value="mri">MRI</SelectItem>
                      <SelectItem value="ultrasound">Ultrasound</SelectItem>
                      <SelectItem value="xray">X-Ray</SelectItem>
                      <SelectItem value="histopathology">Histopathology</SelectItem>
                      <SelectItem value="pet">PET Scan</SelectItem>
                      <SelectItem value="endoscopy">Endoscopy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="numberOfImages">Approximate Number of Images</Label>
                  <Input
                    id="numberOfImages"
                    value={formData.numberOfImages}
                    onChange={(e) => handleInputChange('numberOfImages', e.target.value)}
                    placeholder="e.g., 1500"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="approximateSize">Approximate Dataset Size</Label>
                  <Input
                    id="approximateSize"
                    value={formData.approximateSize}
                    onChange={(e) => handleInputChange('approximateSize', e.target.value)}
                    placeholder="e.g., 50 GB"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>

                <div>
                  <Label htmlFor="acquisitionPeriod">Data Acquisition Period</Label>
                  <Input
                    id="acquisitionPeriod"
                    value={formData.acquisitionPeriod}
                    onChange={(e) => handleInputChange('acquisitionPeriod', e.target.value)}
                    placeholder="e.g., January 2020 - December 2023"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="license">License</Label>
                  <Input
                    id="license"
                    value={formData.license}
                    onChange={(e) => handleInputChange('license', e.target.value)}
                    placeholder="e.g., EDS23546"
                    className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                </div>
              </div>
              
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Ethics and Compliance
              </CardTitle>
              <CardDescription>
                Confirm that your data submission meets all ethical and regulatory requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="ethicsApproval"
                    checked={formData.ethicsApproval}
                    onCheckedChange={(checked) => handleInputChange('ethicsApproval', checked as boolean)}
                    className="text-green-500"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="ethicsApproval" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Ethics Committee Approval *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I confirm that this dataset has been approved by an institutional ethics committee
                    </p>
                  </div>
                </div>

                {formData.ethicsApproval && (
                  <div className="ml-6">
                    <Label htmlFor="ethicsNumber">Ethics Approval Number</Label>
                    <Input
                      id="ethicsNumber"
                      value={formData.ethicsNumber}
                      onChange={(e) => handleInputChange('ethicsNumber', e.target.value)}
                      placeholder="e.g., ETH/2023/045"
                      className="text-green-500"
                    />
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="patientConsent"
                    checked={formData.patientConsent}
                    onCheckedChange={(checked) => handleInputChange('patientConsent', checked as boolean)}
                    className="text-green-500"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="patientConsent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Patient Consent *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      All patients have provided informed consent for research use of their imaging data
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="ndprCompliance"
                    checked={formData.ndprCompliance}
                    onCheckedChange={(checked) => handleInputChange('ndprCompliance', checked as boolean)}
                    className="text-green-500"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="ndprCompliance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      NDPR Compliance *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      This submission complies with the Nigeria Data Protection Regulation (NDPR)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="institutionalApproval"
                    checked={formData.institutionalApproval}
                    onCheckedChange={(checked) => handleInputChange('institutionalApproval', checked as boolean)}
                    className="text-green-500"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="institutionalApproval" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Institutional Authorization *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I have the authority to submit this data on behalf of my institution
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Optional details to help us better understand your contribution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fundingSource">Funding Source</Label>
                <Input
                  id="fundingSource"
                  value={formData.fundingSource}
                  onChange={(e) => handleInputChange('fundingSource', e.target.value)}
                  placeholder="e.g., TETFUND, NIH Grant R01CA123456"
                  className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="collaborators">Key Collaborators</Label>
                <Textarea
                  id="collaborators"
                  value={formData.collaborators}
                  onChange={(e) => handleInputChange('collaborators', e.target.value)}
                  placeholder="List any key collaborators or co-investigators..."
                  rows={3}
                   className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="intendedUse">Intended Research Use</Label>
                <Textarea
                  id="intendedUse"
                  value={formData.intendedUse}
                  onChange={(e) => handleInputChange('intendedUse', e.target.value)}
                  placeholder="Describe the intended research applications for this dataset..."
                  rows={3}
                   className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  placeholder="Any additional information or special considerations..."
                  rows={3}
                   className="focus:ring-2 focus:ring-emerald-500 border-gray-200"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={loading}>
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {currentStep < 4 ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  loading ||
                  (currentStep === 1 && !canProceedToStep2) ||
                  (currentStep === 2 && !canProceedToStep3)
                }
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={loading || !canSubmit}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};