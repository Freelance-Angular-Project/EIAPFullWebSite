export interface EditProject {
  Name: string;
  Title1: string;
  Description1: string;
  Title2: string;
  StartDate: string;
  EndDate: string;
  ResultAnnouncement: string;
  Description2: string;
  Title3: string;
  Description3: string;
  InvestigatorId: string;
  [key: string]: any; // This allows any property accessed by a string to be of any type
}
