"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Copy, ExternalLink, Search, BookOpen, Award, Calendar, Users, Quote, CheckCircle } from "lucide-react";

import { toast } from "sonner";

const publications = [
  {
    id: "pub-001",
    title: "Deep Learning for Breast Cancer Detection in Nigerian Mammography Screening Programs",
    authors: ["Dr. Adebayo O. Adeyemi", "Prof. Kemi Ogundipe", "Dr. James Okafor", "Dr. Sarah Mohammed"],
    journal: "Nigerian Journal of Medical Imaging",
    year: 2024,
    volume: "15",
    issue: "2",
    pages: "125-142",
    doi: "10.1234/njmi.2024.001",
    pmid: "38456789",
    type: "Original Research",
    ncirDatasets: ["NCR-001"],
    abstract: "This study evaluated the performance of deep learning algorithms for automated breast cancer detection using the NCIR mammography dataset. We trained and validated convolutional neural networks on 2,547 mammographic images from Nigerian women, achieving an AUC of 0.94 for cancer detection.",
    keywords: ["Breast cancer", "Mammography", "Deep learning", "Nigeria", "Screening"],
    citationCount: 23,
    downloadCount: 456,
    openAccess: true
  },
  {
    id: "pub-002", 
    title: "Cervical Cancer Histopathology Classification Using Transfer Learning: A Nigerian Multi-Center Study",
    authors: ["Prof. Fatima Hassan", "Dr. Emeka Nwanko", "Dr. Aisha Bello", "Dr. Michael Okonkwo"],
    journal: "African Journal of Pathology",
    year: 2024,
    volume: "8",
    issue: "1",
    pages: "45-58",
    doi: "10.1234/ajp.2024.008",
    pmid: "38234567",
    type: "Original Research",
    ncirDatasets: ["NCR-002"],
    abstract: "We developed and validated a transfer learning approach for automated cervical cancer grading using histopathology images from Nigerian patients. The model demonstrated high accuracy in distinguishing between different grades of cervical intraepithelial neoplasia.",
    keywords: ["Cervical cancer", "Histopathology", "Transfer learning", "HPV", "Nigeria"],
    citationCount: 18,
    downloadCount: 312,
    openAccess: true
  },
  {
    id: "pub-003",
    title: "Lung Cancer Screening with Low-Dose CT: Implementation Challenges in Resource-Limited Settings",
    authors: ["Dr. Chidi Ogundimu", "Prof. Ngozi Okwu", "Dr. Ahmed Suleiman"],
    journal: "Global Oncology Review",
    year: 2023,
    volume: "12",
    issue: "4",
    pages: "78-89",
    doi: "10.1234/gor.2023.045",
    pmid: "37891234",
    type: "Review Article",
    ncirDatasets: ["NCR-003"],
    abstract: "This comprehensive review examines the implementation of low-dose CT lung cancer screening programs in sub-Saharan Africa, with a focus on the Nigerian experience and lessons learned from the NCIR initiative.",
    keywords: ["Lung cancer", "Screening", "Low-dose CT", "Africa", "Implementation"],
    citationCount: 31,
    downloadCount: 567,
    openAccess: false
  },
  {
    id: "pub-004",
    title: "Prostate Cancer Detection Using Multi-parametric MRI: A Machine Learning Approach",
    authors: ["Dr. Yusuf Ibrahim", "Prof. Olumide Adeleke", "Dr. Grace Okoro"],
    journal: "International Journal of Medical AI",
    year: 2024,
    volume: "3",
    issue: "2",
    pages: "234-248",
    doi: "10.1234/ijmai.2024.012",
    pmid: "38567890",
    type: "Original Research", 
    ncirDatasets: ["NCR-004"],
    abstract: "This study presents a machine learning pipeline for automated prostate cancer detection and localization using multi-parametric MRI data from Nigerian patients, achieving comparable performance to international standards.",
    keywords: ["Prostate cancer", "MRI", "Machine learning", "PI-RADS", "Nigeria"],
    citationCount: 15,
    downloadCount: 289,
    openAccess: true
  }
];

