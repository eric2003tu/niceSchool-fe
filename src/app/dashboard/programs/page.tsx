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
  GraduationCap,
  Building2,
  BookOpen,
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
  ExternalLink
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

interface Cohort {
  id: string;
  name: string;
  code: string;
  intakeYear: number;
  intakeSemester: string;
  startDate: string;
  endDate: string;
  createdAt: string; // Added to match usage in sorting
}

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  type: string;
  status: string;
}

interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  department: Department;
  cohorts: Cohort[];
  courses: Course[];
}

interface ProgramsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Program[];
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch programs
  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    filterPrograms();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, levelFilter, programs]);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/academics/all-programs');
      const data: ProgramsResponse = await response.json();
      setPrograms(data.data);
      setFilteredPrograms(data.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPrograms = () => {
    let filtered = programs;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (program) =>
          program.code.toLowerCase().includes(term) ||
          program.name.toLowerCase().includes(term) ||
          program.department.name.toLowerCase().includes(term) ||
          program.department.code.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (program) => program.status === statusFilter
      );
    }

    // Apply level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(
        (program) => program.level === levelFilter
      );
    }

    setFilteredPrograms(filtered);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Calculate statistics
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'ACTIVE').length;
  const undergraduatePrograms = programs.filter(p => p.level === 'UNDERGRADUATE').length;
  const postgraduatePrograms = programs.filter(p => p.level === 'POSTGRADUATE').length;
  const totalCohorts = programs.reduce((sum, program) => sum + program.cohorts.length, 0);
  const totalCourses = programs.reduce((sum, program) => sum + program.courses.length, 0);

  const statCards = [
    {
      title: 'Total Programs',
      value: totalPrograms,
      icon: GraduationCap,
      description: 'All academic programs',
      color: 'bg-blue-500',
    },
    {
      title: 'Active Programs',
      value: activePrograms,
      icon: GraduationCap,
      description: 'Currently active programs',
      color: 'bg-green-500',
    },
    {
      title: 'Cohorts',
      value: totalCohorts,
      icon: Users,
      description: 'Total student cohorts',
      color: 'bg-purple-500',
    },
    {
      title: 'Courses',
      value: totalCourses,
      icon: BookOpen,
      description: 'Total associated courses',
      color: 'bg-orange-500',
    },
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'INACTIVE':
        return <Badge variant="destructive">Inactive</Badge>;
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

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  if (loading) {
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
        <h1 className="text-3xl font-bold tracking-tight">Academic Programs</h1>
        <p className="text-muted-foreground">
          View and manage all academic programs across all departments
        </p>
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
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search - Minimal border */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Program Management</CardTitle>
          <CardDescription>
            Search and filter through all academic programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs by code, name, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[320px]"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="UNDERGRADUATE">Undergraduate</SelectItem>
                  <SelectItem value="POSTGRADUATE">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programs Table - Minimal border */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Programs List</h2>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPrograms.length)} of {filteredPrograms.length} programs
              {filteredPrograms.length !== programs.length && ` (filtered from ${programs.length} total)`}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {undergraduatePrograms} Undergraduate • {postgraduatePrograms} Postgraduate
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/50 shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px]">Code</TableHead>
                <TableHead>Program Name</TableHead>
                <TableHead className="w-[160px]">Department</TableHead>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Cohorts</TableHead>
                <TableHead className="w-[120px]">Courses</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPrograms.map((program) => (
                <TableRow key={program.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="font-semibold">{program.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{program.name}</div>
                      {program.careerPaths.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {program.careerPaths.slice(0, 2).map((path, index) => (
                            <span key={index} className="text-xs text-muted-foreground">
                              {path}{index < Math.min(2, program.careerPaths.length) - 1 ? ' •' : ''}
                            </span>
                          ))}
                          {program.careerPaths.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{program.careerPaths.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">
                        {program.department.name}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {program.department.code}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getLevelBadge(program.level)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(program.status)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{program.cohorts.length}</span>
                      </div>
                      {program.cohorts.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Latest: {program.cohorts[0].code}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{program.courses.length}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        courses
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/departments/${program.departmentId}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredPrograms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No programs found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}

        {/* Pagination - Minimal border */}
        {filteredPrograms.length > 0 && (
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
                  {[5, 10, 20, 30].map((pageSize) => (
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
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`dots-${index}`} className="px-2 text-sm">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        className="h-8 w-8 p-0"
                        onClick={() => goToPage(page as number)}
                      >
                        {page}
                      </Button>
                    )
                  ))}
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

      {/* Additional Information Cards - No border */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Cohorts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {programs
                .flatMap(p => p.cohorts)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((cohort) => (
                  <div key={cohort.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <div className="font-medium">{cohort.code}</div>
                      <div className="text-xs text-muted-foreground">{cohort.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSemesterBadge(cohort.intakeSemester)}
                      <span className="text-sm font-medium">{cohort.intakeYear}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Top Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                programs.reduce((acc, program) => {
                  const dept = program.department.name;
                  acc[dept] = (acc[dept] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([dept, count]) => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-sm">{dept}</span>
                    <Badge variant="secondary">{count} programs</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                new Set(programs.flatMap(p => p.careerPaths))
              )
                .slice(0, 10)
                .map((path, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {path}
                  </Badge>
                ))}
              {Array.from(new Set(programs.flatMap(p => p.careerPaths))).length > 10 && (
                <Badge variant="secondary" className="text-xs">
                  +{Array.from(new Set(programs.flatMap(p => p.careerPaths))).length - 10} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}