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
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  GraduationCap,
  Users,
  FileText,
  ArrowLeft,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  Download,
  MoreVertical,
  ExternalLink,
  UserCheck,
  UserX,
  UserCog,
  BookOpen,
  AlertCircle,
  Timer,
  CheckCircle2,
  Ban,
  ListChecks,
  CalendarDays,
  MailPlus,
  UserPlus,
  Globe,
  Award as AwardIcon,
  Target,
  Briefcase,
  Book,
  MapPin,
  PhoneCall,
  Smartphone,
  Home,
  School,
  BriefcaseBusiness,
  FileCheck,
  FileArchive,
  FileSearch,
  FileQuestion,
  FileWarning,
  File,
  FileSpreadsheet,
  FileSignature,
  FileClock,
  UserPen,
  UserRoundCheck,
  UserRoundX,
  UserRoundCog,
  UserRoundSearch,
  UserRoundPen,
  History,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Tag,
  CreditCard,
  Shield,
  AlertTriangle,
  Bell,
  BellOff,
  MessageSquare,
  Send,
  MailOpen,
  DownloadCloud,
  Printer,
  Share2,
  Copy,
  QrCode,
  Map,
  Navigation,
  Compass,
  Database,
  Server,
  HardDrive,
  Cloud,
  Wifi,
  Battery,
  BatteryCharging,
  Plug,
  Zap,
  Sun,
  Moon,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  HelpCircle,
  Info,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Lock,
  Unlock,
  Key,
  KeyRound,
  Fingerprint,
  Scan,
  ScanFace,
  Camera,
  Image,
  Palette,
  PaintBucket,
  Brush,
  Palette as PaletteIcon,
  EyeOff,
  Eye as EyeIcon,
  Filter,
  Search,
  Grid,
  List,
  Layout,
  Columns,
  Sidebar,
  Menu,
  X,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
  ChevronsUp,
  ChevronsDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowDownLeft,
  Move,
  MoveHorizontal,
  MoveVertical,
  RotateCw,
  RotateCcw,
  RefreshCw,
  RefreshCcw,
  Rotate3D,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  Crop,
  Scissors,
  Copy as CopyIcon,
  Clipboard,
  ClipboardCheck,
  ClipboardCopy,
  ClipboardList,
  ClipboardX,
  ClipboardPen,
  FileEdit,
  FileMinus,
  FileX,
  FileCheck as FileCheckIcon,
  FileClock as FileClockIcon,
  FileQuestion as FileQuestionIcon,
  FileWarning as FileWarningIcon,
  FileText as FileTextIcon,
  FileArchive as FileArchiveIcon,
  FileSearch as FileSearchIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  FileSignature as FileSignatureIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ApplicantInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}

interface ProgramInfo {
  id: string;
  name: string;
}

interface CohortInfo {
  id: string;
  name: string;
}

interface ApplicationInfo {
  id: string;
  status: string;
  program: ProgramInfo;
  startSemester: string;
  createdAt: string;
}

interface ApplicantData {
  applicant: ApplicantInfo;
  applications: ApplicationInfo[];
  registered: boolean;
  cohort: CohortInfo | null;
  program: ProgramInfo;
}

const APPLICATION_STATUSES = [
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'INTERVIEW_SCHEDULED',
  'ADMITTED',
  'CONDITIONALLY_ADMITTED',
  'WAITLISTED',
  'REJECTED',
  'WITHDRAWN',
] as const;

type ApplicationStatus = typeof APPLICATION_STATUSES[number];

