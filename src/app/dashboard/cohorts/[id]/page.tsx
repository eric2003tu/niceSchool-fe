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
  Users,
  Calendar,
  Building2,
  GraduationCap,
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
  User,
  School,
  CalendarDays,
  TrendingUp,
  BookOpen,
  UserPlus,
  Download,
  BarChart,
  History,
  Settings,
  Clock3,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  AlertTriangle,
  Trash2,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

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

interface Student {
  id: string;
  profileId: string;
  studentNumber: string;
  enrollmentDate: string;
  graduationDate: string | null;
  academicStatus: string;
  programId: string;
  cohortId: string;
  major: string | null;
  minor: string | null;
  tuitionBalance: string;
  scholarship: string | null;
  createdById: string | null;
  applicationId: string | null;
  createdAt: string;
  updatedAt: string;
}

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
  program: Program;
  students: Student[];
}

export default function CohortDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCohort();
    }
  }, [id]);

  const fetchCohort = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://niceschool-be-1.onrender.com/api/academics/cohorts/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch cohort: ${response.status}`);
      }
      
      const data: Cohort = await response.json();
      setCohort(data);
    } catch (error) {
      console.error('Error fetching cohort:', error);
      setError(error instanceof Error ? error.message : 'Failed to load cohort');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getSemesterBadge = (semester: string) => {
    switch (semester) {
      case 'FALL':
        return <Badge className="bg-amber-500"><Calendar className="mr-1 h-3 w-3" /> Fall</Badge>;
      case 'SPRING':
        return <Badge className="bg-emerald-500"><Calendar className="mr-1 h-3 w-3" /> Spring</Badge>;
      case 'SUMMER':
        return <Badge className="bg-sky-500"><Calendar className="mr-1 h-3 w-3" /> Summer</Badge>;
      case 'WINTER':
        return <Badge className="bg-slate-500"><Calendar className="mr-1 h-3 w-3" /> Winter</Badge>;
      default:
        return <Badge variant="outline">{semester}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'UNDERGRADUATE':
        return <Badge className="bg-blue-500"><GraduationCap className="mr-1 h-3 w-3" /> Undergraduate</Badge>;
      case 'POSTGRADUATE':
        return <Badge className="bg-purple-500"><GraduationCap className="mr-1 h-3 w-3" /> Postgraduate</Badge>;
      case 'DOCTORATE':
        return <Badge className="bg-red-500"><GraduationCap className="mr-1 h-3 w-3" /> Doctorate</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getStudentStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Active</Badge>;
      case 'INACTIVE':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Inactive</Badge>;
      case 'GRADUATED':
        return <Badge className="bg-purple-500"><Award className="mr-1 h-3 w-3" /> Graduated</Badge>;
      case 'WITHDRAWN':
        return <Badge className="bg-red-500"><XCircle className="mr-1 h-3 w-3" /> Withdrawn</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    if (!cohort?.endDate || !cohort?.startDate) return 0;
    const start = new Date(cohort.startDate).getTime();
    const end = new Date(cohort.endDate).getTime();
    const now = new Date().getTime();
    
    if (now >= end) return 100;
    if (now <= start) return 0;
    
    const totalDuration = end - start;
    const elapsedDuration = now - start;
    return Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
  };

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    if (!cohort?.endDate) return 'N/A';
    const end = new Date(cohort.endDate);
    const now = new Date();
    
    if (now >= end) return 'Completed';
    
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 365) {
      const years = Math.floor(diffDays / 365);
      const remainingDays = diffDays % 365;
      return `${years} year${years > 1 ? 's' : ''} ${remainingDays > 0 ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`;
    } else if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return `${months} month${months > 1 ? 's' : ''} ${remainingDays > 0 ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`;
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
  };

  // Calculate student statistics
  const calculateStudentStats = () => {
    if (!cohort?.students) return { total: 0, active: 0, graduated: 0, withdrawn: 0 };
    
    const total = cohort.students.length;
    const active = cohort.students.filter(s => s.academicStatus === 'ACTIVE').length;
    const graduated = cohort.students.filter(s => s.academicStatus === 'GRADUATED').length;
    const withdrawn = cohort.students.filter(s => s.academicStatus === 'WITHDRAWN').length;
    
    return { total, active, graduated, withdrawn };
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (error || !cohort) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/cohorts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Cohort Not Found</h1>
        </div>
        <Alert variant="destructive" className="border-0 shadow-sm">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'The requested cohort could not be found.'}
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/dashboard/cohorts">
            Back to Cohorts
          </Link>
        </Button>
      </div>
    );
  }

  const completionPercentage = calculateCompletionPercentage();
  const timeRemaining = calculateTimeRemaining();
  const studentStats = calculateStudentStats();
  const isCompleted = completionPercentage >= 100;
  const isUpcoming = new Date() < new Date(cohort.startDate);

  return (
    <div className="space-y-8">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="border-border/50">
            <Link href="/dashboard/cohorts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{cohort.name}</h1>
              {getLevelBadge(cohort.program.level)}
              {getSemesterBadge(cohort.intakeSemester)}
            </div>
            <p className="text-muted-foreground mt-1">
              Cohort Code: {cohort.code} • Created {formatDate(cohort.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/50" asChild>
            <Link href={`/dashboard/programs/${cohort.programId}`}>
              <BookOpen className="mr-2 h-4 w-4" />
              View Program
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="border-border/50">
            <Edit className="mr-2 h-4 w-4" />
            Edit Cohort
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Quick Stats - No border */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {studentStats.active} active • {studentStats.graduated} graduated
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Program</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cohort.program.code}</div>
            <p className="text-xs text-muted-foreground truncate">{cohort.program.name}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Intake</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cohort.intakeYear}</div>
            <p className="text-xs text-muted-foreground capitalize">
              {cohort.intakeSemester.toLowerCase()} intake
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {isCompleted ? 'Completed' : `${timeRemaining} remaining`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Cohort Timeline</CardTitle>
          <CardDescription>
            Track the progress of this cohort from start to completion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Cohort Progress</span>
              <span className="text-muted-foreground">{completionPercentage}% complete</span>
            </div>
            <Progress 
              value={completionPercentage} 
              className={`h-2 ${isCompleted ? 'bg-green-500' : completionPercentage >= 75 ? 'bg-blue-500' : completionPercentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <div className="font-medium text-muted-foreground">Start Date</div>
              <div className="font-medium">{formatDate(cohort.startDate)}</div>
              {isUpcoming && <Badge className="bg-blue-500 mt-1">Upcoming</Badge>}
            </div>
            <div className="space-y-1 text-center">
              <div className="font-medium text-muted-foreground">Current Status</div>
              <div className="font-medium">
                {isCompleted ? 'Completed' : isUpcoming ? 'Upcoming' : 'In Progress'}
              </div>
              {!isCompleted && !isUpcoming && (
                <Badge className="bg-green-500 mt-1">Active</Badge>
              )}
            </div>
            <div className="space-y-1 text-right">
              <div className="font-medium text-muted-foreground">End Date</div>
              <div className="font-medium">{formatDate(cohort.endDate)}</div>
              {cohort.graduationDate && (
                <div className="text-xs text-muted-foreground">
                  Graduation: {formatDate(cohort.graduationDate)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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
            value="students" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Students ({studentStats.total})
          </TabsTrigger>
          <TabsTrigger 
            value="program" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Program Details
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Analytics
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
            {/* Cohort Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cohort Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Cohort Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">{cohort.code} - {cohort.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      This cohort is part of the {cohort.program.name} program, starting in {cohort.intakeYear} {cohort.intakeSemester.toLowerCase()} semester.
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Cohort Code</div>
                      <div className="font-medium">{cohort.code}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Cohort Name</div>
                      <div>{cohort.name}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Intake Year</div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{cohort.intakeYear}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Intake Semester</div>
                      <div>{getSemesterBadge(cohort.intakeSemester)}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Duration</div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatDate(cohort.startDate)} → {formatDate(cohort.endDate)}
                        </span>
                      </div>
                    </div>
                    {cohort.graduationDate && (
                      <div>
                        <div className="font-medium text-muted-foreground">Graduation Date</div>
                        <div>{formatDate(cohort.graduationDate)}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Program Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    Program Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">{cohort.program.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cohort.program.code} • {cohort.program.level}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Program Code</div>
                      <div className="font-medium">{cohort.program.code}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Academic Level</div>
                      <div>{getLevelBadge(cohort.program.level)}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Program Status</div>
                      <div>
                        {cohort.program.status === 'ACTIVE' ? (
                          <Badge className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </div>
                    </div>
                    {cohort.program.accreditation && (
                      <div>
                        <div className="font-medium text-muted-foreground">Accreditation</div>
                        <div>{cohort.program.accreditation}</div>
                      </div>
                    )}
                  </div>

                  {cohort.program.careerPaths.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium text-sm mb-2">Career Paths</h4>
                        <div className="flex flex-wrap gap-2">
                          {cohort.program.careerPaths.map((path, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {path}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {cohort.program.admissionRequirements && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium text-sm mb-2">Admission Requirements</h4>
                        <p className="text-sm text-muted-foreground">
                          {cohort.program.admissionRequirements}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Cohort Details */}
            <div className="space-y-6">
              {/* Cohort Details */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Cohort Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div>
                        {isCompleted ? (
                          <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Completed</Badge>
                        ) : isUpcoming ? (
                          <Badge className="bg-blue-500"><Clock className="mr-1 h-3 w-3" /> Upcoming</Badge>
                        ) : (
                          <Badge className="bg-amber-500"><TrendingUp className="mr-1 h-3 w-3" /> In Progress</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Student Distribution</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active</span>
                          <span>{studentStats.active}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Graduated</span>
                          <span>{studentStats.graduated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Withdrawn</span>
                          <span>{studentStats.withdrawn}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Created</div>
                      <div>{formatDate(cohort.createdAt)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                      <div>{formatDate(cohort.updatedAt)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Duration</div>
                      <div>
                        {new Date(cohort.endDate).getFullYear() - new Date(cohort.startDate).getFullYear()} years
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Student Statistics */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Student Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{studentStats.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{studentStats.active}</div>
                        <div className="text-xs text-muted-foreground">Active</div>
                      </div>
                    </div>
                    <Progress 
                      value={studentStats.total > 0 ? (studentStats.active / studentStats.total) * 100 : 0} 
                      className="h-2"
                    />
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Completion Rate</span>
                        <span>{studentStats.total > 0 ? Math.round((studentStats.active / studentStats.total) * 100) : 0}%</span>
                      </div>
                      {studentStats.total === 0 && (
                        <p className="text-muted-foreground text-xs text-center py-2">
                          No students enrolled yet
                        </p>
                      )}
                    </div>
                  </div>
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
                      <Link href={`/dashboard/programs/${cohort.programId}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Program
                        <ChevronRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Cohort
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Student
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Student Roster</h2>
              <p className="text-sm text-muted-foreground">
                Manage students enrolled in {cohort.code}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-border/50">
                <Download className="mr-2 h-4 w-4" />
                Export List
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          </div>

          {cohort.students.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Students Enrolled</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                  This cohort doesn't have any students enrolled yet. Add students to track their progress and manage their academic journey.
                </p>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Students to Cohort
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {/* Student Statistics */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{studentStats.total}</div>
                      <div className="text-sm text-muted-foreground">Total Students</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{studentStats.active}</div>
                      <div className="text-sm text-muted-foreground">Active</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{studentStats.graduated}</div>
                      <div className="text-sm text-muted-foreground">Graduated</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{studentStats.withdrawn}</div>
                      <div className="text-sm text-muted-foreground">Withdrawn</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Students List */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                  <CardDescription>
                    Click on a student to view detailed information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                      <div className="col-span-3">Student</div>
                      <div className="col-span-2">Student Number</div>
                      <div className="col-span-2">Enrollment Date</div>
                      <div className="col-span-2">Academic Status</div>
                      <div className="col-span-2">Tuition Balance</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {cohort.students.map((student) => (
                        <div key={student.id} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-muted/50">
                          <div className="col-span-3">
                            <div className="font-medium">Student {student.studentNumber}</div>
                            <div className="text-xs text-muted-foreground">
                              {student.major || 'Undeclared Major'}
                            </div>
                          </div>
                          <div className="col-span-2 font-medium">{student.studentNumber}</div>
                          <div className="col-span-2">{formatDate(student.enrollmentDate)}</div>
                          <div className="col-span-2">{getStudentStatusBadge(student.academicStatus)}</div>
                          <div className="col-span-2">
                            <div className={`font-medium ${parseFloat(student.tuitionBalance) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              ${parseFloat(student.tuitionBalance).toFixed(2)}
                            </div>
                            {student.scholarship && (
                              <div className="text-xs text-muted-foreground">
                                Scholarship: {student.scholarship}
                              </div>
                            )}
                          </div>
                          <div className="col-span-1 text-right">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Program Details Tab */}
        <TabsContent value="program" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Program Details</h2>
              <p className="text-sm text-muted-foreground">
                Information about the {cohort.program.name} program
              </p>
            </div>
            <Button asChild>
              <Link href={`/dashboard/programs/${cohort.programId}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Program
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Program Overview */}
            <Card className="border-0 shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  Program Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Program Code</h3>
                      <p className="text-lg font-medium">{cohort.program.code}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Program Name</h3>
                      <p className="text-lg font-medium">{cohort.program.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Academic Level</h3>
                      <div className="mt-1">{getLevelBadge(cohort.program.level)}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Program Status</h3>
                      <div className="mt-1">
                        {cohort.program.status === 'ACTIVE' ? (
                          <Badge className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                      <p className="text-lg font-medium">
                        {new Date(cohort.endDate).getFullYear() - new Date(cohort.startDate).getFullYear()} years
                      </p>
                    </div>
                    {cohort.program.accreditation && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Accreditation</h3>
                        <p className="text-lg font-medium">{cohort.program.accreditation}</p>
                      </div>
                    )}
                  </div>
                </div>

                {cohort.program.careerPaths.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Career Paths</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {cohort.program.careerPaths.map((path, index) => (
                          <Card key={index} className="border-border/50">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{path}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {cohort.program.admissionRequirements && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Admission Requirements</h3>
                      <p className="text-sm">{cohort.program.admissionRequirements}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Program Timeline */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Program Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium">Start Date</span>
                    </div>
                    <span className="text-sm">{formatDate(cohort.program.startDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Current Status</span>
                    </div>
                    <span className="text-sm">
                      {cohort.program.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span className="text-sm font-medium">Created</span>
                    </div>
                    <span className="text-sm">{formatDate(cohort.program.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm font-medium">Last Updated</span>
                    </div>
                    <span className="text-sm">{formatDate(cohort.program.updatedAt)}</span>
                  </div>
                  {cohort.program.endDate && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium">End Date</span>
                      </div>
                      <span className="text-sm">{formatDate(cohort.program.endDate)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Cohorts */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Related Cohorts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center py-4">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      View all cohorts for this program
                    </p>
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <Link href={`/dashboard/programs/${cohort.programId}/cohorts`}>
                        View All Cohorts
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Cohort Analytics</h2>
              <p className="text-sm text-muted-foreground">
                Insights and statistics for {cohort.code}
              </p>
            </div>
            <Button variant="outline" className="border-border/50">
              <Download className="mr-2 h-4 w-4" />
              Export Analytics
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Performance Metrics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key metrics for cohort performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="font-medium">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm">Student Retention</span>
                    <span className="font-medium">
                      {studentStats.total > 0 ? Math.round((studentStats.active / studentStats.total) * 100) : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={studentStats.total > 0 ? (studentStats.active / studentStats.total) * 100 : 0} 
                    className="h-2" 
                  />
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm">Time Elapsed</span>
                    <span className="font-medium">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Student Distribution */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Student Distribution</CardTitle>
                <CardDescription>
                  Breakdown of student statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{studentStats.active}</div>
                      <div className="text-sm text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{studentStats.graduated}</div>
                      <div className="text-sm text-muted-foreground">Graduated</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{studentStats.withdrawn}</div>
                      <div className="text-sm text-muted-foreground">Withdrawn</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{studentStats.total}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                  </div>
                  
                  {studentStats.total > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Active Students</span>
                        <span>{studentStats.active} ({Math.round((studentStats.active / studentStats.total) * 100)}%)</span>
                      </div>
                      <Progress 
                        value={(studentStats.active / studentStats.total) * 100} 
                        className="h-2 bg-green-500" 
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Timeline Analysis */}
            <Card className="border-0 shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle>Timeline Analysis</CardTitle>
                <CardDescription>
                  Cohort duration and progress timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-primary"
                      style={{ width: `${completionPercentage}%` }}
                    />
                    <div className="absolute inset-0 flex justify-between items-center px-2">
                      <div className="h-3 w-3 rounded-full border-2 border-white bg-primary"></div>
                      <div className="h-3 w-3 rounded-full border-2 border-white bg-muted-foreground"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Start Date</div>
                      <div className="font-medium">{formatDate(cohort.startDate)}</div>
                      <div className="text-xs text-muted-foreground">
                        {isUpcoming ? 'Upcoming' : 'Started'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-muted-foreground">End Date</div>
                      <div className="font-medium">{formatDate(cohort.endDate)}</div>
                      <div className="text-xs text-muted-foreground">
                        {isCompleted ? 'Completed' : timeRemaining}
                      </div>
                    </div>
                  </div>
                  {cohort.graduationDate && (
                    <div className="text-center">
                      <div className="font-medium text-muted-foreground">Expected Graduation</div>
                      <div className="font-medium">{formatDate(cohort.graduationDate)}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Cohort Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Cohort Settings</CardTitle>
                <CardDescription>
                  Configure cohort settings and details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Cohort Status</h3>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-green-500">Completed on {formatDate(cohort.endDate)}</span>
                        </>
                      ) : isUpcoming ? (
                        <>
                          <Clock className="h-5 w-5 text-blue-500" />
                          <span className="text-blue-500">Upcoming - Starts {formatDate(cohort.startDate)}</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-5 w-5 text-amber-500" />
                          <span className="text-amber-500">In Progress - {completionPercentage}% complete</span>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Cohort Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cohort Code</span>
                        <span className="font-medium">{cohort.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cohort Name</span>
                        <span>{cohort.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Intake</span>
                        <span>{cohort.intakeYear} {cohort.intakeSemester}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Timestamps</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created</span>
                        <span>{formatDate(cohort.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated</span>
                        <span>{formatDate(cohort.updatedAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span>
                          {new Date(cohort.endDate).getFullYear() - new Date(cohort.startDate).getFullYear()} years
                        </span>
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
                  Irreversible actions for this cohort
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Archive Cohort</h4>
                      <p className="text-sm text-muted-foreground">
                        Archive this cohort. Archived cohorts are hidden from most views.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Archive className="mr-2 h-3 w-3" />
                      Archive
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Transfer Students</h4>
                      <p className="text-sm text-muted-foreground">
                        Transfer all students to another cohort.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Users className="mr-2 h-3 w-3" />
                      Transfer
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Cohort</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete this cohort and all student associations.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Warning</AlertTitle>
                  <AlertDescription className="text-amber-700 text-sm">
                    These actions are irreversible. Please proceed with caution.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}