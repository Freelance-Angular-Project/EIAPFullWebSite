export interface AddTaskDashboard {
  [key: string]: string | boolean | number |Date | File | undefined;

  Name:string;
  Details:string;
  EndDate:Date;
  NumberOfFilesToAssignment:number;
  ProjectId:string;
}
