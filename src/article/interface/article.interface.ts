export interface IArticle {
    id: string,
    title: string,
    content: string,
    status: ArtileStatus
}

export enum ArtileStatus {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    CANCEL = 'CANCEL',
}