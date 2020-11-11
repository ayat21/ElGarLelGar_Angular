import { Role } from './role';
export class User {
    ID: number;
    Name: string;
    Password: string;
    Phone: string;
    Photo: string;
    Email: string;
    About: string;
    streetID: number;
    Gender: boolean;
    Role: Role;
    Token?: string;
}
