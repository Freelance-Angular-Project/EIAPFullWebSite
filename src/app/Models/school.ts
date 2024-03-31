import { SchoolFile } from "./file";
import { ProjectInSchool } from "./project-in-school";

export interface School {
  id: string;
  userId: string;
  name: string;
  schoolEmail: string;
  code: string;
  curriculums: string;
  educationType: string;
  grade: string;
  zone: string;
  projects: ProjectInSchool[];
  files: SchoolFile[];
}
