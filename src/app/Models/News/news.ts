export interface News {
  [key: string]: string | boolean | Date | File | undefined;

  id: string;
  details: string;
  year: string;
  isEvent: boolean;
  imageUrl: File;
}
