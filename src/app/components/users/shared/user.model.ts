export interface User {
  [x: string]: any; // Allows for a birthTimestamp, as well as future undefined attributes
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  email: string;
}
