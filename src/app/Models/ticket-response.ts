export interface TicketResponse {
  id: string;
    schoolId: string;
    projectId: string | null;
    schoolName: string;
    projectName: string | null;
    subject: string;
    description: string;
    createdAt: string;
    response: any | null;
}
