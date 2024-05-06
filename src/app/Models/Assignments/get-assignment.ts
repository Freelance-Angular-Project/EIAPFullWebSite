export interface GetAssignment {
  id: string;
  assignmentId: string;
  taskId: string;
  schoolName: string;
  name: string;
  status: string;
  commentToSchool: string | null;
  created: string;
  url: string;
}
