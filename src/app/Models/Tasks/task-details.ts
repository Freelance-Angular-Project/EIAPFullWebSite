export interface TaskDetails {
  id: string;
  name: string;
  details: string;
  createdAt:string;
  endDate: string;
  numberOfFilesToAssignment:number;//will used when check
  schoolId: string;
  status:string;
  commentToSchool:string;
  taskResultId:string;
  taskNotes:notes[];

  assignments: Assignments[];
  files: TaskFile[];
}
export interface Assignments {
  id: string;
  name: string;
  taskResultId: string;
  status:string;
  commentToSchool:string;
  created:string;
  url:string;
}

export interface TaskFile {
  id: string;
  taskId: string;
  url: string;
}
export interface notes {
  id: string;
  taskId: string;
  details: string;
}
