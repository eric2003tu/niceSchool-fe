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
  BookOpen,
  Building2,
  GraduationCap,
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Award,
  Calendar,
  FileText,
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

interface Program {
  id: string;
  code: string;
  name: string;
  level: string;
  status: string;
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
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  department: Department;
  programs: Program[];
  instructors: Instructor[];
}

interface CoursesResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Course[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, typeFilter, departmentFilter, courses]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/academics/all-courses');
      const data: CoursesResponse = await response.json();
      setCourses(data.data);
      setFilteredCourses(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.code.toLowerCase().includes(term) ||
          course.title.toLowerCase().includes(term) ||
          course.department.name.toLowerCase().includes(term) ||
          course.department.code.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (course) => course.status === statusFilter
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(
        (course) => course.type === typeFilter
      );
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(
        (course) => course.department.id === departmentFilter
      );
    }

    setFilteredCourses(filtered);
  };

  // Get unique departments for filter
  const uniqueDepartments = Array.from(
    new Map(courses.map(course => [course.department.id, course.department])).values()
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Calculate statistics
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'ACTIVE' && !c.archivedAt).length;
  const archivedCourses = courses.filter(c => c.archivedAt).length;
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const lectureCourses = courses.filter(c => c.type === 'LECTURE').length;

  const statCards = [
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      description: 'All academic courses',
      color: 'bg-blue-500',
    },
    {
      title: 'Active Courses',
      value: activeCourses,
      icon: BookOpen,
      description: 'Currently active courses',
      color: 'bg-green-500',
    },
    {
      title: 'Total Credits',
      value: totalCredits,
      icon: Award,
      description: 'Sum of all course credits',
      color: 'bg-purple-500',
    },
    {
      title: 'Lecture Courses',
      value: lectureCourses,
      icon: FileText,
      description: 'Lecture-based courses',
      color: 'bg-orange-500',
    },
  ];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusBadge = (status: string, archivedAt: string | null) => {
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

  const getTypeBadge = (type: string) => {
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
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          View and manage all academic courses across all departments and programs
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
          <CardTitle>Course Management</CardTitle>
          <CardDescription>
            Search and filter through all academic courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses by code, title, or department..."
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
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="LECTURE">Lecture</SelectItem>
                  <SelectItem value="LAB">Lab</SelectItem>
                  <SelectItem value="SEMINAR">Seminar</SelectItem>
                  <SelectItem value="WORKSHOP">Workshop</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table - Minimal border */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Courses List</h2>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} courses
              {filteredCourses.length !== courses.length && ` (filtered from ${courses.length} total)`}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {uniqueDepartments.length} departments • {courses.length} courses
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/50 shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px]">Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead className="w-[140px]">Department</TableHead>
                <TableHead className="w-[100px]">Credits</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[120px]">Programs</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="font-semibold">{course.code}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{course.title}</div>
                      {course.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {course.description}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {course.level && (
                          <>
                            <GraduationCap className="h-3 w-3" />
                            <span>{course.level}</span>
                          </>
                        )}
                        {course.semester && (
                          <>
                            <span>•</span>
                            <Calendar className="h-3 w-3" />
                            <span>Semester {course.semester}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">
                        {course.department.name}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {course.department.code}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{course.credits}</span>
                      <span className="text-xs text-muted-foreground">
                        credits
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(course.type)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(course.status, course.archivedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{course.programs.length}</span>
                        <span className="text-xs text-muted-foreground">
                          programs
                        </span>
                      </div>
                      {course.programs.length > 0 && (
                        <div className="text-xs text-muted-foreground truncate">
                          {course.programs[0].code}
                          {course.programs.length > 1 && ` +${course.programs.length - 1}`}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/courses/${course.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredCourses.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No courses found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination - Minimal border */}
        {filteredCourses.length > 0 && (
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
              <Building2 className="h-4 w-4" />
              Top Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                courses.reduce((acc, course) => {
                  const dept = course.department.name;
                  acc[dept] = (acc[dept] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([dept, count]) => (
                  <div key={dept} className="flex items-center justify-between">
                    <span className="text-sm">{dept}</span>
                    <Badge variant="secondary">{count} courses</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4" />
              Credit Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                courses.reduce((acc, course) => {
                  const credits = course.credits;
                  acc[credits] = (acc[credits] || 0) + 1;
                  return acc;
                }, {} as Record<number, number>)
              )
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([credits, count]) => (
                  <div key={credits} className="flex items-center justify-between">
                    <span className="text-sm">{credits} credit courses</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Course Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                courses.reduce((acc, course) => {
                  const type = course.type;
                  acc[type] = (acc[type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([, a], [, b]) => b - a)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeBadge(type)}
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recently Added Courses</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 6)
            .map((course) => (
              <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{course.code}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-1">
                        {course.title}
                      </CardDescription>
                    </div>
                    {getTypeBadge(course.type)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span>{course.department.code}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{course.credits}</span>
                      <span className="text-xs text-muted-foreground">credits</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-3 w-3 text-muted-foreground" />
                      <span>{course.programs.length} programs</span>
                    </div>
                    {getStatusBadge(course.status, course.archivedAt)}
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Added</span>
                      <span>{formatDate(course.createdAt)}</span>
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