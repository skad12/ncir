import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Brain, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Image,
  Layers,
  Target,
  Users,
  Award,
  Download
} from "lucide-react";

interface AnnotationModuleProps {
  userRole: string;
}

const annotationQueue = [
  {
    id: "ANN-2024-001",
    patientId: "ANON-156",
    studyType: "Mammography",
    cancerType: "Breast Cancer",
    images: 4,
    priority: "High",
    assignedTo: "Dr. Sarah Adebayo",
    deadline: "Jan 20, 2024",
    hospital: "Lagos University Teaching Hospital",
    progress: 75,
    status: "In Progress"
  },
  {
    id: "ANN-2024-002",
    patientId: "ANON-157",
    studyType: "CT Chest",
    cancerType: "Lung Cancer",
    images: 12,
    priority: "Medium",
    assignedTo: "Prof. Ibrahim Kano",
    deadline: "Jan 22, 2024",
    hospital: "Ahmadu Bello University Teaching Hospital",
    progress: 0,
    status: "Pending"
  },
  {
    id: "ANN-2024-003",
    patientId: "ANON-158",
    studyType: "Histopathology",
    cancerType: "Cervical Cancer",
    images: 8,
    priority: "High",
    assignedTo: "Dr. Chioma Ezenwaka",
    deadline: "Jan 18, 2024",
    hospital: "University of Ibadan",
    progress: 100,
    status: "Completed"
  }
];

const annotationStats = {
  totalAssigned: 47,
  completed: 32,
  inProgress: 12,
  pending: 3,
  avgCompletionTime: "2.3 days",
  qualityScore: 94
};

export const AnnotationModule = ({ userRole }: AnnotationModuleProps) => {
  const [selectedTool, setSelectedTool] = useState("rectangle");
  const [selectedImage, setSelectedImage] = useState(annotationQueue[0]);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Pending': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (userRole !== 'annotator') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Access restricted to Annotators only.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Annotation Workspace</h2>
          <p className="text-muted-foreground">Review and annotate cancer imaging datasets</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          Annotator Portal
        </Badge>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-primary">{annotationStats.totalAssigned}</div>
            <p className="text-xs text-muted-foreground">Total Assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{annotationStats.completed}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{annotationStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-orange-600">{annotationStats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-secondary">{annotationStats.avgCompletionTime}</div>
            <p className="text-xs text-muted-foreground">Avg Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-primary">{annotationStats.qualityScore}%</div>
            <p className="text-xs text-muted-foreground">Quality Score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="queue" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Annotation Queue</span>
          </TabsTrigger>
          <TabsTrigger value="viewer" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Image Viewer</span>
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Quality Review</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Annotation Queue</CardTitle>
              <CardDescription>Your assigned annotation tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {annotationQueue.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTask === task.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedTask(task.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{task.id}</h4>
                          <p className="text-sm text-muted-foreground">{task.patientId}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Study:</span>
                        <p className="font-medium">{task.studyType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cancer Type:</span>
                        <p className="font-medium">{task.cancerType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Images:</span>
                        <p className="font-medium">{task.images}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Deadline:</span>
                        <p className="font-medium">{task.deadline}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{task.hospital}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {task.status !== "Completed" && (
                          <Button variant="medical" size="sm">
                            <Brain className="h-3 w-3 mr-1" />
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="viewer">
          <Card>
            <CardHeader>
              <CardTitle>OHIF Medical Image Viewer</CardTitle>
              <CardDescription>Integrated medical imaging viewer with annotation tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
                <Image className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Medical Image Viewer</h3>
                <p className="text-muted-foreground mb-4">
                  OHIF viewer will be embedded here for image viewing and annotation
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="medical">
                    <Layers className="h-4 w-4 mr-2" />
                    Segmentation Tools
                  </Button>
                  <Button variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Bounding Boxes
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Annotations
                  </Button>
                </div>
              </div>

              {/* Annotation Tools */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Segmentation Masks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                      Create precise tumor boundaries
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Layers className="h-3 w-3 mr-1" />
                      Start Segmentation
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Bounding Boxes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                      Mark regions of interest
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Target className="h-3 w-3 mr-1" />
                      Add Bounding Box
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Keypoint Labels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">
                      Mark specific anatomical points
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Target className="h-3 w-3 mr-1" />
                      Add Keypoints
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Quality Review Dashboard</CardTitle>
              <CardDescription>Review and approve annotations from other annotators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "QR-001", annotator: "Dr. Adebayo", accuracy: 96, issues: 2, status: "Approved" },
                  { id: "QR-002", annotator: "Dr. Chioma", accuracy: 87, issues: 5, status: "Needs Review" },
                  { id: "QR-003", annotator: "Prof. Ibrahim", accuracy: 93, issues: 3, status: "Approved" },
                ].map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{review.id}</p>
                        <p className="text-sm text-muted-foreground">by {review.annotator}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{review.accuracy}%</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{review.issues}</div>
                        <div className="text-xs text-muted-foreground">Issues</div>
                      </div>
                      <Badge className={review.status === "Approved" ? "bg-green-500" : "bg-orange-500"}>
                        {review.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};