export default function ApplicantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [applicant, setApplicant] = useState<ApplicantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplicant();
    }
  }, [id]);

  const fetchApplicant = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3001/api/admissions/applicants/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'accept': '*/*'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Applicant not found');
        }
        throw new Error(`Failed to fetch applicant: ${response.status}`);
      }
      
      const data: ApplicantData = await response.json();
      setApplicant(data);
    } catch (error) {
      console.error('Error fetching applicant:', error);
      setError(error instanceof Error ? error.message : 'Failed to load applicant');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="outline" className="border-gray-300 text-gray-700"><FileText className="mr-1 h-3 w-3" /> Draft</Badge>;
      case 'SUBMITTED':
        return <Badge className="bg-blue-500"><Clock className="mr-1 h-3 w-3" /> Submitted</Badge>;
      case 'UNDER_REVIEW':
        return <Badge className="bg-amber-500"><Timer className="mr-1 h-3 w-3" /> Under Review</Badge>;
      case 'INTERVIEW_SCHEDULED':
        return <Badge className="bg-purple-500"><Calendar className="mr-1 h-3 w-3" /> Interview</Badge>;
      case 'ADMITTED':
        return <Badge className="bg-green-500"><CheckCircle2 className="mr-1 h-3 w-3" /> Admitted</Badge>;
      case 'CONDITIONALLY_ADMITTED':
        return <Badge className="bg-emerald-500"><CheckCircle className="mr-1 h-3 w-3" /> Conditional</Badge>;
      case 'WAITLISTED':
        return <Badge className="bg-orange-500"><Clock className="mr-1 h-3 w-3" /> Waitlisted</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Rejected</Badge>;
      case 'WITHDRAWN':
        return <Badge className="bg-gray-500"><Ban className="mr-1 h-3 w-3" /> Withdrawn</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'SUBMITTED': return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW': return 'bg-amber-100 text-amber-800';
      case 'INTERVIEW_SCHEDULED': return 'bg-purple-100 text-purple-800';
      case 'ADMITTED': return 'bg-green-100 text-green-800';
      case 'CONDITIONALLY_ADMITTED': return 'bg-emerald-100 text-emerald-800';
      case 'WAITLISTED': return 'bg-orange-100 text-orange-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'WITHDRAWN': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicantStatusBadge = (status: string, registered: boolean) => {
    if (!registered) {
      return <Badge className="bg-amber-500"><AlertCircle className="mr-1 h-3 w-3" /> Not Registered</Badge>;
    }
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500"><UserCheck className="mr-1 h-3 w-3" /> Active</Badge>;
      case 'INACTIVE':
        return <Badge variant="destructive"><UserX className="mr-1 h-3 w-3" /> Inactive</Badge>;
      case 'SUSPENDED':
        return <Badge className="bg-red-500"><Ban className="mr-1 h-3 w-3" /> Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLatestApplication = () => {
    if (!applicant?.applications.length) return null;
    return applicant.applications.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
    });
  };

  const getApplicationStats = () => {
    if (!applicant) return null;
    const stats = {
      total: applicant.applications.length,
      admitted: applicant.applications.filter(app => app.status === 'ADMITTED').length,
      rejected: applicant.applications.filter(app => app.status === 'REJECTED').length,
      pending: applicant.applications.filter(app => 
        ['SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW_SCHEDULED'].includes(app.status)
      ).length,
      conditional: applicant.applications.filter(app => app.status === 'CONDITIONALLY_ADMITTED').length,
      waitlisted: applicant.applications.filter(app => app.status === 'WAITLISTED').length,
    };
    return stats;
  };

  const handleSendEmail = () => {
    if (applicant) {
      window.open(`mailto:${applicant.applicant.email}`, '_blank');
    }
  };

  const handleExportData = () => {
    // Implement export functionality
    console.log('Exporting applicant data...');
  };

  const handleAssignCohort = () => {
    // Implement cohort assignment
    console.log('Assigning cohort...');
  };

  const handleUpdateStatus = (newStatus: ApplicationStatus, applicationId?: string) => {
    // Implement status update
    console.log(`Updating status to ${newStatus} for application ${applicationId}`);
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

  if (error || !applicant) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/applicants">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Applicant Not Found</h1>
        </div>
        <Alert variant="destructive" className="border-0 shadow-sm">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'The requested applicant could not be found.'}
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/dashboard/applicants">
            Back to Applicants
          </Link>
        </Button>
      </div>
    );
  }

  const latestApp = getLatestApplication();
  const appStats = getApplicationStats();
  const admittedApplications = applicant.applications.filter(app => app.status === 'ADMITTED');

  return (
    <div className="space-y-8">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="border-border/50">
            <Link href="/dashboard/applicants">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  {applicant.applicant.firstName} {applicant.applicant.lastName}
                </h1>
                {getApplicantStatusBadge(applicant.applicant.status, applicant.registered)}
              </div>
              <p className="text-muted-foreground mt-1">
                Applicant ID: {applicant.applicant.id} • {applicant.applicant.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border/50" onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button variant="outline" size="sm" className="border-border/50">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button>
            <UserCheck className="mr-2 h-4 w-4" />
            Manage
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appStats?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {appStats?.admitted || 0} admitted • {appStats?.pending || 0} pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Primary Program</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{applicant.program.name}</div>
            <p className="text-xs text-muted-foreground">
              {applicant.registered ? 'Registered' : 'Not registered'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Cohort</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {applicant.cohort ? applicant.cohort.name : 'Not assigned'}
            </div>
            <p className="text-xs text-muted-foreground">
              {applicant.cohort ? 'Assigned' : 'Awaiting assignment'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Latest Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {latestApp ? getStatusBadge(latestApp.status as ApplicationStatus) : 'No applications'}
            </div>
            <p className="text-xs text-muted-foreground">
              {latestApp ? formatDate(latestApp.createdAt) : 'N/A'}
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
            value="applications" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Applications ({applicant.applications.length})
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Activity
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
            {/* Applicant Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-muted-foreground">First Name</div>
                        <div className="font-medium">{applicant.applicant.firstName}</div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Last Name</div>
                        <div className="font-medium">{applicant.applicant.lastName}</div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Role</div>
                        <Badge variant="outline">{applicant.applicant.role}</Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-muted-foreground">Email</div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{applicant.applicant.email}</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Status</div>
                        <div>{getApplicantStatusBadge(applicant.applicant.status, applicant.registered)}</div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Registration</div>
                        <div>
                          {applicant.registered ? (
                            <Badge className="bg-green-500"><UserCheck className="mr-1 h-3 w-3" /> Registered</Badge>
                          ) : (
                            <Badge className="bg-amber-500"><AlertCircle className="mr-1 h-3 w-3" /> Not Registered</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Program & Cohort Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-muted-foreground">Primary Program</div>
                        <div className="font-semibold">{applicant.program.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Primary choice for admission
                        </div>
                      </div>
                      {applicant.cohort && (
                        <div>
                          <div className="font-medium text-muted-foreground">Assigned Cohort</div>
                          <div className="font-semibold">{applicant.cohort.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Student cohort assignment
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-muted-foreground">Application History</div>
                        <div className="font-semibold">{applicant.applications.length} applications</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Across {new Set(applicant.applications.map(app => app.program.name)).size} programs
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Latest Application</div>
                        {latestApp ? (
                          <div>
                            <div className="font-semibold">{latestApp.program.name}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {getStatusBadge(latestApp.status as ApplicationStatus)} • {formatDate(latestApp.createdAt)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-muted-foreground">No applications</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Quick Stats & Actions */}
            <div className="space-y-6">
              {/* Application Statistics */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Application Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  {appStats ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Total Applications</span>
                          <span className="font-bold">{appStats.total}</span>
                        </div>
                        <Progress value={(appStats.total / Math.max(appStats.total, 1)) * 100} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{appStats.admitted}</div>
                          <div className="text-xs text-muted-foreground">Admitted</div>
                        </div>
                        <div className="text-center p-3 bg-amber-50 rounded-lg">
                          <div className="text-xl font-bold text-amber-600">{appStats.pending}</div>
                          <div className="text-xs text-muted-foreground">Pending</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <div className="text-xl font-bold text-emerald-600">{appStats.conditional}</div>
                          <div className="text-xs text-muted-foreground">Conditional</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-xl font-bold text-red-600">{appStats.rejected}</div>
                          <div className="text-xs text-muted-foreground">Rejected</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No application statistics available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-border/50" onClick={handleSendEmail}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50" onClick={handleAssignCohort}>
                      <Users className="mr-2 h-4 w-4" />
                      Assign Cohort
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50" onClick={handleExportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-border/50">
                      <FileText className="mr-2 h-4 w-4" />
                      View Documents
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applicant.applications.slice(0, 3).map((app, index) => (
                      <div key={app.id} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`h-2 w-2 rounded-full mt-2 ${getStatusColor(app.status as ApplicationStatus).split(' ')[0]}`} />
                          {index < applicant.applications.length - 1 && (
                            <div className="h-8 w-px bg-border mt-1" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{app.program.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {getStatusBadge(app.status as ApplicationStatus)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {formatDate(app.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {applicant.applications.length > 3 && (
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        View {applicant.applications.length - 3} more applications
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">All Applications</h2>
              <p className="text-sm text-muted-foreground">
                {applicant.applications.length} applications across {new Set(applicant.applications.map(app => app.program.name)).size} programs
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-border/50">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </div>
          </div>

          {applicant.applications.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Applications</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                  This applicant hasn't submitted any applications yet.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Applications Summary */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{applicant.applications.length}</div>
                      <div className="text-sm text-muted-foreground">Total Applications</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{admittedApplications.length}</div>
                      <div className="text-sm text-muted-foreground">Admitted Programs</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{new Set(applicant.applications.map(app => app.program.name)).size}</div>
                      <div className="text-sm text-muted-foreground">Different Programs</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        {applicant.applications.filter(app => ['SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW_SCHEDULED'].includes(app.status)).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Pending Review</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {applicant.applications.map((application) => (
                  <Card key={application.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{application.program.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusBadge(application.status as ApplicationStatus)}
                                <span className="text-sm text-muted-foreground">
                                  • Start {application.startSemester}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="font-medium text-muted-foreground">Application ID</div>
                              <div className="font-mono text-xs">{application.id.substring(0, 8)}...</div>
                            </div>
                            <div>
                              <div className="font-medium text-muted-foreground">Applied On</div>
                              <div>{formatDate(application.createdAt)}</div>
                            </div>
                            <div>
                              <div className="font-medium text-muted-foreground">Duration</div>
                              <div>
                                {Math.floor((new Date().getTime() - new Date(application.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Application Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/applications/${application.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Application
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Documents
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                              {APPLICATION_STATUSES.map((status) => (
                                <DropdownMenuItem 
                                  key={status}
                                  onClick={() => handleUpdateStatus(status, application.id)}
                                >
                                  <div className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(status).split(' ')[0]}`} />
                                  {status.replace('_', ' ')}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/applications/${application.id}`}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Status Distribution */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Application Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {APPLICATION_STATUSES.filter(status => 
                      applicant.applications.some(app => app.status === status)
                    ).map((status) => {
                      const count = applicant.applications.filter(app => app.status === status).length;
                      const percentage = (count / applicant.applications.length) * 100;
                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {getStatusBadge(status as ApplicationStatus)}
                              <span className="text-muted-foreground">
                                {applicant.applications.filter(app => app.status === status).length} applications
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{percentage.toFixed(1)}%</span>
                              <span className="text-xs text-muted-foreground">
                                of total
                              </span>
                            </div>
                          </div>
                          <Progress 
                            value={percentage} 
                            className={`h-2 ${getStatusColor(status as ApplicationStatus).split(' ')[0]}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Documents</h2>
              <p className="text-sm text-muted-foreground">
                All documents submitted by {applicant.applicant.firstName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-border/50">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button>
                <FilePlus className="mr-2 h-4 w-4" />
                Request Document
              </Button>
            </div>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <FileSearch className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No Documents Available</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
                  Documents will appear here once they are uploaded or linked to applications.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                  <Button>
                    <FileSearch className="mr-2 h-4 w-4" />
                    View Application Docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Categories */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Application Forms', count: 0, icon: FileText, color: 'bg-blue-100 text-blue-600' },
              { title: 'Academic Records', count: 0, icon: GraduationCap, color: 'bg-green-100 text-green-600' },
              { title: 'Identification', count: 0, icon: User, color: 'bg-purple-100 text-purple-600' },
              { title: 'Recommendations', count: 0, icon: UserCheck, color: 'bg-amber-100 text-amber-600' },
            ].map((category) => (
              <Card key={category.title} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-lg ${category.color.split(' ')[0]} flex items-center justify-center`}>
                      <category.icon className={`h-6 w-6 ${category.color.split(' ')[1]}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{category.count}</div>
                      <div className="text-sm text-muted-foreground">{category.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Activity Timeline</h2>
              <p className="text-sm text-muted-foreground">
                Recent activity and events for {applicant.applicant.firstName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-border/50">
                <Download className="mr-2 h-4 w-4" />
                Export Activity
              </Button>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-8">
                {applicant.applications.map((app, index) => (
                  <div key={app.id} className="relative pl-8">
                    <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-white bg-primary" />
                    {index < applicant.applications.length - 1 && (
                      <div className="absolute left-[6px] top-6 h-full w-px bg-border" />
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Application Submitted</h3>
                          <p className="text-sm text-muted-foreground">
                            Applied for {app.program.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{formatDate(app.createdAt)}</div>
                          <div className="text-xs text-muted-foreground">
                            {getStatusBadge(app.status as ApplicationStatus)}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-muted-foreground">Application ID</div>
                            <div className="font-mono">{app.id.substring(0, 12)}...</div>
                          </div>
                          <div>
                            <div className="font-medium text-muted-foreground">Start Semester</div>
                            <div>{app.startSemester}</div>
                          </div>
                          <div>
                            <div className="font-medium text-muted-foreground">Current Status</div>
                            <div>{app.status.replace('_', ' ')}</div>
                          </div>
                          <div>
                            <div className="font-medium text-muted-foreground">Duration</div>
                            <div>
                              {Math.floor((new Date().getTime() - new Date(app.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {applicant.applications.length === 0 && (
                  <div className="text-center py-12">
                    <History className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">No Activity Yet</h3>
                    <p className="text-muted-foreground mt-2">
                      Activity will appear here once the applicant starts interacting with the system.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Application Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>First Application</span>
                    <span className="font-medium">
                      {applicant.applications.length > 0 
                        ? formatDate(applicant.applications[applicant.applications.length - 1].createdAt)
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Latest Application</span>
                    <span className="font-medium">
                      {latestApp ? formatDate(latestApp.createdAt) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Time Between Apps</span>
                    <span className="font-medium">
                      {applicant.applications.length > 1 
                        ? `${Math.floor(applicant.applications.reduce((acc, app, i, arr) => {
                            if (i === 0) return acc;
                            return acc + (new Date(arr[i-1].createdAt).getTime() - new Date(app.createdAt).getTime());
                          }, 0) / (applicant.applications.length - 1) / (1000 * 60 * 60 * 24))} days`
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Status Evolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicant.applications.slice(0, 3).map((app, i) => (
                    <div key={app.id} className="flex items-center justify-between text-sm">
                      <span className="truncate max-w-[120px]">{app.program.name}</span>
                      <span>{app.status.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Total Applications</div>
                    <div className="text-muted-foreground">{applicant.applications.length} submitted</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Programs Applied</div>
                    <div className="text-muted-foreground">
                      {new Set(applicant.applications.map(app => app.program.name)).size} unique programs
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Current Status</div>
                    <div className="text-muted-foreground">
                      {latestApp ? latestApp.status.replace('_', ' ') : 'No applications'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Applicant Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Applicant Settings</CardTitle>
                <CardDescription>
                  Configure applicant preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Account Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Applicant ID</span>
                        <span className="font-mono">{applicant.applicant.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span>{applicant.applicant.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Role</span>
                        <span>{applicant.applicant.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span>{applicant.applicant.status}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Registration Status</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {applicant.registered ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-green-500">Registered Successfully</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <span className="text-amber-500">Not Registered</span>
                          </>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        {applicant.registered ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Cohort Assignment</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Cohort</span>
                        <span>{applicant.cohort ? applicant.cohort.name : 'Not assigned'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Primary Program</span>
                        <span>{applicant.program.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Settings */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Communication Settings</CardTitle>
                <CardDescription>
                  Configure how to communicate with this applicant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send application status updates via email
                      </p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-primary"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send important updates via SMS
                      </p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-muted"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Interview Reminders</h4>
                      <p className="text-sm text-muted-foreground">
                        Send interview schedule reminders
                      </p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-primary"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Decision Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send admission decision notifications
                      </p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-primary"></div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Preferred Contact Method</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      SMS
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-0 shadow-sm border-destructive/20 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for this applicant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Reset Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Send password reset instructions to applicant's email
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Key className="mr-2 h-3 w-3" />
                      Reset Password
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Deactivate Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Temporarily deactivate this applicant's account
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <UserX className="mr-2 h-3 w-3" />
                      Deactivate
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Delete All Applications</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete all applications from this applicant
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete Applications
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-destructive/30 p-4">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Applicant</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete this applicant and all associated data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm" disabled>
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete Applicant
                    </Button>
                  </div>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Warning</AlertTitle>
                  <AlertDescription className="text-amber-700 text-sm">
                    These actions are irreversible. Please proceed with caution.
                    Deleting an applicant will remove all associated applications and data.
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

// Add missing icon component
const Upload = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FilePlus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);