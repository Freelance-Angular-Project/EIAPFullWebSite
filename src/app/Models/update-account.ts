export interface UpdateAccount {
  id?: string; // Assuming id is a UUID, represented as a string
  gender: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userPassword: string;
}
