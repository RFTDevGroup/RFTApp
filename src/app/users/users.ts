export interface IUsers {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    roles: string[];
}

export interface IAddress {
    country: string,
    zipcode: string,
    city: string,
    street: string,
    houseNo: string
}