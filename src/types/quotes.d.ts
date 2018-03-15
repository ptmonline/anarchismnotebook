declare namespace Api.Client {
    
    export interface Quote {
        id: number;
        author?: string;
        text?: string;
        extract?: string;
        subtext?: string;
        img?: string;
        title?: string;
    }
}