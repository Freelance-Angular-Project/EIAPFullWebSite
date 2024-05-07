export interface AddAssignment {
  [key: string]: string | boolean | Date | File | undefined;
  Name?:string;
  TaskId:string;
  File: File;
}
