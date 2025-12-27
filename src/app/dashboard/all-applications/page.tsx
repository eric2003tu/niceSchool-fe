'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/login/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FileText,
  User,
  Building2,
  GraduationCap,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Award,
  Download,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock4,
  Timer,
  ThumbsUp,
  ThumbsDown,
  ListChecks,
  UserCheck,
  Ban,
  ExternalLink,
  MoreVertical,
  BarChart3,
  TrendingUp,
  Mail,
  Phone,
  Globe,
  BookOpen,
  School,
  FileCheck,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PersonalInfo {
  email: string;
  phone: string;
  address: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  nationality: string;
}

interface AcademicInfo {
  gpa: number;
  institution: string;
  graduationYear: number;
  previousEducation: string;
}

interface Documents {
  idDocument: string;
  transcript: string;
  personalStatement: string;
  recommendationLetter: string;
}

interface Applicant {
  id: string;
  email: string;
  emailVerified: boolean;
  phone: string | null;
  phoneVerified: boolean;
  role: string;
  status: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

interface Program {
  id: string;
  code: string;
  name: string;
  level: string;
  status: string;
  departmentId: string;
  careerPaths: string[];
}

interface Application {
  id: string;
  applicantId: string;
  applicationType: string;
  programId: string;
  intendedMajor: string | null;
  intendedMinor: string | null;
  startSemester: string;
  status: string;
  submittedAt: string | null;
  reviewedAt: string | null;
  decisionDate: string | null;
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  testScores: any | null;
  workExperience: any | null;
  extracurriculars: any | null;
  essays: any | null;
  recommendations: any | null;
  documents: Documents;
  reviewerId: string | null;
  reviewNotes: string | null;
  decisionReason: string | null;
  scholarshipOffer: string;
  createdStudentId: string | null;
  createdAt: string;
  updatedAt: string;
  applicant: Applicant;
  program: Program;
}

interface ApplicationsResponse {
  data: Application[];
  total: number;
  page: number;
  limit: number;
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

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [viewingApplication, setViewingApplication] = useState<Application | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  // Fetch applications with pagination
  useEffect(() => {
    fetchApplications();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    filterApplications();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, programFilter, departmentFilter, applications]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(programFilter !== 'all' && { program: programFilter }),
        ...(departmentFilter !== 'all' && { department: departmentFilter }),
      });

