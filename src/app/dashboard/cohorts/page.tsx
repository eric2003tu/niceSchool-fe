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
  Calendar,
  Building2,
  GraduationCap,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  BookOpen,
  Clock,
  TrendingUp,
  ExternalLink,
  Bookmark,
  School,
  UserCircle,
  CalendarDays
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

interface Student {
  id: string;
  studentNumber: string;
  academicStatus: string;
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

interface CohortsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Cohort[];
}

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [filteredCohorts, setFilteredCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch cohorts
  useEffect(() => {
    fetchCohorts();
  }, []);

  useEffect(() => {
    filterCohorts();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, semesterFilter, yearFilter, programFilter, cohorts]);

  const fetchCohorts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/academics/all-cohorts');
      const data: CohortsResponse = await response.json();
      setCohorts(data.data);
      setFilteredCohorts(data.data);
    } catch (error) {
      console.error('Error fetching cohorts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCohorts = () => {
    let filtered = cohorts;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (cohort) =>
          cohort.name.toLowerCase().includes(term) ||
          cohort.code.toLowerCase().includes(term) ||
          cohort.program.name.toLowerCase().includes(term) ||
          cohort.program.code.toLowerCase().includes(term)
      );
    }

    // Apply semester filter
    if (semesterFilter !== 'all') {
      filtered = filtered.filter(
        (cohort) => cohort.intakeSemester === semesterFilter
      );
    }

    // Apply year filter
    if (yearFilter !== 'all') {
      filtered = filtered.filter(
        (cohort) => cohort.intakeYear.toString() === yearFilter
      );
    }

    // Apply program filter
    if (programFilter !== 'all') {
      filtered = filtered.filter(
        (cohort) => cohort.program.id === programFilter
      );
    }

    setFilteredCohorts(filtered);
  };

  // Get unique programs for filter
  const uniquePrograms = Array.from(
    new Map(cohorts.map(cohort => [cohort.program.id, cohort.program])).values()
  );

  // Get unique years for filter
  const uniqueYears = Array.from(
    new Set(cohorts.map(cohort => cohort.intakeYear))
  ).sort((a, b) => b - a);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCohorts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCohorts = filteredCohorts.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Calculate statistics
  const totalCohorts = cohorts.length;
  const totalStudents = cohorts.reduce((sum, cohort) => sum + cohort.students.length, 0);
  const activeStudents = cohorts.reduce((sum, cohort) => 
    sum + cohort.students.filter(s => s.academicStatus === 'ACTIVE').length, 0
  );
  
  // Calculate average cohort size
  const avgCohortSize = totalCohorts > 0 ? (totalStudents / totalCohorts).toFixed(1) : '0';

  const statCards = [
    {
      title: 'Total Cohorts',
      value: totalCohorts,
      icon: Users,
      description: 'All student cohorts',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: User,
      description: 'Across all cohorts',
      color: 'bg-green-500',
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: TrendingUp,
      description: 'Currently enrolled',
      color: 'bg-purple-500',
    },
    {
      title: 'Avg Cohort Size',
      value: avgCohortSize,
      icon: Users,
      description: 'Average students per cohort',
      color: 'bg-orange-500',
    },
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getSemesterBadge = (semester: string) => {
    switch (semester) {
      case 'FALL':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Fall</Badge>;
      case 'SPRING':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Spring</Badge>;
      case 'SUMMER':
        return <Badge className="bg-sky-100 text-sky-800 border-sky-200">Summer</Badge>;
      case 'WINTER':
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200">Winter</Badge>;
      default:
        return <Badge variant="outline">{semester}</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'UNDERGRADUATE':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Undergrad</Badge>;
      case 'POSTGRADUATE':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Postgrad</Badge>;
      case 'DOCTORATE':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Doctorate</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
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

  // Calculate completion percentage
  const calculateCompletionPercentage = (cohort: Cohort) => {
    if (!cohort.endDate || !cohort.startDate) return 0;
    const start = new Date(cohort.startDate).getTime();
    const end = new Date(cohort.endDate).getTime();
    const now = new Date().getTime();
    
    if (now >= end) return 100;
    if (now <= start) return 0;
    
    const totalDuration = end - start;
    const elapsedDuration = now - start;
    return Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
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
        <h1 className="text-3xl font-bold tracking-tight">Cohorts</h1>
        <p className="text-muted-foreground">
          View and manage all student cohorts across all academic programs
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
          <CardTitle>Cohort Management</CardTitle>
          <CardDescription>
            Search and filter through all student cohorts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cohorts by name, code, or program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[320px]"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="FALL">Fall</SelectItem>
                    <SelectItem value="SPRING">Spring</SelectItem>
                    <SelectItem value="SUMMER">Summer</SelectItem>
                    <SelectItem value="WINTER">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {uniquePrograms.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cohorts Table - Minimal border */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Cohorts List</h2>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCohorts.length)} of {filteredCohorts.length} cohorts
              {filteredCohorts.length !== cohorts.length && ` (filtered from ${cohorts.length} total)`}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {uniquePrograms.length} programs • {cohorts.length} cohorts
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/50 shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[140px]">Cohort Code</TableHead>
                <TableHead>Program</TableHead>
                <TableHead className="w-[120px]">Intake</TableHead>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead className="w-[120px]">Students</TableHead>
                <TableHead className="w-[140px]">Duration</TableHead>
                <TableHead className="w-[120px]">Completion</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCohorts.map((cohort) => {
                const completionPercentage = calculateCompletionPercentage(cohort);
                return (
                  <TableRow key={cohort.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="space-y-1">
                        <div className="font-semibold">{cohort.code}</div>
                        <div className="text-xs text-muted-foreground">{cohort.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{cohort.program.code}</span>
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {cohort.program.name}
                        </div>
                        {cohort.program.careerPaths && cohort.program.careerPaths.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {cohort.program.careerPaths.slice(0, 2).map((path, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-muted rounded">
                                {path}
                              </span>
                            ))}
                            {cohort.program.careerPaths.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{cohort.program.careerPaths.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{cohort.intakeYear}</span>
                        </div>
                        {getSemesterBadge(cohort.intakeSemester)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getLevelBadge(cohort.program.level)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{cohort.students.length}</span>
                          <span className="text-xs text-muted-foreground">
                            students
                          </span>
                        </div>
                        {cohort.students.length > 0 && (
                          <div className="text-xs text-muted-foreground">
                            {cohort.students.filter(s => s.academicStatus === 'ACTIVE').length} active
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {formatDate(cohort.startDate)} → {formatDate(cohort.endDate)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(cohort.endDate).getFullYear() - new Date(cohort.startDate).getFullYear()} years
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{completionPercentage}%</span>
                          <Clock className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${completionPercentage >= 100 ? 'bg-green-500' : completionPercentage >= 75 ? 'bg-blue-500' : completionPercentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${completionPercentage}%` }}
                          />
                        </div>
                        {cohort.graduationDate && (
                          <div className="text-xs text-muted-foreground">
                            Graduation: {formatDate(cohort.graduationDate)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/cohorts/${cohort.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/cohorts/${cohort.id}/students`}>
                            <User className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredCohorts.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No cohorts found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination - Minimal border */}
        {filteredCohorts.length > 0 && (
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
              <School className="h-4 w-4" />
              Top Programs by Cohorts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                cohorts.reduce((acc, cohort) => {
                  const program = cohort.program.name;
                  acc[program] = (acc[program] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([program, count]) => (
                  <div key={program} className="flex items-center justify-between">
                    <span className="text-sm truncate">{program}</span>
                    <Badge variant="secondary">{count} cohorts</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Cohort Distribution by Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                cohorts.reduce((acc, cohort) => {
                  const year = cohort.intakeYear;
                  acc[year] = (acc[year] || 0) + 1;
                  return acc;
                }, {} as Record<number, number>)
              )
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([year, count]) => (
                  <div key={year} className="flex items-center justify-between">
                    <span className="text-sm">Intake {year}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{count}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {((count / cohorts.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Academic Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                cohorts.reduce((acc, cohort) => {
                  const level = cohort.program.level;
                  acc[level] = (acc[level] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .map(([level, count]) => (
                  <div key={level} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getLevelBadge(level)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground">
                        {((count / cohorts.length) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cohorts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recently Created Cohorts</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cohorts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 6)
            .map((cohort) => (
              <Card key={cohort.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{cohort.code}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-1">
                        {cohort.program.name}
                      </CardDescription>
                    </div>
                    {getLevelBadge(cohort.program.level)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>{cohort.intakeYear} {cohort.intakeSemester}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{cohort.students.length}</span>
                      <span className="text-xs text-muted-foreground">students</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-3 w-3 text-muted-foreground" />
                      <span>{cohort.program.code}</span>
                    </div>
                    {getSemesterBadge(cohort.intakeSemester)}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Duration</span>
                      <span>
                        {formatDate(cohort.startDate)} → {formatDate(cohort.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                      <span>Created</span>
                      <span>{formatDate(cohort.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}