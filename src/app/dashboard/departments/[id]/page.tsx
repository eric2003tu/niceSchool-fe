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
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

interface Program {
  id: string;
  code: string;
  name: string;
  level: 'UNDERGRADUATE' | 'POSTGRADUATE';
  status: string;
  careerPaths: string[];
  admissionRequirements: string | null;
  accreditation: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
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

// New program form interface
interface NewProgramForm {
  code: string;
  name: string;
  level: 'UNDERGRADUATE' | 'POSTGRADUATE';
  status: 'ACTIVE' | 'INACTIVE';
  careerPaths: string[];
  admissionRequirements: string;
  accreditation: string;
  startDate: string;
  endDate: string;
}

export default function DepartmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Program dialog state
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [newProgram, setNewProgram] = useState<NewProgramForm>({
    code: '',
    name: '',
    level: 'UNDERGRADUATE',
    status: 'ACTIVE',
    careerPaths: [],
    admissionRequirements: '',
    accreditation: '',
    startDate: '',
    endDate: ''
  });
  const [newCareerPath, setNewCareerPath] = useState('');
  const [isSubmittingProgram, setIsSubmittingProgram] = useState(false);
  const [programError, setProgramError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchDepartment();
    }
  }, [id]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://niceschool-be-1.onrender.com/api/academics/departments/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch department: ${response.status}`);
      }
      
      const data: Department = await response.json();
      setDepartment(data);
    } catch (error) {
      console.error('Error fetching department:', error);
      setError(error instanceof Error ? error.message : 'Failed to load department');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCareerPath = () => {
    if (newCareerPath.trim() && !newProgram.careerPaths.includes(newCareerPath.trim())) {
      setNewProgram({
        ...newProgram,
        careerPaths: [...newProgram.careerPaths, newCareerPath.trim()]
      });
      setNewCareerPath('');
    }
  };

  const handleRemoveCareerPath = (path: string) => {
    setNewProgram({
      ...newProgram,
      careerPaths: newProgram.careerPaths.filter(p => p !== path)
    });
  };

  const handleSubmitProgram = async () => {
    if (!newProgram.code.trim() || !newProgram.name.trim()) {
      setProgramError('Code and name are required');
      return;
    }

    setIsSubmittingProgram(true);
    setProgramError(null);

    try {
      // API endpoint might be different, adjust based on your API structure
      const response = await fetch(`https://niceschool-be-1.onrender.com/api/academics/programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProgram,
          departmentId: id,
          careerPaths: newProgram.careerPaths
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create program');
      }

      // Reset form and close dialog
      setNewProgram({
        code: '',
        name: '',
        level: 'UNDERGRADUATE',
        status: 'ACTIVE',
        careerPaths: [],
        admissionRequirements: '',
        accreditation: '',
        startDate: '',
        endDate: ''
      });
      setNewCareerPath('');
      setShowAddProgram(false);
      
      // Refresh department data
      fetchDepartment();
    } catch (error) {
      console.error('Error creating program:', error);
      setProgramError('Failed to create program. Please try again.');
    } finally {
      setIsSubmittingProgram(false);
    }
  };

  const handleDeleteProgram = async (programId: string) => {
    try {
      const response = await fetch(`https://niceschool-be-1.onrender.com/api/academics/programs/${programId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete program');
      }

      // Refresh department data
      fetchDepartment();
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program. Please try again.');
    }
  };

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (error || !department) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/departments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Department Not Found</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'The requested department could not be found.'}
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/dashboard/departments">
            Back to Departments
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/departments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{department.name}</h1>
            <p className="text-muted-foreground">
              Department Code: {department.code}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Department
          </Button>
          <Dialog open={showAddProgram} onOpenChange={setShowAddProgram}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Program</DialogTitle>
                <DialogDescription>
                  Create a new program for {department.name}
                </DialogDescription>
              </DialogHeader>
              
              {programError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{programError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Program Code *</Label>
                    <Input
                      id="code"
                      placeholder="e.g., BSCS"
                      value={newProgram.code}
                      onChange={(e) => setNewProgram({...newProgram, code: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Program Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      value={newProgram.name}
                      onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Program Level *</Label>
                    <Select
                      value={newProgram.level}
                      onValueChange={(value: 'UNDERGRADUATE' | 'POSTGRADUATE') => 
                        setNewProgram({...newProgram, level: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UNDERGRADUATE">Undergraduate</SelectItem>
                        <SelectItem value="POSTGRADUATE">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select
                      value={newProgram.status}
                      onValueChange={(value: 'ACTIVE' | 'INACTIVE') => 
                        setNewProgram({...newProgram, status: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Career Paths</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a career path"
                      value={newCareerPath}
                      onChange={(e) => setNewCareerPath(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCareerPath()}
                    />
                    <Button type="button" onClick={handleAddCareerPath}>
                      Add
                    </Button>
                  </div>
                  {newProgram.careerPaths.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newProgram.careerPaths.map((path, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {path}
                          <button
                            type="button"
                            onClick={() => handleRemoveCareerPath(path)}
                            className="ml-1 hover:text-destructive"
                          >
                            <XCircle className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admissionRequirements">Admission Requirements</Label>
                  <Textarea
                    id="admissionRequirements"
                    placeholder="Enter admission requirements..."
                    value={newProgram.admissionRequirements}
                    onChange={(e) => setNewProgram({...newProgram, admissionRequirements: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accreditation">Accreditation</Label>
                    <Input
                      id="accreditation"
                      placeholder="e.g., ABET, AACSB"
                      value={newProgram.accreditation}
                      onChange={(e) => setNewProgram({...newProgram, accreditation: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProgram.startDate}
                      onChange={(e) => setNewProgram({...newProgram, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProgram.endDate}
                      onChange={(e) => setNewProgram({...newProgram, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddProgram(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitProgram} disabled={isSubmittingProgram}>
                  {isSubmittingProgram ? 'Creating...' : 'Create Program'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Department Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {department.archivedAt ? (
            <Badge variant="destructive">Archived</Badge>
          ) : (
            <Badge className="bg-green-500">Active</Badge>
          )}
          <span className="text-sm text-muted-foreground">
            Created {formatDate(department.createdAt)}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs ({department.programs.length})</TabsTrigger>
          <TabsTrigger value="courses">Courses ({department.courses.length})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Department Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  Department Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{department.description}</p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Details</h3>
                  {department.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{department.email}</span>
                    </div>
                  )}
                  {department.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{department.phone}</span>
                    </div>
                  )}
                  {department.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{department.location}</span>
                    </div>
                  )}
                  {!department.email && !department.phone && !department.location && (
                    <p className="text-sm text-muted-foreground">No contact details provided</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <span>Total Programs</span>
                    </div>
                    <Badge variant="outline">{department.programs.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <span>Total Courses</span>
                    </div>
                    <Badge variant="outline">{department.courses.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>Department Head</span>
                    </div>
                    <span className="text-sm">
                      {department.head?.name || 'Not assigned'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Last Updated</span>
                    </div>
                    <span className="text-sm">{formatDate(department.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Programs Preview */}
          {department.programs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Recent Programs
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#programs">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {department.programs.slice(0, 3).map((program) => (
                    <div key={program.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <h4 className="font-semibold">{program.name}</h4>
                        <p className="text-sm text-muted-foreground">{program.code}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getLevelBadge(program.level)}
                        {getStatusBadge(program.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Programs</CardTitle>
              <CardDescription>
                All programs offered by the {department.name} department
              </CardDescription>
            </CardHeader>
            <CardContent>
              {department.programs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No programs found</h3>
                  <p className="text-muted-foreground mb-4">
                    This department doesn't have any programs yet.
                  </p>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Program
                    </Button>
                  </DialogTrigger>
                </div>
              ) : (
                <div className="space-y-6">
                  {department.programs.map((program) => (
                    <Card key={program.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{program.name}</CardTitle>
                            <CardDescription className="flex items-center space-x-2 mt-1">
                              <span>Code: {program.code}</span>
                              <span>•</span>
                              <span>Created: {formatDate(program.createdAt)}</span>
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getLevelBadge(program.level)}
                            {getStatusBadge(program.status)}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Program</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{program.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteProgram(program.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete Program
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {program.careerPaths.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Career Paths</h4>
                            <div className="flex flex-wrap gap-2">
                              {program.careerPaths.map((path, index) => (
                                <Badge key={index} variant="secondary">
                                  {path}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {(program.admissionRequirements || program.accreditation) && (
                          <div className="grid grid-cols-2 gap-4">
                            {program.admissionRequirements && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Admission Requirements</h4>
                                <p className="text-sm text-muted-foreground">{program.admissionRequirements}</p>
                              </div>
                            )}
                            {program.accreditation && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Accreditation</h4>
                                <p className="text-sm text-muted-foreground">{program.accreditation}</p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Start Date:</span>{' '}
                            <span className="text-muted-foreground">{formatDate(program.startDate)}</span>
                          </div>
                          <div>
                            <span className="font-medium">End Date:</span>{' '}
                            <span className="text-muted-foreground">{formatDate(program.endDate)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                All courses offered by the {department.name} department
              </CardDescription>
            </CardHeader>
            <CardContent>
              {department.courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No courses found</h3>
                  <p className="text-muted-foreground">
                    This department doesn't have any courses yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {department.courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <h4 className="font-semibold">{course.code} - {course.title}</h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span>{course.credits} credits</span>
                          <span>•</span>
                          <span>Type: {course.type}</span>
                          {course.level && (
                            <>
                              <span>•</span>
                              <span>Level: {course.level}</span>
                            </>
                          )}
                        </div>
                        {course.description && (
                          <p className="mt-2 text-sm">{course.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getCourseStatusBadge(course.status, course.archivedAt)}
                        {course.maxStudents && (
                          <Badge variant="outline">Max: {course.maxStudents}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Settings</CardTitle>
              <CardDescription>
                Manage department settings and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Department Status</h3>
                  <div className="flex items-center space-x-2">
                    {department.archivedAt ? (
                      <>
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <span className="text-destructive">Archived on {formatDate(department.archivedAt)}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-500">Active Department</span>
                      </>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Timestamps</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{formatDate(department.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{formatDate(department.updatedAt)}</span>
                    </div>
                    {department.archivedAt && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Archived:</span>
                        <span>{formatDate(department.archivedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-destructive p-4">
                      <div>
                        <h4 className="font-medium text-destructive">Archive Department</h4>
                        <p className="text-sm text-muted-foreground">
                          Archive this department. Archived departments are hidden from most views.
                        </p>
                      </div>
                      <Button variant="destructive">
                        {department.archivedAt ? 'Unarchive' : 'Archive'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border border-destructive p-4">
                      <div>
                        <h4 className="font-medium text-destructive">Delete Department</h4>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete this department and all associated data.
                        </p>
                      </div>
                      <Button variant="destructive" disabled>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}