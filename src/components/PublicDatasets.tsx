"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Download,
  Eye,
  Filter,
  Search,
  Users,
  Calendar,
  Database,
} from "lucide-react";

/* ---- DATA ---- */
const publicDatasets = [
  {
    id: "NCR-001",
    title: "Breast Cancer Mammography Collection",
    description: "Comprehensive mammography dataset with annotations for breast cancer detection and classification",
    institution: "University College Hospital, Ibadan",
    cancerType: "Breast Cancer",
    modality: "Mammography",
    imageCount: 2547,
    annotatedCount: 2547,
    downloadCount: 156,
    publicationDate: "2024-01-15",
    size: "45.2 GB",
    license: "CC BY-NC 4.0",
    tags: ["Mammography", "BI-RADS", "Screening", "Diagnosis"],
    citations: 12,
    doi: "10.5281/zenodo.7890123"
  },
  {
    id: "NCR-002", 
    title: "Cervical Cancer Histopathology Images",
    description: "High-resolution histopathology slides for cervical cancer grading and HPV correlation studies",
    institution: "Lagos University Teaching Hospital",
    cancerType: "Cervical Cancer",
    modality: "Histopathology",
    imageCount: 1832,
    annotatedCount: 1654,
    downloadCount: 89,
    publicationDate: "2024-02-20",
    size: "78.9 GB",
    license: "CC BY-NC-SA 4.0",
    tags: ["Histopathology", "HPV", "Grading", "Pap Smear"],
    citations: 8,
    doi: "10.5281/zenodo.7890124"
  },
  {
    id: "NCR-003",
    title: "Lung Cancer CT Screening Dataset",
    description: "Low-dose CT scans for lung cancer screening with nodule annotations and malignancy scores",
    institution: "National Hospital Abuja",
    cancerType: "Lung Cancer", 
    modality: "CT",
    imageCount: 3421,
    annotatedCount: 2987,
    downloadCount: 234,
    publicationDate: "2023-11-08",
    size: "128.7 GB",
    license: "CC BY 4.0",
    tags: ["LDCT", "Nodules", "Screening", "LIDC-IDRI"],
    citations: 18,
    doi: "10.5281/zenodo.7890125"
  },
  {
    id: "NCR-004",
    title: "Prostate Cancer MRI Collection",
    description: "Multi-parametric MRI sequences (T2W, DWI, DCE) for prostate cancer detection and staging",
    institution: "Ahmadu Bello University Teaching Hospital",
    cancerType: "Prostate Cancer",
    modality: "MRI",
    imageCount: 1456,
    annotatedCount: 1298,
    downloadCount: 167,
    publicationDate: "2024-03-12",
    size: "89.3 GB", 
    license: "CC BY-NC 4.0",
    tags: ["mpMRI", "PI-RADS", "DWI", "T2W"],
    citations: 6,
    doi: "10.5281/zenodo.7890126"
  },
  {
    id: "NCR-005",
    title: "Colorectal Cancer Endoscopy Dataset",
    description: "Colonoscopy images with polyp detection and adenoma classification annotations",
    institution: "University of Port Harcourt Teaching Hospital",
    cancerType: "Colorectal Cancer",
    modality: "Endoscopy",
    imageCount: 5632,
    annotatedCount: 4891,
    downloadCount: 98,
    publicationDate: "2024-01-28",
    size: "34.6 GB",
    license: "CC BY-SA 4.0",
    tags: ["Colonoscopy", "Polyps", "Adenoma", "CRC Screening"],
    citations: 4,
    doi: "10.5281/zenodo.7890127"
  }
];

/* ---- COMPONENT ---- */
export const PublicDatasets = () => {
  const [search, setSearch] = useState("");
  const [cancerType, setCancerType] = useState("");
  const [modality, setModality] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const cancerTypes = [...new Set(publicDatasets.map(d => d.cancerType))];
  const modalities = [...new Set(publicDatasets.map(d => d.modality))];

  const filtered = publicDatasets.filter(d => {
    const matchesSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCancer =
      !cancerType || cancerType === "all" || d.cancerType === cancerType;

    const matchesModality =
      !modality || modality === "all" || d.modality === modality;

    return matchesSearch && matchesCancer && matchesModality;
  });

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Public Datasets Collection
          </h2>
          <p className="text-slate-600">
            NDPR-compliant datasets made available for research, education,
            and AI development.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search datasets..."
                className="pl-10 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(v => !v)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <Select value={cancerType} onValueChange={setCancerType}>
                <SelectTrigger>
                  <SelectValue placeholder="Cancer type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All cancer types</SelectItem>
                  {cancerTypes.map(t => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={modality} onValueChange={setModality}>
                <SelectTrigger>
                  <SelectValue placeholder="Modality" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All modalities</SelectItem>
                  {modalities.map(m => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

         {/* Dataset Stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{publicDatasets.length}</div>
              <div className="text-sm text-muted-foreground">Public Datasets</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {publicDatasets.reduce((sum, d) => sum + d.imageCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Images</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {publicDatasets.reduce((sum, d) => sum + d.downloadCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {publicDatasets.reduce((sum, d) => sum + d.citations, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Citations</div>
            </CardContent>
          </Card>
        </div>

        {/* Dataset Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map(ds => (
            <Card
              key={ds.id}
              className="hover:shadow-lg transition-shadow  "
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {ds.title}
                    </CardTitle>
                    <CardDescription  className="text-sm mb-3">
                      {ds.description}
                    </CardDescription>
                  </div>
                  <span className=""><Badge className=" text-xs bg-blue-500 text-white px-2 ml-2">{ds.id}</Badge></span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {ds.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="border-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium">Institution:</span>
                    <div className="text-gray-500">{ds.institution}</div>
                  </div>
                  <div>
                    <span className="font-medium">Cancer Type:</span>
                    <div className="text-gray-500">{ds.cancerType}</div>
                  </div>
                  <div>
                    <span className="font-medium">Modality:</span>
                    <div className="text-gray-500">{ds.modality}</div>
                  </div>
                  <div>
                    <span className="font-medium">License:</span>
                    <div className="text-gray-500">{ds.license}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <p className="text-xl font-bold text-emerald-600">
                      {ds.imageCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500">Images</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-emerald-600">
                      {ds.downloadCount}
                    </p>
                    <p className="text-xs text-slate-500">Downloads</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-emerald-600">
                      {ds.citations}
                    </p>
                    <p className="text-xs text-slate-500">Citations</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 mt-4 pt-4 border-t">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(ds.publicationDate).toLocaleDateString()}
                  </span>
                  <span>{ds.size}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Database className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">
              No datasets match your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};