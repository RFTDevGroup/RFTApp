export interface ITransport {
    id: number;
    cargoName: string;
    cityFrom: string;
    cityTo: string;
    description: string;
    daysRemaining: string;
    owner: string;
    currentPrice: number;
}

export interface ITransportResponse {
    content: ITransport[],
    last: any,
    totalpages: number,
    totalElements: number,
    size: number,
    number: number,
    first: boolean,
    sort: any,
    numberOfElements: any
}

export interface ITransportCreate {
    cargo: ICargo,
    placeOfLoad: IAddress,
    placeOfUnload: IAddress,
    timeOfLoad: Date,
    timeOfUnload: Date,
    startingPrice: number
}

export interface IAddress {
    country: string,
    zipcode: string,
    city: string,
    street: string,
    houseNo: string
}

export interface ICargo {
    name: string,
    description: string,
    weight: string,
    width: number,
    height: string,
    depth: string
}