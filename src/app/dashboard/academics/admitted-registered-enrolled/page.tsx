"use client";


import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PaginationControls } from "@/components/application-component/PaginationControls";
import { StatsCard } from "@/components/dashboard/ui/NewsView/StatsCard";
import { User, GraduationCap, Users, CheckCircle } from "lucide-react";

interface StudentProfile {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl: string | null;
  dateOfBirth: string | null;
}
interface Program {
  id: string;
  code: string;
  name: string;
  level: string;
}
interface Enrollment {
  id: string;
  courseId: string;
  semester: string;
  status: string;
  enrolledAt: string;
}
interface Student {
  id: string;
  studentNumber: string;
  enrollmentDate: string;
  academicStatus: string;
  program: Program;
  profile: StudentProfile;
  enrollments: Enrollment[];
}

const PAGE_SIZE = 10;

const AdmittedRegisteredEnrolledStudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3001/api/academics/students/admitted-registered-enrolled");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data.data || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Get unique programs and statuses for filters
  const programOptions = useMemo(() => {
    const set = new Set(students.map(s => s.program.name));
    return ["all", ...Array.from(set)];
  }, [students]);
  const statusOptions = useMemo(() => {
    const set = new Set(students.map(s => s.academicStatus));
    return ["all", ...Array.from(set)];
  }, [students]);

  // Filtered and searched students
  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchesSearch =
        s.profile.displayName.toLowerCase().includes(search.toLowerCase()) ||
        s.studentNumber.toLowerCase().includes(search.toLowerCase());
      const matchesProgram = programFilter === "all" || s.program.name === programFilter;
      const matchesStatus = statusFilter === "all" || s.academicStatus === statusFilter;
      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [students, search, programFilter, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Stat cards
  const total = students.length;
  const active = students.filter(s => s.academicStatus === "ACTIVE").length;
  const graduated = students.filter(s => s.academicStatus === "GRADUATED").length;
  const uniquePrograms = new Set(students.map(s => s.program.name)).size;

  const router = useRouter();
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-2">Admitted, Registered & Enrolled Students</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={<Users size={24} />} value={total} label="Total Students" color="blue" />
        <StatsCard icon={<CheckCircle size={24} />} value={active} label="Active" color="green" />
        <StatsCard icon={<GraduationCap size={24} />} value={graduated} label="Graduated" color="purple" />
        <StatsCard icon={<User size={24} />} value={uniquePrograms} label="Programs" color="yellow" />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <Input
          placeholder="Search by name or student number..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={programFilter} onValueChange={v => { setProgramFilter(v); setPage(1); }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              {programOptions.map(option => (
                <SelectItem key={option} value={option}>{option === "all" ? "All Programs" : option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option} value={option}>{option === "all" ? "All Statuses" : option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Student Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Cohort</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={11} className="text-red-500 text-center">{error}</TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center">No students found.</TableCell>
              </TableRow>
            ) : (
              paginated.map((student, idx) => (
                <TableRow key={student.id}>
                  <TableCell>{(page - 1) * PAGE_SIZE + idx + 1}</TableCell>
                  <TableCell>{student.studentNumber}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {student.profile.avatarUrl && (
                      <img src={student.profile.avatarUrl} alt={student.profile.displayName} className="w-7 h-7 rounded-full object-cover" />
                    )}
                    {student.profile.displayName}
                  </TableCell>
                  <TableCell>{student.program.name}</TableCell>
                  <TableCell>{student.program.level}</TableCell>
                  <TableCell>{student.program.code}</TableCell>
                  <TableCell>{(student as any).cohort?.name || (student as any).cohort?.code || "-"}</TableCell>
                  <TableCell>{student.academicStatus}</TableCell>
                  <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                  <TableCell>{student.enrollments.length}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => router.push(`/dashboard/academics/admitted-registered-enrolled/${student.id}`)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="pt-4">
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          itemsPerPage={PAGE_SIZE}
          onPageChange={p => setPage(p)}
        />
      </div>
    </div>
  );
};

export default AdmittedRegisteredEnrolledStudentsPage;
