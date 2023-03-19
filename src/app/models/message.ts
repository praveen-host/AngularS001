export interface Message {
    clientuniqueid: string;
    fromUserName:string;
    toUserName:string;
    type: string;
    message: string;
    date: Date;
}