      const response = await fetch(`https://niceschool-be-1.onrender.com/api/admissions/applications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'accept': '*/*'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApplicationsResponse = await response.json();
      setApplications(data.data);
      setFilteredApplications(data.data);
      setTotalApplications(data.total);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.personalInfo.firstName.toLowerCase().includes(term) ||
          app.personalInfo.lastName.toLowerCase().includes(term) ||
          app.personalInfo.email.toLowerCase().includes(term) ||
          app.program.name.toLowerCase().includes(term) ||
          app.program.code.toLowerCase().includes(term)
      );
    }

    setFilteredApplications(filtered);
  };

  // Get unique programs for filter
  const uniquePrograms = Array.from(
    new Map(applications.map(app => [app.program.id, app.program])).values()
  );

  // Get unique departments (based on program departmentId)
  const uniqueDepartments = Array.from(
    new Set(applications.map(app => app.program.departmentId))
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="outline" className="border-gray-300 text-gray-700"><FileText className="mr-1 h-3 w-3" /> Draft</Badge>;
      case 'SUBMITTED':
        return <Badge className="bg-blue-500"><Clock className="mr-1 h-3 w-3" /> Submitted</Badge>;
      case 'UNDER_REVIEW':
        return <Badge className="bg-amber-500"><Loader2 className="mr-1 h-3 w-3" /> Under Review</Badge>;
      case 'INTERVIEW_SCHEDULED':
        return <Badge className="bg-purple-500"><Calendar className="mr-1 h-3 w-3" /> Interview</Badge>;
      case 'ADMITTED':
        return <Badge className="bg-green-500"><CheckCircle2 className="mr-1 h-3 w-3" /> Admitted</Badge>;
      case 'CONDITIONALLY_ADMITTED':
        return <Badge className="bg-emerald-500"><CheckCircle className="mr-1 h-3 w-3" /> Conditional</Badge>;
      case 'WAITLISTED':
        return <Badge className="bg-orange-500"><Clock4 className="mr-1 h-3 w-3" /> Waitlisted</Badge>;
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

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'UNDERGRADUATE':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Undergrad</Badge>;
      case 'POSTGRADUATE':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">Postgrad</Badge>;
      case 'DOCTORATE':
        return <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">Doctorate</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{level}</Badge>;
    }
  };

  const getGPAStatus = (gpa: number) => {
    if (gpa >= 3.5) return { color: 'text-green-600', badge: <Badge className="bg-green-500 text-xs">Excellent</Badge> };
    if (gpa >= 3.0) return { color: 'text-amber-600', badge: <Badge className="bg-amber-500 text-xs">Good</Badge> };
    if (gpa >= 2.5) return { color: 'text-yellow-600', badge: <Badge className="bg-yellow-500 text-xs">Average</Badge> };
    return { color: 'text-red-600', badge: <Badge className="bg-red-500 text-xs">Below Avg</Badge> };
  };

  const handleViewApplication = (application: Application) => {
    setViewingApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      // Here you would make an API call to update the application status
      console.log(`Update application ${applicationId} to ${newStatus}`);
      
      // Refresh applications after status change
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleExportApplications = () => {
    // Implement export functionality
    console.log('Exporting applications...');
  };

  // Calculate statistics
  const calculateStatistics = () => {
    const stats = {
      total: applications.length,
      submitted: applications.filter(app => app.status === 'SUBMITTED').length,
      underReview: applications.filter(app => app.status === 'UNDER_REVIEW').length,
      admitted: applications.filter(app => app.status === 'ADMITTED').length,
      rejected: applications.filter(app => app.status === 'REJECTED').length,
      averageGPA: applications.length > 0 
        ? (applications.reduce((sum, app) => sum + app.academicInfo.gpa, 0) / applications.length).toFixed(2)
        : '0.00'
    };
    return stats;
  };

  const statistics = calculateStatistics();

  const statCards = [
    {
      title: 'Total Applications',
      value: statistics.total,
      icon: FileText,
      description: 'All applications',
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Under Review',
      value: statistics.underReview,
      icon: Loader2,
      description: 'Needs attention',
      color: 'bg-amber-500',
      change: '+5%',
    },
    {
      title: 'Admitted',
      value: statistics.admitted,
      icon: CheckCircle2,
      description: 'Accepted applicants',
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Avg GPA',
      value: statistics.averageGPA,
      icon: Award,
      description: 'Average score',
      color: 'bg-purple-500',
      change: '+0.2',
    },
  ];

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  if (loading && applications.length === 0) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-muted-foreground">
              Review and manage all student applications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportApplications} className="border-border/50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards - No border */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <span className="text-xs text-green-600 font-medium flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search - Minimal border */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Application Management</CardTitle>
          <CardDescription>
            Search, filter, and review student applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[320px]"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {APPLICATION_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(status)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {uniquePrograms.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.code} - {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map((deptId, index) => (
                    <SelectItem key={deptId} value={deptId}>
                      Department {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Applications List</h2>
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalApplications)} of {totalApplications} applications
              {filteredApplications.length !== applications.length && ` (${filteredApplications.length} filtered)`}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {uniquePrograms.length} programs • {statistics.submitted} submitted
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/50 shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[200px]">Applicant</TableHead>
                <TableHead className="w-[180px]">Program</TableHead>
                <TableHead className="w-[100px]">GPA</TableHead>
                <TableHead className="w-[120px]">Start Semester</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead className="w-[140px]">Submitted</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => {
                const gpaStatus = getGPAStatus(application.academicInfo.gpa);
                return (
                  <TableRow key={application.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {application.personalInfo.firstName} {application.personalInfo.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {application.personalInfo.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            <span>{application.personalInfo.nationality}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{application.personalInfo.phone}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <School className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{application.program.code}</span>
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {application.program.name}
                        </div>
                        <div className="flex items-center gap-1">
                          {getLevelBadge(application.program.level)}
                          {application.program.careerPaths.length > 0 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="text-xs">
                                    {application.program.careerPaths.length} paths
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Career paths: {application.program.careerPaths.join(', ')}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`font-medium ${gpaStatus.color}`}>
                          {application.academicInfo.gpa.toFixed(2)}
                        </div>
                        <div>{gpaStatus.badge}</div>
                        <div className="text-xs text-muted-foreground">
                          {application.academicInfo.institution}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{application.startSemester}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {application.academicInfo.previousEducation}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        {getStatusBadge(application.status as ApplicationStatus)}
                        {application.reviewedAt && (
                          <div className="text-xs text-muted-foreground">
                            Reviewed {formatDate(application.reviewedAt)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>{application.submittedAt ? formatDate(application.submittedAt) : 'Not submitted'}</div>
                        <div className="text-xs text-muted-foreground">
                          Created {formatDate(application.createdAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`/dashboard/all-applications/${application.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View application details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredApplications.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No applications found</h3>
              <p className="text-muted-foreground mt-2">
                {applications.length === 0 
                  ? 'No applications have been submitted yet.' 
                  : 'Try adjusting your search or filter to find what you\'re looking for.'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalApplications > 0 && (
          <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Rows per page
              </p>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className="h-8 w-8 p-0"
                        onClick={() => goToPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Information Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {APPLICATION_STATUSES.map((status) => {
                const count = applications.filter(app => app.status === status).length;
                const percentage = applications.length > 0 ? (count / applications.length) * 100 : 0;
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(status).split(' ')[0]}`} />
                        <span>{status.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{count}</span>
                        <span className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStatusColor(status).split(' ')[0]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <School className="h-4 w-4" />
              Top Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                applications.reduce((acc, app) => {
                  const program = app.program.name;
                  acc[program] = (acc[program] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([program, count]) => {
                  const percentage = (count / applications.length) * 100;
                  return (
                    <div key={program} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[150px]">{program}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{count}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4" />
              GPA Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Excellent (3.5+)', 'Good (3.0-3.49)', 'Average (2.5-2.99)', 'Below Avg (<2.5)'].map((range, index) => {
                let count = 0;
                switch (index) {
                  case 0: count = applications.filter(app => app.academicInfo.gpa >= 3.5).length; break;
                  case 1: count = applications.filter(app => app.academicInfo.gpa >= 3.0 && app.academicInfo.gpa < 3.5).length; break;
                  case 2: count = applications.filter(app => app.academicInfo.gpa >= 2.5 && app.academicInfo.gpa < 3.0).length; break;
                  case 3: count = applications.filter(app => app.academicInfo.gpa < 2.5).length; break;
                }
                const percentage = applications.length > 0 ? (count / applications.length) * 100 : 0;
                
                const colorClass = index === 0 ? 'bg-green-100 text-green-800' :
                                  index === 1 ? 'bg-amber-100 text-amber-800' :
                                  index === 2 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800';
                
                return (
                  <div key={range} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{range}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={colorClass}>{count}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colorClass.split(' ')[0]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Review Queue</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {statistics.underReview} applications need review
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Admissions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {statistics.admitted} applicants admitted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <ListChecks className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Interviews</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Schedule pending interviews
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Pending</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {statistics.submitted} submitted applications
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {viewingApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Application Details
                </DialogTitle>
                <DialogDescription>
                  Application ID: {viewingApplication.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {viewingApplication.personalInfo.firstName} {viewingApplication.personalInfo.lastName}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(viewingApplication.status as ApplicationStatus)}
                      {getLevelBadge(viewingApplication.program.level)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Applied for</div>
                    <div className="font-semibold">{viewingApplication.program.name}</div>
                    <div className="text-sm">{viewingApplication.program.code}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">Email</div>
                          <div>{viewingApplication.personalInfo.email}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Phone</div>
                          <div>{viewingApplication.personalInfo.phone}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Date of Birth</div>
                          <div>{viewingApplication.personalInfo.dateOfBirth}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Nationality</div>
                          <div>{viewingApplication.personalInfo.nationality}</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">Address</div>
                        <div className="text-sm">{viewingApplication.personalInfo.address}</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Academic Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Academic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">GPA</div>
                          <div className={`font-semibold ${getGPAStatus(viewingApplication.academicInfo.gpa).color}`}>
                            {viewingApplication.academicInfo.gpa.toFixed(2)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Graduation Year</div>
                          <div>{viewingApplication.academicInfo.graduationYear}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Institution</div>
                          <div>{viewingApplication.academicInfo.institution}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Previous Education</div>
                          <div>{viewingApplication.academicInfo.previousEducation}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Program Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <School className="h-4 w-4" />
                        Program Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium text-muted-foreground">Program Name</div>
                          <div className="font-semibold">{viewingApplication.program.name}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Program Code</div>
                          <div>{viewingApplication.program.code}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Start Semester</div>
                          <div>{viewingApplication.startSemester}</div>
                        </div>
                        {viewingApplication.program.careerPaths.length > 0 && (
                          <div>
                            <div className="font-medium text-muted-foreground">Career Paths</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {viewingApplication.program.careerPaths.map((path, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {path}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documents */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Submitted Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(viewingApplication.documents).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <div className="font-medium text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <a 
                            href={value} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Document
                          </a>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Timeline */}
                  <Card className="border-0 shadow-sm col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Application Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-muted-foreground">Created</div>
                            <div>{formatDate(viewingApplication.createdAt)}</div>
                          </div>
                          <div>
                            <div className="font-medium text-muted-foreground">Submitted</div>
                            <div>{viewingApplication.submittedAt ? formatDate(viewingApplication.submittedAt) : 'Not submitted'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-muted-foreground">Reviewed</div>
                            <div>{viewingApplication.reviewedAt ? formatDate(viewingApplication.reviewedAt) : 'Not reviewed'}</div>
                          </div>
                          <div>
                            <div className="font-medium text-muted-foreground">Decision Date</div>
                            <div>{viewingApplication.decisionDate ? formatDate(viewingApplication.decisionDate) : 'Pending'}</div>
                          </div>
                        </div>
                        
                        {viewingApplication.decisionReason && (
                          <div>
                            <div className="font-medium text-muted-foreground">Decision Reason</div>
                            <div className="text-sm">{viewingApplication.decisionReason}</div>
                          </div>
                        )}
                        
                        {viewingApplication.reviewNotes && (
                          <div>
                            <div className="font-medium text-muted-foreground">Review Notes</div>
                            <div className="text-sm">{viewingApplication.reviewNotes}</div>
                          </div>
                        )}
                        
                        {viewingApplication.scholarshipOffer !== "0" && (
                          <div>
                            <div className="font-medium text-muted-foreground">Scholarship Offer</div>
                            <div className="text-green-600 font-semibold">
                              ${parseFloat(viewingApplication.scholarshipOffer).toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={`mailto:${viewingApplication.personalInfo.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Applicant
                    </a>
                  </Button>
                  <Button>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Take Action
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}