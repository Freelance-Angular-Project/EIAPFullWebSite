export interface CreateProject {
  [key: string]: string | boolean | Date | File | undefined;

  Name: string;
  Title1: string;
  Description1: string;
  Title2: string;
  Description2: string;
  Title3: string;
  Description3: string;
  StartDate: string;  // Consider using Date type if you handle dates as Date objects
  EndDate: string;    // Consider using Date type if you handle dates as Date objects
  ResultAnnouncement: string;  // Consider using Date type if appropriate
  InvestigatorId: string;
  Image: File;
}
