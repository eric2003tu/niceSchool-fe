'use client';

import { useState, useEffect } from 'react';
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
  Building2,
  BookOpen,
  GraduationCap,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import Link from 'next/link';

interface Program {
  id: string;
  code: string;
  name: string;
  level: 'UNDERGRADUATE' | 'POSTGRADUATE';
  status: string;
  careerPaths: string[];
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
  email: string | null;
  phone: string | null;
  location: string | null;
  headId: string | null;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
  programs: Program[];
  courses: Course[];
  head: any;
}

interface DepartmentsResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Department[];
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Fetch departments
  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    filterDepartments();
  }, [searchTerm, statusFilter, departments]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/academics/departments');
      const data: DepartmentsResponse = await response.json();
      setDepartments(data.data);
      setFilteredDepartments(data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDepartments = () => {
    let filtered = departments;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (dept) =>
          dept.code.toLowerCase().includes(term) ||
          dept.name.toLowerCase().includes(term) ||
          dept.description.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (dept) => statusFilter === 'active' ? !dept.archivedAt : dept.archivedAt
      );
    }

    setFilteredDepartments(filtered);
  };

  // Calculate statistics
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(dept => !dept.archivedAt).length;
  const totalPrograms = departments.reduce((sum, dept) => sum + dept.programs.length, 0);
  const totalCourses = departments.reduce((sum, dept) => sum + dept.courses.length, 0);

  const statCards = [
    {
      title: 'Total Departments',
      value: totalDepartments,
      icon: Building2,
      description: 'All academic departments',
      color: 'bg-blue-500',
    },
    {
      title: 'Active Departments',
      value: activeDepartments,
      icon: Building2,
      description: 'Currently active departments',
      color: 'bg-green-500',
    },
    {
      title: 'Total Programs',
      value: totalPrograms,
      icon: GraduationCap,
      description: 'All academic programs',
      color: 'bg-purple-500',
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      description: 'All courses offered',
      color: 'bg-orange-500',
    },
  ];

  const handleViewDetails = (department: Department) => {
    setSelectedDepartment(department);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const getStatusColor = (archivedAt: string | null) => {
    return archivedAt ? 'destructive' : 'success';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'UNDERGRADUATE':
        return 'bg-blue-100 text-blue-800';
      case 'POSTGRADUATE':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
        <p className="text-muted-foreground">
          Manage and view all academic departments, their programs, and courses.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Department Management</CardTitle>
          <CardDescription>
            Search and filter through all departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search departments by code, name, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[300px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Departments List</CardTitle>
          <CardDescription>
            Showing {filteredDepartments.length} of {departments.length} departments
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Programs</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.code}</TableCell>
                    <TableCell>
                      <div className="font-semibold">{department.name}</div>
                      {department.email && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {department.email}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {department.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {department.programs.slice(0, 2).map((program) => (
                          <Badge key={program.id} variant="outline" className="w-fit">
                            {program.code}
                          </Badge>
                        ))}
                        {department.programs.length > 2 && (
                          <Badge variant="secondary" className="w-fit">
                            +{department.programs.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {department.courses.length} courses
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(department.archivedAt)}>
                        {department.archivedAt ? 'Archived' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(department.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Link href={`/dashboard/departments/${department.id}`}
                          >
                            View Details
                          </Link>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Department Details</DialogTitle>
                            <DialogDescription>
                              Complete information for {department.name}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedDepartment && (
                            <div className="space-y-6">
                              {/* Department Info */}
                              <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Department Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Code</p>
                                      <p className="font-semibold">{selectedDepartment.code}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                                      <p className="font-semibold">{selectedDepartment.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                                      <p>{selectedDepartment.description}</p>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Contact Information</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    {selectedDepartment.email && (
                                      <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{selectedDepartment.email}</span>
                                      </div>
                                    )}
                                    {selectedDepartment.phone && (
                                      <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{selectedDepartment.phone}</span>
                                      </div>
                                    )}
                                    {selectedDepartment.location && (
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{selectedDepartment.location}</span>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>

                              {/* Programs */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Programs ({selectedDepartment.programs.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {selectedDepartment.programs.map((program) => (
                                      <div key={program.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <h4 className="font-semibold">{program.name} ({program.code})</h4>
                                            <Badge className={`mt-2 ${getLevelColor(program.level)}`}>
                                              {program.level}
                                            </Badge>
                                          </div>
                                          <Badge variant={program.status === 'ACTIVE' ? 'success' : 'destructive'}>
                                            {program.status}
                                          </Badge>
                                        </div>
                                        {program.careerPaths.length > 0 && (
                                          <div className="mt-3">
                                            <p className="text-sm font-medium text-muted-foreground">Career Paths:</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {program.careerPaths.map((path, index) => (
                                                <Badge key={index} variant="secondary">
                                                  {path}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Courses */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Courses ({selectedDepartment.courses.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {selectedDepartment.courses.map((course) => (
                                      <div key={course.id} className="flex items-center justify-between border-b pb-3">
                                        <div>
                                          <h4 className="font-semibold">{course.code} - {course.title}</h4>
                                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                                            <span>{course.credits} credits</span>
                                            <span>•</span>
                                            <span>{course.type}</span>
                                          </div>
                                        </div>
                                        <Badge variant={course.status === 'ACTIVE' ? 'success' : 'destructive'}>
                                          {course.status}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Metadata */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Additional Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid gap-4 md:grid-cols-3">
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Created</p>
                                        <p>{formatDate(selectedDepartment.createdAt)}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                        <p>{formatDate(selectedDepartment.updatedAt)}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Users className="h-4 w-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Department Head</p>
                                        <p>{selectedDepartment.head ? selectedDepartment.head.name : 'Not assigned'}</p>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          {filteredDepartments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No departments found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}