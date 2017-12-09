export interface IMessage {
    sender: string;
    topic: string;
    body: string;
    read: boolean;
}