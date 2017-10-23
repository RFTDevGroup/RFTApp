export interface IUsers {
    id: number;
    firstName: string;
    lastName: string;
    roles: IRoles;
}

export interface IRoles {
    id: number;
    name: string;
}