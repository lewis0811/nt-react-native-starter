export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    role: 'user' | 'admin';
}