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
} from '@/components/ui/card';
import {
  GraduationCap,
  Building2,
  BookOpen,
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
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

interface Cohort {
  id: string;
  name: string;
  code: string;
  programId: string;
  intakeYear: number;
  intakeSemester: string;
  startDate: string;
  endDate: string;
  graduationDate: string | null;
  advisorId: string | null;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
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

interface Program {
  id: string;
  code: string;
  name: string;
  level: 'UNDERGRADUATE' | 'POSTGRADUATE';
  status: string;
  departmentId: string;
  careerPaths: string[];
  admissionRequirements: string | null;
  accreditation: string | null;
  startDate: string | null;
  endDate: string | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  department: Department;
  cohorts: Cohort[];
  courses: Course[];
}

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3001/api/academics/programs/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch program: ${response.status}`);
      }
      
      const data: Program = await response.json();
      setProgram(data);
    } catch (error) {
      console.error('Error fetching program:', error);
      setError(error instanceof Error ? error.message : 'Failed to load program');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Active</Badge>;
      case 'INACTIVE':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'UNDERGRADUATE':
        return <Badge className="bg-blue-500">Undergraduate</Badge>;
      case 'POSTGRADUATE':
        return <Badge className="bg-purple-500">Postgraduate</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getSemesterBadge = (semester: string) => {
    switch (semester) {
      case 'FALL':
        return <Badge className="bg-orange-500">Fall</Badge>;
      case 'SPRING':
        return <Badge className="bg-green-500">Spring</Badge>;
      case 'SUMMER':
        return <Badge className="bg-blue-500">Summer</Badge>;
      default:
        return <Badge variant="outline">{semester}</Badge>;
    }
  };

  const getCourseStatusBadge = (status: string, archivedAt: string | null) => {
    if (archivedAt) {
      return <Badge variant="destructive">Archived</Badge>;
    }
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'INACTIVE':
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCourseTypeBadge = (type: string) => {
    switch (type) {
      case 'LECTURE':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Lecture</Badge>;
      case 'LAB':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Lab</Badge>;
      case 'SEMINAR':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Seminar</Badge>;
      case 'WORKSHOP':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Workshop</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
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

  if (error || !program) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/programs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Program Not Found</h1>
        </div>
        <Alert variant="destructive" className="border-0 shadow-sm">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'The requested program could not be found.'}
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/dashboard/programs">
            Back to Programs
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
            <Link href="/dashboard/programs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{program.name}</h1>
              {getStatusBadge(program.status)}
              {getLevelBadge(program.level)}
            </div>
            <p className="text-muted-foreground mt-1">
              Program Code: {program.code} • Created {formatDate(program.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/50" asChild>
            <Link href={`/dashboard/departments/${program.departmentId}`}>
              <Building2 className="mr-2 h-4 w-4" />
              View Department
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="border-border/50">
            <Edit className="mr-2 h-4 w-4" />
            Edit Program
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Cohort
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
            <div className="text-2xl font-bold">{program.department.name}</div>
            <p className="text-xs text-muted-foreground">{program.department.code}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Cohorts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{program.cohorts.length}</div>
            <p className="text-xs text-muted-foreground">
              Active: {program.cohorts.filter(c => new Date(c.endDate) > new Date()).length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{program.courses.length}</div>
            <p className="text-xs text-muted-foreground">
              {program.courses.reduce((sum, course) => sum + course.credits, 0)} total credits
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {program.startDate && program.endDate ? (
                <>
                  {Math.ceil(
                    (new Date(program.endDate).getTime() - new Date(program.startDate).getTime()) / 
                    (1000 * 60 * 60 * 24 * 365)
                  )} years
                </>
              ) : 'Not set'}
            </div>
            <p className="text-xs text-muted-foreground">
              {program.startDate ? formatDate(program.startDate) : 'No start date'}
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
            value="cohorts" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Cohorts ({program.cohorts.length})
          </TabsTrigger>
          <TabsTrigger 
            value="courses" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Courses ({program.courses.length})
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
            {/* Program Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Career Paths */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Career Paths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {program.careerPaths.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {program.careerPaths.map((path, index) => (
                        <Badge 
                          key={index} 
                          variant="outline"
                          className="px-3 py-1.5 text-sm"
                        >
                          {path}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No career paths specified</p>
                  )}
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
                    <h3 className="font-medium">{program.department.name}</h3>
                    <p className="text-sm text-muted-foreground">{program.department.description}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Department Code</div>
                      <div>{program.department.code}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Status</div>
                      <div>
                        {program.department.archivedAt ? (
                          <Badge variant="destructive">Archived</Badge>
                        ) : (
                          <Badge className="bg-green-500">Active</Badge>
                        )}
                      </div>
                    </div>
                    {program.department.email && (
                      <div>
                        <div className="font-medium text-muted-foreground">Email</div>
                        <div>{program.department.email}</div>
                      </div>
                    )}
                    {program.department.location && (
                      <div>
                        <div className="font-medium text-muted-foreground">Location</div>
                        <div>{program.department.location}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Program Details */}
            <div className="space-y-6">
              {/* Program Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Program Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Program Code</div>
                      <div className="font-medium">{program.code}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Level</div>
                      <div>{getLevelBadge(program.level)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div>{getStatusBadge(program.status)}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                      <div>{formatDate(program.startDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">End Date</div>
                      <div>{formatDate(program.endDate)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accreditation & Requirements */}
              {(program.accreditation || program.admissionRequirements) && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Accreditation & Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {program.accreditation && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Accreditation</div>
                        <p className="text-sm">{program.accreditation}</p>
                      </div>
                    )}
                    {program.admissionRequirements && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Admission Requirements</div>
                        <p className="text-sm">{program.admissionRequirements}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Quick Links */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-border/50" asChild>
                      <Link href={`/dashboard/departments/${program.departmentId}`}>
                        <Building2 className="mr-2 h-4 w-4" />
                        View Department
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Program
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Course
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Cohorts Tab */}
        <TabsContent value="cohorts" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Student Cohorts</h2>
              <p className="text-sm text-muted-foreground">
                Manage student cohorts for {program.name}
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Cohort
            </Button>
          </div>

          {program.cohorts.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No cohorts found</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  This program doesn't have any cohorts yet.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Cohort
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {program.cohorts.map((cohort) => (
                <Card key={cohort.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{cohort.name}</CardTitle>
                        <CardDescription className="mt-1">{cohort.code}</CardDescription>
                      </div>
                      {getSemesterBadge(cohort.intakeSemester)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-muted-foreground">Intake Year</div>
                        <div className="font-semibold">{cohort.intakeYear}</div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Duration</div>
                        <div>
                          {Math.ceil(
                            (new Date(cohort.endDate).getTime() - new Date(cohort.startDate).getTime()) / 
                            (1000 * 60 * 60 * 24 * 365)
                          )} years
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Start Date</span>
                        <span>{formatDate(cohort.startDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">End Date</span>
                        <span>{formatDate(cohort.endDate)}</span>
                      </div>
                      {cohort.graduationDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Graduation Date</span>
                          <span>{formatDate(cohort.graduationDate)}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>{formatDate(cohort.createdAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Program Courses</h2>
              <p className="text-sm text-muted-foreground">
                {program.courses.length} courses • {program.courses.reduce((sum, course) => sum + course.credits, 0)} total credits
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course to Program
            </Button>
          </div>

          {program.courses.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No courses found</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  This program doesn't have any courses yet.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Course
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {program.courses.map((course) => (
                <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{course.code} - {course.title}</h3>
                          {getCourseStatusBadge(course.status, course.archivedAt)}
                          {getCourseTypeBadge(course.type)}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {course.credits} credits
                          </div>
                          {course.level && (
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              {course.level}
                            </div>
                          )}
                          {course.semester && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Semester {course.semester}
                            </div>
                          )}
                        </div>

                        {course.description && (
                          <p className="text-sm mt-2">{course.description}</p>
                        )}

                        {(course.maxStudents || course.minStudents) && (
                          <div className="flex items-center gap-4 text-sm mt-3">
                            {course.minStudents && (
                              <span>Min: {course.minStudents} students</span>
                            )}
                            {course.maxStudents && (
                              <span>Max: {course.maxStudents} students</span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-border/50">
                          View Details
                        </Button>
                        <Button variant="outline" size="icon" className="border-border/50" asChild>
                          <Link href={`/dashboard/departments/${course.departmentId}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Program Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Program Settings</CardTitle>
                <CardDescription>
                  Configure program settings and metadata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Program Status</h3>
                    <div className="flex items-center gap-2">
                      {program.status === 'ACTIVE' ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-500">Active Program</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-destructive" />
                          <span className="text-destructive">Inactive Program</span>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Timestamps</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created</span>
                        <span>{formatDate(program.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span>{formatDate(program.updatedAt)}</span>
                      </div>
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
                  Irreversible actions for this program
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Archive Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Archive this program. Archived programs are hidden from most views.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      {program.status === 'ACTIVE' ? 'Archive' : 'Unarchive'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete this program and all associated data.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      Delete
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