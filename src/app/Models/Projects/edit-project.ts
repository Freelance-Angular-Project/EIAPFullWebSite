export interface EditProject {
  Name: string;
  Title1: string;
  Description1: string;
  Title2: string;
  StartDate: Date;
  EndDate: Date;
  ResultAnnouncement: Date;
  Description2: string;
  Title3: string;
  Description3: string;
  InvestigatorId: string;
  [key: string]: any; // This allows any property accessed by a string to be of any type
}