const citationFormats = {
  apa: "American Psychological Association (APA)",
  vancouver: "Vancouver",
  bibtex: "BibTeX",
  endnote: "EndNote",
  ris: "RIS"
};

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDataset, setSelectedDataset] = useState("");

  const filteredPublications = publications.filter(pub => {
    return (
      (pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
       pub.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedYear === "" || selectedYear === "all" || pub.year.toString() === selectedYear) &&
      (selectedType === "" || selectedType === "all" || pub.type === selectedType) &&
      (selectedDataset === "" || selectedDataset === "all" || pub.ncirDatasets.includes(selectedDataset))
    );
  });

  const generateCitation = (publication: typeof publications[0], format: string) => {
    const authorList = publication.authors.join(", ");
    
    switch (format) {
      case "apa":
        return `${authorList} (${publication.year}). ${publication.title}. ${publication.journal}, ${publication.volume}(${publication.issue}), ${publication.pages}. https://doi.org/${publication.doi}`;
      case "vancouver":
        return `${authorList}. ${publication.title}. ${publication.journal}. ${publication.year};${publication.volume}(${publication.issue}):${publication.pages}.`;
      case "bibtex":
        return `@article{${publication.id},
  title={${publication.title}},
  author={${publication.authors.join(" and ")}},
  journal={${publication.journal}},
  year={${publication.year}},
  volume={${publication.volume}},
  number={${publication.issue}},
  pages={${publication.pages}},
  doi={${publication.doi}}
}`;
      case "endnote":
        return `%0 Journal Article
%T ${publication.title}
%A ${publication.authors.join("\n%A ")}
%J ${publication.journal}
%D ${publication.year}
%V ${publication.volume}
%N ${publication.issue}
%P ${publication.pages}
%R ${publication.doi}`;
      case "ris":
        return `TY  - JOUR
TI  - ${publication.title}
AU  - ${publication.authors.join("\nAU  - ")}
JO  - ${publication.journal}
PY  - ${publication.year}
VL  - ${publication.volume}
IS  - ${publication.issue}
SP  - ${publication.pages.split("-")[0]}
EP  - ${publication.pages.split("-")[1]}
DO  - ${publication.doi}
ER  -`;
      default:
        return "";
    }
  };

  const copyCitation = (publication: typeof publications[0], format: string) => {
    const citation = generateCitation(publication, format);
    navigator.clipboard.writeText(citation);
    toast.success(`Citation copied in ${citationFormats[format as keyof typeof citationFormats]} format`);
  };

  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
  const types = [...new Set(publications.map(p => p.type))];
  const datasets = [...new Set(publications.flatMap(p => p.ncirDatasets))];

  return (
    <div className="min-h-screen bg-background">
   
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            NCIR Publications & Citations
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore research publications that have utilized NCIR datasets and learn how to properly cite our data collections in your own research.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{publications.length}</div>
              <div className="text-sm text-muted-foreground">Total Publications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Quote className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {publications.reduce((sum, p) => sum + p.citationCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Citations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {new Set(publications.flatMap(p => p.authors)).size}
              </div>
              <div className="text-sm text-muted-foreground">Unique Authors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {publications.filter(p => p.openAccess).length}
              </div>
              <div className="text-sm text-muted-foreground">Open Access</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="publications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="cite-datasets">Cite Datasets</TabsTrigger>
          </TabsList>

          {/* Publications Tab */}
          <TabsContent value="publications" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search publications by title, author, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Publication Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Dataset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Datasets</SelectItem>
                  {datasets.map(dataset => (
                    <SelectItem key={dataset} value={dataset}>{dataset}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Publications List */}
            <div className="space-y-6">
              {filteredPublications.map((publication) => (
                <Card key={publication.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 leading-tight">
                          {publication.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          <div className="mb-2">
                            <strong>Authors:</strong> {publication.authors.join(", ")}
                          </div>
                          <div className="mb-2">
                            <strong>Journal:</strong> {publication.journal} ({publication.year})
                          </div>
                          <div>
                            <strong>Volume:</strong> {publication.volume}({publication.issue}), pages {publication.pages}
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Badge variant="secondary">{publication.type}</Badge>
                        {publication.openAccess && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Open Access
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">{publication.abstract}</p>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm">
                        <strong>NCIR Datasets Used:</strong>
                        <div className="flex gap-2 mt-1">
                          {publication.ncirDatasets.map(dataset => (
                            <Badge key={dataset} variant="outline">{dataset}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm">
                        <strong>Keywords:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {publication.keywords.map(keyword => (
                            <Badge key={keyword} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Quote className="h-4 w-4" />
                          {publication.citationCount} citations
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {publication.year}
                        </span>
                        <span>DOI: {publication.doi}</span>
                        {publication.pmid && <span>PMID: {publication.pmid}</span>}
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Quote className="h-4 w-4 mr-2" />
                              Cite
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Citation Formats</DialogTitle>
                              <DialogDescription>
                                Choose your preferred citation format for: {publication.title}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              {Object.entries(citationFormats).map(([key, name]) => (
                                <div key={key} className="border rounded-lg p-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium">{name}</h4>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => copyCitation(publication, key)}
                                    >
                                      <Copy className="h-4 w-4 mr-2" />
                                      Copy
                                    </Button>
                                  </div>
                                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                    {generateCitation(publication, key)}
                                  </pre>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Paper
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cite Datasets Tab */}
          <TabsContent value="cite-datasets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Cite NCIR Datasets</CardTitle>
                <CardDescription>
                  Proper citation of NCIR datasets helps ensure recognition for data contributors and enables tracking of dataset usage.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">General Citation Format</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">
{`[Dataset ID]. [Dataset Title]. National Cancer Imaging Repository (NCIR). 
[Institution]. [Publication Year]. DOI: [DOI]. 
Available at: https://ncir.gov.ng/datasets/[dataset-id]`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dataset-Specific Citations</h3>
                  
                  {/* NCR-001 */}
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-base">NCR-001: Breast Cancer Mammography Collection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <strong>APA Format:</strong>
                          <div className="bg-muted p-3 rounded text-sm mt-1">
                            NCR-001. Breast Cancer Mammography Collection. National Cancer Imaging Repository (NCIR). 
                            University College Hospital, Ibadan. (2024). DOI: 10.5281/zenodo.7890123. 
                            Available at: https://ncir.gov.ng/datasets/NCR-001
                          </div>
                        </div>
                        <div>
                          <strong>BibTeX:</strong>
                          <div className="bg-muted p-3 rounded text-sm mt-1">
                            <pre>{`@dataset{NCR001,
  title={Breast Cancer Mammography Collection},
  author={{University College Hospital, Ibadan}},
  publisher={National Cancer Imaging Repository (NCIR)},
  year={2024},
  doi={10.5281/zenodo.7890123},
  url={https://ncir.gov.ng/datasets/NCR-001}
}`}</pre>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText("NCR-001. Breast Cancer Mammography Collection. National Cancer Imaging Repository (NCIR). University College Hospital, Ibadan. (2024). DOI: 10.5281/zenodo.7890123. Available at: https://ncir.gov.ng/datasets/NCR-001");
                            toast.success("Citation copied to clipboard");
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy APA Citation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* More dataset citations can be added here */}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Citation Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Best Practices
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li>• Always include the dataset ID (e.g., NCR-001)</li>
                          <li>• Mention the specific version if applicable</li>
                          <li>• Include the access date for online resources</li>
                          <li>• Acknowledge data contributors and institutions</li>
                          <li>• Follow your journal's specific citation style</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Additional Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li>• All datasets have persistent DOIs</li>
                          <li>• Citations help track research impact</li>
                          <li>• Proper attribution supports data sharing</li>
                          <li>• Contact us for custom citation formats</li>
                          <li>• Report errors in dataset information</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Publications;