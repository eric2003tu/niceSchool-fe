"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Mail, 
  MapPin, 
  Globe, 
  User, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  FileText, 
  CalendarDays,
  Building,
  Bookmark,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function StudentDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudent() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:3001/api/academics/students/admitted-registered-enrolled/${id}`);
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();
        setStudent(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchStudent();
  }, [id]);

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading student details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="p-8 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Student</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    </div>
  );
  
  if (!student) return (
    <div className="p-8 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Student Not Found</h2>
        <p className="text-muted-foreground">The requested student could not be found.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    </div>
  );

  const { profile, program, cohort, enrollments } = student;

  // Helper to format date
  const formatDate = (date?: string | null) => date ? new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : "Not specified";
  
  // Calculate total credits
  const totalCredits = enrollments?.reduce((sum: number, en: any) => sum + (en.course?.credits || 0), 0) || 0;
  
  // Format currency
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };

  // Get enrollment status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
      case 'REGISTERED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'WITHDRAWN': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      {/* Header with back button and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()} 
            className="gap-2 hover:bg-accent"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Students
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
          <Button size="sm" className="gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </Button>
        </div>
      </div>

      {/* Student Header Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={profile?.avatarUrl || undefined} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-100 to-purple-100 text-blue-800">
                  {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile?.displayName}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge 
                    variant="secondary" 
                    className={`font-semibold px-3 py-1 ${student.academicStatus === "ACTIVE" ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-gray-100 text-gray-800'}`}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {student.academicStatus}
                  </Badge>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{student.studentNumber}</span>
                  </div>
                </div>
                <p className="text-gray-500 mt-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{program?.name} • {cohort?.name}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="gap-2 px-3 py-2 bg-white">
                <Calendar className="w-4 h-4" />
                <div>
                  <div className="text-xs text-gray-500">Enrolled</div>
                  <div className="font-medium">{formatDate(student.enrollmentDate)}</div>
                </div>
              </Badge>
              <Badge variant="outline" className="gap-2 px-3 py-2 bg-white">
                <BookOpen className="w-4 h-4" />
                <div>
                  <div className="text-xs text-gray-500">Courses</div>
                  <div className="font-medium">{enrollments?.length || 0} enrolled</div>
                </div>
              </Badge>
              <Badge variant="outline" className="gap-2 px-3 py-2 bg-white">
                <CreditCard className="w-4 h-4" />
                <div>
                  <div className="text-xs text-gray-500">Balance</div>
                  <div className={`font-medium ${parseFloat(student.tuitionBalance) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(student.tuitionBalance)}
                  </div>
                </div>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex bg-gray-50 p-1">
          <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-white">
            <User className="w-4 h-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="academics" className="gap-2 data-[state=active]:bg-white">
            <GraduationCap className="w-4 h-4" /> Academics
          </TabsTrigger>
          <TabsTrigger value="enrollments" className="gap-2 data-[state=active]:bg-white">
            <BookOpen className="w-4 h-4" /> Enrollments ({enrollments?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="financial" className="gap-2 data-[state=active]:bg-white">
            <CreditCard className="w-4 h-4" /> Financial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Date of Birth</span>
                    </div>
                    <span className="font-medium">{formatDate(profile?.dateOfBirth)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-600">Gender</span>
                    </div>
                    <span className="font-medium">{profile?.gender || 'Not specified'}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Nationality</span>
                    </div>
                    <span className="font-medium">{profile?.nationality || 'Not specified'}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bookmark className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Preferred Language</span>
                    </div>
                    <Badge variant="outline">{profile?.preferredLocale || 'English'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Address</span>
                    </div>
                    <div className="text-gray-800 ml-7">{profile?.address || 'Not specified'}</div>
                  </div>
                  <Separator />
                  <div className="p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">Emergency Contact</span>
                    </div>
                    <div className="text-gray-800 ml-7">{profile?.emergencyContact || 'Not specified'}</div>
                  </div>
                  <Separator />
                  <div className="p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Timezone</span>
                    </div>
                    <div className="flex items-center gap-2 ml-7">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{profile?.timezone || 'UTC'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-2">Bio</div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px]">
                    {profile?.bio || 'No bio provided by the student.'}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profile Created</span>
                    <span className="font-medium">{formatDate(profile?.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">{formatDate(profile?.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Academic Program
                </CardTitle>
                <CardDescription>
                  Current degree program and academic standing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{program?.name}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="secondary" className="font-semibold">
                      {program?.code}
                    </Badge>
                    <Badge variant="outline">{program?.level}</Badge>
                    <Badge variant={program?.status === "ACTIVE" ? "default" : "secondary"}>
                      {program?.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Degree Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Major</div>
                        <div className="font-medium">{student.major || 'Undeclared'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Minor</div>
                        <div className="font-medium">{student.minor || 'None'}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Career Paths</h4>
                    <div className="flex flex-wrap gap-2">
                      {program?.careerPaths?.map((path: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {path}
                        </Badge>
                      )) || (
                        <span className="text-gray-500">Not specified</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Program Accreditation</h4>
                    <div className="text-gray-800">{program?.accreditation || 'Not specified'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cohort Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Cohort Information
                </CardTitle>
                <CardDescription>
                  Class group and academic timeline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{cohort?.name}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{cohort?.code}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Academic Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Intake Period</span>
                        <div className="text-right">
                          <div className="font-medium">{cohort?.intakeYear} {cohort?.intakeSemester}</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Program Start</span>
                        <span className="font-medium">{formatDate(cohort?.startDate)}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Expected Completion</span>
                        <span className="font-medium">{formatDate(cohort?.endDate)}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Graduation Date</span>
                        <span className="font-medium">{formatDate(cohort?.graduationDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Academic Advisor</h4>
                    <div className="text-gray-800">{cohort?.advisorId ? 'Assigned' : 'Not assigned yet'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Summary</CardTitle>
              <CardDescription>
                Overview of academic progress and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-700">{enrollments?.length || 0}</div>
                  <div className="text-sm text-blue-600 font-medium mt-2">Total Courses</div>
                  <div className="text-xs text-blue-500 mt-1">Currently enrolled</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-700">{totalCredits}</div>
                  <div className="text-sm text-green-600 font-medium mt-2">Total Credits</div>
                  <div className="text-xs text-green-500 mt-1">Semester load</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-700">{student.major || 'N/A'}</div>
                  <div className="text-sm text-purple-600 font-medium mt-2">Major</div>
                  <div className="text-xs text-purple-500 mt-1">Primary field of study</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                  <div className="text-3xl font-bold text-amber-700">{student.minor || 'None'}</div>
                  <div className="text-sm text-amber-600 font-medium mt-2">Minor</div>
                  <div className="text-xs text-amber-500 mt-1">Secondary concentration</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Course Enrollments</CardTitle>
                  <CardDescription>
                    Current and past course registrations
                  </CardDescription>
                </div>
                <Badge variant="outline" className="px-3 py-1.5">
                  {enrollments?.length || 0} Courses • {totalCredits} Credits
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Course Code</TableHead>
                      <TableHead>Course Title</TableHead>
                      <TableHead className="w-[100px]">Semester</TableHead>
                      <TableHead className="w-[80px]">Credits</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[140px]">Enrolled Date</TableHead>
                      <TableHead className="w-[100px]">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments?.length ? enrollments.map((en: any, idx: number) => (
                      <TableRow key={en.id || idx} className="hover:bg-gray-50">
                        <TableCell className="font-semibold">
                          {en.course?.code}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{en.course?.title}</div>
                          <div className="text-sm text-gray-500">Course Type: {en.course?.type || 'Lecture'}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {en.semester}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-semibold">
                            {en.course?.credits || 0}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`font-medium ${getStatusColor(en.status)}`}
                          >
                            {en.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {formatDate(en.enrolledAt)}
                        </TableCell>
                        <TableCell>
                          {en.finalGrade ? (
                            <div className="flex items-center gap-2">
                              <div className="font-bold text-gray-900">{en.finalGrade}</div>
                              {en.isPassed && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <BookOpen className="w-12 h-12 text-gray-300" />
                            <div>
                              <p className="text-gray-500 font-medium">No enrollments found</p>
                              <p className="text-sm text-gray-400">This student is not currently enrolled in any courses</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Financial Overview
                </CardTitle>
                <CardDescription>
                  Tuition, fees, and financial aid
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className={`p-6 rounded-xl border-2 ${parseFloat(student.tuitionBalance) > 0 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                    <div className="text-sm font-medium text-gray-500 mb-2">Current Balance</div>
                    <div className={`text-4xl font-bold ${parseFloat(student.tuitionBalance) > 0 ? 'text-red-700' : 'text-green-700'}`}>
                      {formatCurrency(student.tuitionBalance)}
                    </div>
                    <div className={`text-sm mt-2 ${parseFloat(student.tuitionBalance) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {parseFloat(student.tuitionBalance) > 0 ? 'Payment required' : 'Balance cleared'}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-blue-200 bg-blue-50">
                    <div className="text-sm font-medium text-gray-500 mb-2">Scholarship Award</div>
                    <div className="text-3xl font-bold text-blue-700">
                      {student.scholarship ? formatCurrency(student.scholarship) : 'None'}
                    </div>
                    <div className="text-sm text-blue-600 mt-2">
                      {student.scholarship ? 'Awarded for academic year' : 'No scholarship awarded'}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Application Information</h4>
                  <div className="text-gray-800">{student.applicationId ? 'Application linked to student record' : 'No application linked'}</div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Academic Timeline
                </CardTitle>
                <CardDescription>
                  Important dates and milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">Enrollment Date</div>
                    <div className="font-medium text-gray-900">{formatDate(student.enrollmentDate)}</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">Expected Graduation</div>
                    <div className="font-medium text-gray-900">{formatDate(student.graduationDate)}</div>
                    <div className="text-xs text-gray-500 mt-1">Based on program requirements</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">Record Created</div>
                    <div className="font-medium text-gray-900">{formatDate(student.createdAt)}</div>
                    <div className="text-xs text-gray-500 mt-1">Student record establishment</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm font-medium text-gray-500 mb-1">Last Updated</div>
                    <div className="font-medium text-gray-900">{formatDate(student.updatedAt)}</div>
                    <div className="text-xs text-gray-500 mt-1">Most recent record update</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Record Management</h4>
                  <div className="text-gray-800">
                    {student.createdById ? `Record created by administrator` : 'System-generated record'}
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