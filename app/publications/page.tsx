
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Copy, ExternalLink, Search, BookOpen, Award, Calendar, Users, Quote, CheckCircle } from "lucide-react";

import { toast } from "sonner";
import Navbar from "@/src/components/layouts/Navbar";
import { listPublications, type PublicationItem } from "@/src/services/publicationApi";

type PublicationDisplay = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  pmid: string;
  type: string;
  ncirDatasets: string[];
  abstract: string;
  keywords: string[];
  citationCount: number;
  downloadCount: number;
  openAccess: boolean;
};

function mapPublicationToDisplay(p: PublicationItem): PublicationDisplay {
  const authorsStr = p.authors || "";
  const authors = authorsStr ? authorsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const keywordsStr = p.keywords || "";
  const keywords = keywordsStr ? keywordsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const year = p.year ? parseInt(p.year, 10) : (p.pub_date ? new Date(p.pub_date).getFullYear() : new Date().getFullYear());
  const ncirDatasets = p.dataset_used ? [p.dataset_used] : [];
  return {
    id: p.id,
    title: p.title || "Untitled",
    authors,
    journal: p.journal || "",
    year: isNaN(year) ? new Date().getFullYear() : year,
    volume: p.volume || "",
    issue: "",
    pages: "",
    doi: "",
    pmid: "",
    type: p.type || "Publication",
    ncirDatasets,
    abstract: p.abstract || "",
    keywords,
    citationCount: p.citation_count || 0,
    downloadCount: p.download_count || 0,
    openAccess: p.open_access ?? true,
  };
}

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
  const [publications, setPublications] = useState<PublicationDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listPublications()
      .then((pubList) => {
        if (!cancelled) {
          setPublications((Array.isArray(pubList) ? pubList : []).map(mapPublicationToDisplay));
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load publications");
          setPublications([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPublications = publications.filter((pub) => {
    return (
      (pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedYear === "" || selectedYear === "all" || pub.year.toString() === selectedYear) &&
      (selectedType === "" || selectedType === "all" || pub.type === selectedType) &&
      (selectedDataset === "" || selectedDataset === "all" || pub.ncirDatasets.includes(selectedDataset))
    );
  });

  const generateCitation = (publication: PublicationDisplay, format: string) => {
    const authorList = publication.authors.join(", ");
    
    switch (format) {
      case "apa":
        return `${authorList} (${publication.year}). ${publication.title}. ${publication.journal}, ${publication.volume}${publication.issue ? `(${publication.issue})` : ""}${publication.pages ? `, ${publication.pages}` : ""}.${publication.doi ? ` https://doi.org/${publication.doi}` : ""}`;
      case "vancouver":
        return `${authorList}. ${publication.title}. ${publication.journal}. ${publication.year};${publication.volume}${publication.issue ? `(${publication.issue})` : ""}${publication.pages ? `:${publication.pages}` : ""}.`;
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
        const [sp, ep] = publication.pages ? publication.pages.split("-") : ["", ""];
        return `TY  - JOUR
TI  - ${publication.title}
AU  - ${publication.authors.join("\nAU  - ")}
JO  - ${publication.journal}
PY  - ${publication.year}
VL  - ${publication.volume}
IS  - ${publication.issue}
SP  - ${sp}
EP  - ${ep}
DO  - ${publication.doi}
ER  -`;
      default:
        return "";
    }
  };

  const copyCitation = (publication: PublicationDisplay, format: string) => {
    const citation = generateCitation(publication, format);
    navigator.clipboard.writeText(citation);
    toast.success(`Citation copied in ${citationFormats[format as keyof typeof citationFormats]} format`);
  };

  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
  const types = [...new Set(publications.map(p => p.type))];
  const datasets = [...new Set(publications.flatMap(p => p.ncirDatasets))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">NCIR Publications & Citations</h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Explore research publications that have utilized NCIR datasets and learn how to properly cite our data collections in your own research.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold ">
                {loading ? "—" : publications.length}
              </div>
              <div className="text-sm text-gray-500">Total Publications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Quote className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {loading ? "—" : publications.reduce((sum, p) => sum + p.citationCount, 0)}
              </div>
              <div className="text-sm text-gray-500">Total Citations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {new Set(publications.flatMap(p => p.authors)).size}
              </div>
              <div className="text-sm text-gray-500">Unique Authors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold ">
                {publications.filter(p => p.openAccess).length}
              </div>
              <div className="text-sm text-gray-500">Open Access</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="publications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="publications" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
               ">Publications</TabsTrigger>
            <TabsTrigger value="cite-datasets" className="px-4 py-2 rounded-md text-sm font-medium 
               data-[state=active]:bg-white data-[state=active]:text-gray-900
               data-[state=active]:shadow-sm
               ">Cite Datasets</TabsTrigger>
          </TabsList>

          {/* Publications Tab */}
          <TabsContent value="publications" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
                <Input
                  placeholder="Search publications by title, author, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()} className="hover:bg-gray-200">{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Publication Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type} className="hover:bg-gray-200">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Dataset" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All Datasets</SelectItem>
                  {datasets.map(dataset => (
                    <SelectItem key={dataset} value={dataset} className="hover:bg-gray-200">{dataset}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Publications List */}
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading publications...
              </div>
            ) : (
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
                        <Badge className="bg-blue-500 text-white">{publication.type}</Badge>
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
                      <p className="text-sm text-gray-500">{publication.abstract}</p>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm">
                        <strong>NCIR Datasets Used:</strong>
                        <div className="flex gap-2 mt-1">
                          {publication.ncirDatasets.map(dataset => (
                            <Badge key={dataset} className="text-xs border-gray-200">{dataset}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm">
                        <strong>Keywords:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {publication.keywords.map(keyword => (
                            <Badge key={keyword} className="text-xs border-gray-200">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
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
            )}
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
                  <Card className="border-l-4 border-l-green-500">
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
                          <li>• Follow your journal&apos;s specific citation style</li>
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