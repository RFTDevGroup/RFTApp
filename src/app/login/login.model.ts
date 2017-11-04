export interface ILogin {
    userName: string;
    password: string;
}

export interface ILoginUser {
    id: number;
    firstName: string;
    lastName: string;
    roles: ILoginRoles;
}

export interface ILoginRoles {
    id: number;
    name: string;
}