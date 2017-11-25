export interface ITransportCreate {
    cargo: ICargo,
    placeOfLoad: any,
    placeOfUnload: any,
    timeOfLoad: any,
    timeOfUnload: any,
    startingPrice: number
}

export interface ICargo {
    id: number,
    name: string,
    description: string,
    weight: number,
    width: number,
    height: number,
    depth: number
}