import { IAddress } from '../users/users';

export interface IBid {
    id: number;
    bidder: IBidder;
    amount: number;
}

export interface IBidder {
    id: number;
    userName: string;
    password: string;
    roles: IBidderRole[];
    details: IBidDetails;
}

export interface IBidderRole {
    id: number;
    name: string;
}

export interface IBidDetails {
    id: number;
    firstName: string;
    lastName: string;
    address: IAddress;
    email: string;
}

export interface IBidMinimal {
    username: IMinimal;
    amount: number;
}

export interface IMinimal {
    username: string;
}