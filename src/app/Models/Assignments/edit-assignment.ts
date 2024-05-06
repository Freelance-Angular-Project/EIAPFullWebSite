import { AssignmentStatus } from "../../Enums/assignment-status";

export interface EditAssignment {
  assignmentId:string,
  status:AssignmentStatus,
  commentToSchool:string
}
