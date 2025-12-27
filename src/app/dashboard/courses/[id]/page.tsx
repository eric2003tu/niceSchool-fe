'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/login/Card';
import {
  BookOpen,
  Building2,
  GraduationCap,
  Users,
  Calendar,
  ArrowLeft,
  ExternalLink,
  Edit,
  Target,
  Award,
  FileText,
  Clock,
  ChevronRight,
  CheckCircle,
  XCircle,
  Plus,
  Book,
  List,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

interface Program {
  id: string;
  code: string;
  name: string;
  level: string;
  status: string;
  departmentId: string;
  careerPaths: string[];
  admissionRequirements: string | null;
  accreditation: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Instructor {
  id: string;
  name: string;
  email: string;
}

interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  headId: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
}

interface Course {
  id: string;
  code: string;
  title: string;
  description: string | null;
  type: string;
  status: string;
  credits: number;
  semester: string | null;
  level: string | null;
  maxStudents: number | null;
  minStudents: number | null;
  departmentId: string;
  learningObjectives: string[];
  topics: string[];
  textbooks: string | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  department: Department;
  programs: Program[];
  instructors: Instructor[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://niceschool-be-1.onrender.com/api/academics/courses/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch course: ${response.status}`);
      }
      
      const data: Course = await response.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
      setError(error instanceof Error ? error.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: string, archivedAt: string | null) => {
    if (archivedAt) {
      return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Archived</Badge>;
    }
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Active</Badge>;
      case 'INACTIVE':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'LECTURE':
        return <Badge className="bg-blue-500">Lecture</Badge>;
      case 'LAB':
        return <Badge className="bg-green-500">Lab</Badge>;
      case 'SEMINAR':
        return <Badge className="bg-purple-500">Seminar</Badge>;
      case 'WORKSHOP':
        return <Badge className="bg-orange-500">Workshop</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getLevelBadge = (level: string | null) => {
    if (!level) return null;
    switch (level) {
      case 'UNDERGRADUATE':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Undergraduate</Badge>;
      case 'POSTGRADUATE':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Postgraduate</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/courses">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Course Not Found</h1>
        </div>
        <Alert variant="destructive" className="border-0 shadow-sm">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'The requested course could not be found.'}
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/dashboard/courses">
            Back to Courses
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="border-border/50">
            <Link href="/dashboard/courses">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
              {getStatusBadge(course.status, course.archivedAt)}
              {getTypeBadge(course.type)}
            </div>
            <p className="text-muted-foreground mt-1">
              Course Code: {course.code} • Created {formatDate(course.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/50" asChild>
            <Link href={`/dashboard/departments/${course.departmentId}`}>
              <Building2 className="mr-2 h-4 w-4" />
              View Department
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="border-border/50">
            <Edit className="mr-2 h-4 w-4" />
            Edit Course
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Assign Instructor
          </Button>
        </div>
      </div>

      {/* Quick Stats - No border */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Department</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.department.name}</div>
            <p className="text-xs text-muted-foreground">{course.department.code}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Credits</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.credits}</div>
            <p className="text-xs text-muted-foreground">
              {course.type.toLowerCase()} course
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.programs.length}</div>
            <p className="text-xs text-muted-foreground">
              {course.programs.filter(p => p.level === 'UNDERGRADUATE').length} UG • {course.programs.filter(p => p.level === 'POSTGRADUATE').length} PG
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Instructors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{course.instructors.length}</div>
            <p className="text-xs text-muted-foreground">
              {course.instructors.length === 0 ? 'Not assigned' : `${course.instructors.length} assigned`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-transparent border-b border-border/50 rounded-none p-0 h-auto">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="programs" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Programs ({course.programs.length})
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Course Content
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Course Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Description */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Course Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">{course.code} - {course.title}</h3>
                    {course.description ? (
                      <p className="text-muted-foreground">{course.description}</p>
                    ) : (
                      <p className="text-muted-foreground italic">No description provided</p>
                    )}
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Course Code</div>
                      <div className="font-medium">{course.code}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Course Type</div>
                      <div>{getTypeBadge(course.type)}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Credits</div>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>{course.credits} credits</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Level</div>
                      <div>{getLevelBadge(course.level) || 'Not specified'}</div>
                    </div>
                    {course.semester && (
                      <div>
                        <div className="font-medium text-muted-foreground">Semester</div>
                        <div>Semester {course.semester}</div>
                      </div>
                    )}
                    {course.maxStudents && (
                      <div>
                        <div className="font-medium text-muted-foreground">Max Students</div>
                        <div>{course.maxStudents}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Department Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Department Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">{course.department.name}</h3>
                    <p className="text-sm text-muted-foreground">{course.department.description}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Department Code</div>
                      <div>{course.department.code}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Status</div>
                      <div>
                        {course.department.archivedAt ? (
                          <Badge variant="destructive">Archived</Badge>
                        ) : (
                          <Badge className="bg-green-500">Active</Badge>
                        )}
                      </div>
                    </div>
                    {course.department.email && (
                      <div>
                        <div className="font-medium text-muted-foreground">Email</div>
                        <div>{course.department.email}</div>
                      </div>
                    )}
                    {course.department.location && (
                      <div>
                        <div className="font-medium text-muted-foreground">Location</div>
                        <div>{course.department.location}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Course Details */}
            <div className="space-y-6">
              {/* Course Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div>{getStatusBadge(course.status, course.archivedAt)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Min Students</div>
                      <div>{course.minStudents || 'Not specified'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Max Students</div>
                      <div>{course.maxStudents || 'Not specified'}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Created</div>
                      <div>{formatDate(course.createdAt)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                      <div>{formatDate(course.updatedAt)}</div>
                    </div>
                    {course.archivedAt && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Archived</div>
                        <div>{formatDate(course.archivedAt)}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Instructors */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Instructors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {course.instructors.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No instructors assigned</p>
                      <Button size="sm" className="mt-2">
                        <Plus className="mr-2 h-3 w-3" />
                        Assign Instructor
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {course.instructors.map((instructor) => (
                        <div key={instructor.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{instructor.name}</div>
                            <div className="text-xs text-muted-foreground">{instructor.email}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-border/50" asChild>
                      <Link href={`/dashboard/departments/${course.departmentId}`}>
                        <Building2 className="mr-2 h-4 w-4" />
                        View Department
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Course
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Program
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Instructors
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Associated Programs</h2>
              <p className="text-sm text-muted-foreground">
                Programs that include {course.code} in their curriculum
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add to Program
            </Button>
          </div>

          {course.programs.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No programs found</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  This course is not associated with any programs yet.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Program
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {course.programs.map((program) => (
                <Card key={program.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <CardDescription className="mt-1">{program.code}</CardDescription>
                      </div>
                      <Badge className={
                        program.level === 'UNDERGRADUATE' ? 'bg-blue-500' : 
                        program.level === 'POSTGRADUATE' ? 'bg-purple-500' : ''
                      }>
                        {program.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {program.careerPaths.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Career Paths</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.careerPaths.map((path, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {path}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-muted-foreground">Status</div>
                        <div>
                          {program.status === 'ACTIVE' ? (
                            <Badge className="bg-green-500">Active</Badge>
                          ) : (
                            <Badge variant="destructive">Inactive</Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Created</div>
                        <div>{formatDate(program.createdAt)}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/dashboard/programs/${program.id}`}>
                          View Program Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Course Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Learning Objectives */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.learningObjectives.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No learning objectives defined</p>
                    <Button size="sm" className="mt-4">
                      <Plus className="mr-2 h-3 w-3" />
                      Add Learning Objectives
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {/* Topics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Course Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.topics.length === 0 ? (
                  <div className="text-center py-8">
                    <List className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No topics defined</p>
                    <Button size="sm" className="mt-4">
                      <Plus className="mr-2 h-3 w-3" />
                      Add Topics
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Textbooks */}
            <Card className="border-0 shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Textbooks & Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                {course.textbooks ? (
                  <div className="space-y-4">
                    <p className="text-sm">{course.textbooks}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm">
                        <Plus className="mr-2 h-3 w-3" />
                        Add Textbook
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="mr-2 h-3 w-3" />
                        Edit Materials
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No textbooks or materials specified</p>
                    <Button size="sm" className="mt-4">
                      <Plus className="mr-2 h-3 w-3" />
                      Add Textbooks
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Course Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Course Settings</CardTitle>
                <CardDescription>
                  Configure course settings and metadata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Course Status</h3>
                    <div className="flex items-center gap-2">
                      {course.archivedAt ? (
                        <>
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="text-destructive">Archived on {formatDate(course.archivedAt)}</span>
                        </>
                      ) : course.status === 'ACTIVE' ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-500">Active Course</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="text-destructive">Inactive Course</span>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Enrollment Limits</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Minimum Students</span>
                        <span>{course.minStudents || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maximum Students</span>
                        <span>{course.maxStudents || 'Not set'}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Timestamps</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created</span>
                        <span>{formatDate(course.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span>{formatDate(course.updatedAt)}</span>
                      </div>
                      {course.archivedAt && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Archived</span>
                          <span>{formatDate(course.archivedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-0 shadow-sm border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for this course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Archive Course</h4>
                      <p className="text-sm text-muted-foreground">
                        Archive this course. Archived courses are hidden from most views.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      {course.archivedAt ? 'Unarchive' : 'Archive'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Course</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete this course from all programs.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Remove from Programs</h4>
                      <p className="text-sm text-muted-foreground">
                        Remove this course from all associated programs.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}