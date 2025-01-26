
export type TUser = {
    name : string;
    photoUrl? : string;
    role : 'admin'| 'user';
    email: string;
    password : string;
}