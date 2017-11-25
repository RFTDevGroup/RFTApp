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