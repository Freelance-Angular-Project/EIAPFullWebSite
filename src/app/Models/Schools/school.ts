import { SchoolFile } from "../File/file";
import { ProjectInSchool } from "../Projects/project-in-school";

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
