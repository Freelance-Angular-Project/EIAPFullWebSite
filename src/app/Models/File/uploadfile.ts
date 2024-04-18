export interface Uploadfile {
  [key: string]: string | boolean | Date | File | undefined;
  // Existing properties...
  TaskId: string;
  schoolId: string;
  ProjectId: string;
  Name: string;
  Description: string;
  EndDate: Date;
  IsPublic: boolean;
  File: File;
}

