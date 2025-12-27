'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  GraduationCap,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  BarChart3,
  Download,
  MoreVertical,
  ExternalLink,
  UserCheck,
  UserCog,
  UserX,
  BookOpen,
  AlertCircle,
  Timer,
  CheckCircle2,
  Ban,
  ListChecks,
  CalendarDays,
  MailPlus,
  FileText,
  UserPlus,
  Globe
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

interface ApplicantsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: ApplicantData[];
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

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<ApplicantData[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<ApplicantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [registrationFilter, setRegistrationFilter] = useState<string>('all');
  const [cohortFilter, setCohortFilter] = useState<string>('all');
  const [viewingApplicant, setViewingApplicant] = useState<ApplicantData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplicants, setTotalApplicants] = useState(0);

  // Fetch applicants with pagination
  useEffect(() => {
    fetchApplicants();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    filterApplicants();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, registrationFilter, cohortFilter, applicants]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await fetch( `http://localhost:3001/api/admissions/applicants?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'accept': '*/*'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApplicantsResponse = await response.json();
      setApplicants(data.data);
      setFilteredApplicants(data.data);
      setTotalApplicants(data.meta.total);
      setTotalPages(Math.ceil(data.meta.total / data.meta.limit));
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplicants = () => {
    let filtered = applicants;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (applicant) =>
          applicant.applicant.firstName.toLowerCase().includes(term) ||
          applicant.applicant.lastName.toLowerCase().includes(term) ||
          applicant.applicant.email.toLowerCase().includes(term) ||
          applicant.program.name.toLowerCase().includes(term)
      );
    }

    // Apply status filter (filter by any application status)
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (applicant) => applicant.applications.some(app => app.status === statusFilter)
      );
    }

    // Apply registration filter
    if (registrationFilter !== 'all') {
      const isRegistered = registrationFilter === 'registered';
      filtered = filtered.filter(
        (applicant) => applicant.registered === isRegistered
      );
    }

    // Apply cohort filter
    if (cohortFilter !== 'all') {
      const hasCohort = cohortFilter === 'has-cohort';
      filtered = filtered.filter(
        (applicant) => (applicant.cohort !== null) === hasCohort
      );
    }

    setFilteredApplicants(filtered);
  };

  const getUniqueCohorts = () => {
    const cohorts = new Set<string>();
    applicants.forEach(applicant => {
      if (applicant.cohort) {
        cohorts.add(applicant.cohort.name);
      }
    });
    return Array.from(cohorts);
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

  const getLatestApplication = (applicant: ApplicantData) => {
    return applicant.applications.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
    });
  };

  const getApplicationStats = (applicant: ApplicantData) => {
    const stats = {
      total: applicant.applications.length,
      admitted: applicant.applications.filter(app => app.status === 'ADMITTED').length,
      rejected: applicant.applications.filter(app => app.status === 'REJECTED').length,
      pending: applicant.applications.filter(app => 
        ['SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW_SCHEDULED'].includes(app.status)
      ).length,
    };
    return stats;
  };

  const handleViewApplicant = (applicant: ApplicantData) => {
    setViewingApplicant(applicant);
    setIsViewDialogOpen(true);
  };

  const handleExportApplicants = () => {
    // Implement export functionality
    console.log('Exporting applicants...');
  };

  const handleSendEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  // Calculate statistics
  const calculateStatistics = () => {
    const stats = {
      total: applicants.length,
      registered: applicants.filter(app => app.registered).length,
      withCohort: applicants.filter(app => app.cohort !== null).length,
      admitted: applicants.reduce((sum, app) => 
        sum + app.applications.filter(a => a.status === 'ADMITTED').length, 0
      ),
      active: applicants.filter(app => app.applicant.status === 'ACTIVE').length,
      avgApplications: applicants.length > 0 
        ? (applicants.reduce((sum, app) => sum + app.applications.length, 0) / applicants.length).toFixed(1)
        : '0.0'
    };
    return stats;
  };

  const statistics = calculateStatistics();

  const statCards = [
    {
      title: 'Total Applicants',
      value: statistics.total,
      icon: Users,
      description: 'All applicants',
      color: 'bg-blue-500',
      change: '+8%',
    },
    {
      title: 'Registered',
      value: statistics.registered,
      icon: UserCheck,
      description: 'Completed registration',
      color: 'bg-green-500',
      change: '+12%',
    },
    {
      title: 'With Cohort',
      value: statistics.withCohort,
      icon: UserCog,
      description: 'Assigned to cohorts',
      color: 'bg-purple-500',
      change: '+15%',
    },
    {
      title: 'Avg Applications',
      value: statistics.avgApplications,
      icon: TrendingUp,
      description: 'Per applicant',
      color: 'bg-amber-500',
      change: '+0.3',
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

  if (loading && applicants.length === 0) {
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
            <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
            <p className="text-muted-foreground">
              Manage and track all student applicants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportApplicants} className="border-border/50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Applicant
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
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

      {/* Filters and Search */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Applicant Management</CardTitle>
          <CardDescription>
            Search, filter, and manage student applicants
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
                    <SelectValue placeholder="App Status" />
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
              <Select value={registrationFilter} onValueChange={setRegistrationFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Registration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                  <SelectItem value="not-registered">Not Registered</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cohortFilter} onValueChange={setCohortFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Cohort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="has-cohort">Has Cohort</SelectItem>
                  <SelectItem value="no-cohort">No Cohort</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Applicants List</h2>
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalApplicants)} of {totalApplicants} applicants
              {filteredApplicants.length !== applicants.length && ` (${filteredApplicants.length} filtered)`}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {statistics.registered} registered • {statistics.admitted} admitted
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/50 shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[220px]">Applicant</TableHead>
                <TableHead className="w-[150px]">Program</TableHead>
                <TableHead className="w-[140px]">Applications</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[120px]">Cohort</TableHead>
                <TableHead className="w-[120px]">Latest Application</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map((applicant) => {
                const latestApp = getLatestApplication(applicant);
                const appStats = getApplicationStats(applicant);
                return (
                  <TableRow key={applicant.applicant.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {applicant.applicant.firstName} {applicant.applicant.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {applicant.applicant.email}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs">
                          {getApplicantStatusBadge(applicant.applicant.status, applicant.registered)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium line-clamp-1">{applicant.program.name}</span>
                        </div>
                        {applicant.applications.length > 1 && (
                          <div className="text-xs text-muted-foreground">
                            Applied to {applicant.applications.length} programs
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{appStats.total}</span>
                          <span className="text-xs text-muted-foreground">total</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {appStats.admitted > 0 && (
                            <Badge className="bg-green-500 text-xs">{appStats.admitted} admitted</Badge>
                          )}
                          {appStats.pending > 0 && (
                            <Badge className="bg-amber-500 text-xs">{appStats.pending} pending</Badge>
                          )}
                          {appStats.rejected > 0 && (
                            <Badge className="bg-red-500 text-xs">{appStats.rejected} rejected</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {latestApp && getStatusBadge(latestApp.status as ApplicationStatus)}
                        {applicant.applications.length > 1 && (
                          <div className="text-xs text-muted-foreground">
                            +{applicant.applications.length - 1} other{applicant.applications.length > 2 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {applicant.cohort ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{applicant.cohort.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Assigned to cohort
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <AlertCircle className="h-3 w-3" />
                          <span className="text-sm">No cohort</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {formatDate(latestApp.createdAt)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {latestApp.startSemester} • {latestApp.program.name.substring(0, 20)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`/dashboard/applicants/${applicant.applicant.id}`}
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View applicant details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewApplicant(applicant)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendEmail(applicant.applicant.email)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Applications
                            </DropdownMenuItem>
                            {applicant.cohort && (
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                View Cohort
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Interview
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredApplicants.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No applicants found</h3>
              <p className="text-muted-foreground mt-2">
                {applicants.length === 0 
                  ? 'No applicants have submitted applications yet.' 
                  : 'Try adjusting your search or filter to find what you\'re looking for.'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalApplicants > 0 && (
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
              Application Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {APPLICATION_STATUSES.map((status) => {
                const count = applicants.reduce((sum, app) => 
                  sum + app.applications.filter(a => a.status === status).length, 0
                );
                const totalApplications = applicants.reduce((sum, app) => sum + app.applications.length, 0);
                const percentage = totalApplications > 0 ? (count / totalApplications) * 100 : 0;
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
              <BookOpen className="h-4 w-4" />
              Top Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                applicants.reduce((acc, app) => {
                  const program = app.program.name;
                  acc[program] = (acc[program] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([program, count]) => {
                  const percentage = (count / applicants.length) * 100;
                  return (
                    <div key={program} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-3 w-3 text-muted-foreground" />
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
              <UserCog className="h-4 w-4" />
              Applicant Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Registered', value: statistics.registered, color: 'bg-green-100 text-green-800' },
                { label: 'Not Registered', value: statistics.total - statistics.registered, color: 'bg-amber-100 text-amber-800' },
                { label: 'With Cohort', value: statistics.withCohort, color: 'bg-purple-100 text-purple-800' },
                { label: 'No Cohort', value: statistics.total - statistics.withCohort, color: 'bg-gray-100 text-gray-800' },
                { label: 'Active Status', value: statistics.active, color: 'bg-blue-100 text-blue-800' },
              ].map((item) => {
                const percentage = (item.value / statistics.total) * 100;
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={item.color}>{item.value}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color.split(' ')[0]}`}
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
                  <MailPlus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Bulk Email</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Send emails to applicants
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
                  <h3 className="font-semibold">Admissions Review</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Review pending applications
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
                  <h3 className="font-semibold">Assign Cohorts</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Assign applicants to cohorts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <CalendarDays className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Schedule Interviews</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage interview schedules
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applicant View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {viewingApplicant && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Applicant Details
                </DialogTitle>
                <DialogDescription>
                  Applicant ID: {viewingApplicant.applicant.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          {viewingApplicant.applicant.firstName} {viewingApplicant.applicant.lastName}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          {getApplicantStatusBadge(viewingApplicant.applicant.status, viewingApplicant.registered)}
                          {viewingApplicant.cohort && (
                            <Badge className="bg-purple-500">
                              <Users className="mr-1 h-3 w-3" />
                              {viewingApplicant.cohort.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Primary Program</div>
                    <div className="font-semibold">{viewingApplicant.program.name}</div>
                    <div className="text-sm">{viewingApplicant.applicant.role}</div>
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
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">Email</div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {viewingApplicant.applicant.email}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Status</div>
                          <div>{viewingApplicant.applicant.status}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Role</div>
                          <div>{viewingApplicant.applicant.role}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Registration</div>
                          <div>
                            {viewingApplicant.registered ? (
                              <Badge className="bg-green-500">Registered</Badge>
                            ) : (
                              <Badge className="bg-amber-500">Not Registered</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Program Information */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Program Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium text-muted-foreground">Primary Program</div>
                          <div className="font-semibold">{viewingApplicant.program.name}</div>
                        </div>
                        {viewingApplicant.cohort && (
                          <div>
                            <div className="font-medium text-muted-foreground">Assigned Cohort</div>
                            <div className="font-semibold">{viewingApplicant.cohort.name}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Applications Summary */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Applications Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-center py-2">
                          <div className="text-3xl font-bold">{viewingApplicant.applications.length}</div>
                          <div className="text-sm text-muted-foreground">Total Applications</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {['ADMITTED', 'PENDING', 'REJECTED'].map((type) => {
                            let count = 0;
                            let color = '';
                            switch (type) {
                              case 'ADMITTED':
                                count = viewingApplicant.applications.filter(app => app.status === 'ADMITTED').length;
                                color = 'bg-green-100 text-green-800';
                                break;
                              case 'PENDING':
                                count = viewingApplicant.applications.filter(app => 
                                  ['SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW_SCHEDULED'].includes(app.status)
                                ).length;
                                color = 'bg-amber-100 text-amber-800';
                                break;
                              case 'REJECTED':
                                count = viewingApplicant.applications.filter(app => 
                                  ['REJECTED', 'WITHDRAWN'].includes(app.status)
                                ).length;
                                color = 'bg-red-100 text-red-800';
                                break;
                            }
                            return (
                              <div key={type} className="text-center">
                                <div className={`text-lg font-semibold ${color.split(' ')[1]}`}>{count}</div>
                                <div className="text-xs text-muted-foreground">{type}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Latest Application */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Latest Application
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const latest = getLatestApplication(viewingApplicant);
                        return (
                          <div className="space-y-2">
                            <div>
                              <div className="font-medium text-muted-foreground">Program</div>
                              <div>{latest.program.name}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="font-medium text-muted-foreground">Status</div>
                                <div>{getStatusBadge(latest.status as ApplicationStatus)}</div>
                              </div>
                              <div>
                                <div className="font-medium text-muted-foreground">Start Semester</div>
                                <div>{latest.startSemester}</div>
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-muted-foreground">Applied On</div>
                              <div>{formatDate(latest.createdAt)}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>

                  {/* All Applications */}
                  <Card className="border-0 shadow-sm col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4" />
                        All Applications ({viewingApplicant.applications.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {viewingApplicant.applications.map((application) => (
                          <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{application.program.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Applied {formatDate(application.createdAt)} • Start {application.startSemester}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(application.status as ApplicationStatus)}
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button variant="outline" onClick={() => handleSendEmail(viewingApplicant.applicant.email)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Manage Applicant
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