import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Badge } from "@/src/components/ui/badge";
import { Progress } from "@/src/components/ui/progress";
import { Upload, Plus, X, FileText, Users, Shield, Send } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";

interface Author {
  name: string;
  email: string;
  orcid: string;
  institution: string;
  isCorresponding: boolean;
}

interface SubmissionData {
  type: string;
  title: string;
  abstract: string;
  keywords: string[];
  authors: Author[];
  ethicsApproval: string;
  conflictOfInterest: string;
  dataAvailability: string;
  funding: string;
  manuscript: File | null;
  supplementary: File[];
}

const SubmissionWizard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionData, setSubmissionData] = useState<SubmissionData>({
    type: '',
    title: '',
    abstract: '',
    keywords: [],
    authors: [{ name: '', email: '', orcid: '', institution: '', isCorresponding: true }],
    ethicsApproval: '',
    conflictOfInterest: '',
    dataAvailability: '',
    funding: '',
    manuscript: null,
    supplementary: []
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { toast } = useToast();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const addAuthor = () => {
    setSubmissionData(prev => ({
      ...prev,
      authors: [...prev.authors, { name: '', email: '', orcid: '', institution: '', isCorresponding: false }]
    }));
  };

  const removeAuthor = (index: number) => {
    if (submissionData.authors.length > 1) {
      setSubmissionData(prev => ({
        ...prev,
        authors: prev.authors.filter((_, i) => i !== index)
      }));
    }
  };

  const updateAuthor = (index: number, field: keyof Author, value: string | boolean) => {
    setSubmissionData(prev => ({
      ...prev,
      authors: prev.authors.map((author, i) => 
        i === index ? { ...author, [field]: value } : author
      )
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !submissionData.keywords.includes(newKeyword.trim())) {
      setSubmissionData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setSubmissionData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'manuscript' | 'supplementary') => {
    const files = event.target.files;
    if (files) {
      if (type === 'manuscript') {
        setSubmissionData(prev => ({ ...prev, manuscript: files[0] }));
      } else {
        setSubmissionData(prev => ({ ...prev, supplementary: [...prev.supplementary, ...Array.from(files)] }));
      }
    }
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the submission terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Submission Successful",
      description: "Your article has been submitted for peer review. You will receive a confirmation email shortly.",
    });
    onClose();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Submit to NCIR Journal</CardTitle>
              <CardDescription>Step {currentStep} of {totalSteps}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Article Information
                </h3>
              </div>
              
              <div>
                <Label htmlFor="type">Article Type *</Label>
                <Select value={submissionData.type} onValueChange={(value) => setSubmissionData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select article type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dataset">Dataset Article</SelectItem>
                    <SelectItem value="technical">Technical Note</SelectItem>
                    <SelectItem value="evaluation">Model Evaluation</SelectItem>
                    <SelectItem value="review">Review Article</SelectItem>
                    <SelectItem value="ethics">Ethical Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={submissionData.title}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <Label htmlFor="abstract">Abstract *</Label>
                <Textarea
                  id="abstract"
                  value={submissionData.abstract}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, abstract: e.target.value }))}
                  placeholder="Enter article abstract (max 300 words)"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {submissionData.abstract.split(' ').length}/300 words
                </p>
              </div>

              <div>
                <Label>Keywords</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add keyword"
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button type="button" onClick={addKeyword} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {submissionData.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                      {keyword} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Authors & Affiliations
                </h3>
              </div>

              {submissionData.authors.map((author, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Author {index + 1}</CardTitle>
                      {submissionData.authors.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeAuthor(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          value={author.name}
                          onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                          placeholder="Dr. John Doe"
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={author.email}
                          onChange={(e) => updateAuthor(index, 'email', e.target.value)}
                          placeholder="john.doe@university.edu"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>ORCID ID</Label>
                        <Input
                          value={author.orcid}
                          onChange={(e) => updateAuthor(index, 'orcid', e.target.value)}
                          placeholder="0000-0000-0000-0000"
                        />
                      </div>
                      <div>
                        <Label>Institution *</Label>
                        <Input
                          value={author.institution}
                          onChange={(e) => updateAuthor(index, 'institution', e.target.value)}
                          placeholder="University of Lagos"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`corresponding-${index}`}
                        checked={author.isCorresponding}
                        onCheckedChange={(checked) => updateAuthor(index, 'isCorresponding', checked as boolean)}
                      />
                      <Label htmlFor={`corresponding-${index}`}>Corresponding author</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button type="button" onClick={addAuthor} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Author
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Ethics & Compliance
                </h3>
              </div>

              <div>
                <Label htmlFor="ethics">Ethics Approval *</Label>
                <Textarea
                  id="ethics"
                  value={submissionData.ethicsApproval}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, ethicsApproval: e.target.value }))}
                  placeholder="Provide IRB/Ethics Committee approval details and reference numbers"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="conflict">Conflict of Interest Statement *</Label>
                <Textarea
                  id="conflict"
                  value={submissionData.conflictOfInterest}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, conflictOfInterest: e.target.value }))}
                  placeholder="Declare any conflicts of interest or state 'The authors declare no conflicts of interest'"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="data">Data Availability Statement *</Label>
                <Textarea
                  id="data"
                  value={submissionData.dataAvailability}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, dataAvailability: e.target.value }))}
                  placeholder="Describe how data can be accessed, including any restrictions"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="funding">Funding Information</Label>
                <Textarea
                  id="funding"
                  value={submissionData.funding}
                  onChange={(e) => setSubmissionData(prev => ({ ...prev, funding: e.target.value }))}
                  placeholder="List funding sources and grant numbers (if applicable)"
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  File Uploads
                </h3>
              </div>

              <div>
                <Label>Manuscript File *</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your manuscript (PDF, DOC, or DOCX)
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'manuscript')}
                    className="max-w-xs mx-auto"
                  />
                  {submissionData.manuscript && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {submissionData.manuscript.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>Supplementary Files</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload supplementary materials (optional)
                  </p>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'supplementary')}
                    className="max-w-xs mx-auto"
                  />
                  {submissionData.supplementary.length > 0 && (
                    <div className="mt-2">
                      {submissionData.supplementary.map((file, index) => (
                        <p key={index} className="text-sm text-green-600">
                          ✓ {file.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Review & Submit
                </h3>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Submission Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div><strong>Type:</strong> {submissionData.type}</div>
                  <div><strong>Title:</strong> {submissionData.title}</div>
                  <div><strong>Authors:</strong> {submissionData.authors.map(a => a.name).join(', ')}</div>
                  <div><strong>Keywords:</strong> {submissionData.keywords.join(', ')}</div>
                  <div><strong>Manuscript:</strong> {submissionData.manuscript?.name || 'Not uploaded'}</div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the NCIR Journal submission terms and conditions, 
                    including peer review policies and open access publication requirements.
                  </Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <div className="flex justify-between p-6 border-t">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!agreedToTerms}>
              Submit Article
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SubmissionWizard;