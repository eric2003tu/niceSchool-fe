// lib/application-utils.ts
import { ApplicationStatus } from "@/components/application-component/Admin";

export const isValidApplicationStatus = (status: string): status is ApplicationStatus => {
  const validStatuses: ApplicationStatus[] = [
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'INTERVIEW_SCHEDULED',
    'ADMITTED',
    'CONDITIONALLY_ADMITTED',
    'WAITLISTED',
    'REJECTED',
    'WITHDRAWN',
  ];
  return validStatuses.includes(status as ApplicationStatus);
};

export const mapToValidStatus = (status: string): ApplicationStatus => {
  if (isValidApplicationStatus(status)) {
    return status;
  }

  // Map common invalid statuses to valid ones
  const statusMap: Record<string, ApplicationStatus> = {
    'APPROVED': 'ADMITTED',
    'PENDING': 'SUBMITTED',
    'IN_REVIEW': 'UNDER_REVIEW',
    'ACCEPTED': 'ADMITTED',
    'DECLINED': 'REJECTED',
    'CANCELLED': 'WITHDRAWN',
  };

  if (typeof status === 'string') {
    return statusMap[status.toUpperCase()] || 'DRAFT';
  }
  return 'DRAFT';
};

export const getStatusDisplayName = (status: ApplicationStatus): string => {
  const displayNames: Record<ApplicationStatus, string> = {
    DRAFT: 'Draft',
    SUBMITTED: 'Submitted',
    UNDER_REVIEW: 'Under Review',
    INTERVIEW_SCHEDULED: 'Interview Scheduled',
    ADMITTED: 'Admitted',
    CONDITIONALLY_ADMITTED: 'Conditionally Admitted',
    WAITLISTED: 'Waitlisted',
    REJECTED: 'Rejected',
    WITHDRAWN: 'Withdrawn',
  };
  
  return displayNames[status] || status;
};