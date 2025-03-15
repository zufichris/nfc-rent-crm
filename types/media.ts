export enum MediaType {
    VIDEO = 'video',
    AUDIO = 'audio',
    IMAGE = 'image',
    PDF = 'pdf',
    DOCUMENT = 'document',
    MODEL_3D = 'model_3D',
    OTHER = 'other',
}

export interface IMediaItem {
    url: string;
    type: MediaType; //Checkk MediaType enum
    isThumbnail: boolean; //defaults to false
}