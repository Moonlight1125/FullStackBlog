export interface blogType{
    id:number,
    content:string,
    img:string,
    title:string
}

export interface blogTypeAtTable{
    id:number,
    img:string,
    title:string
}

export interface commentType{
    id:number,
    content:string,
    cretedAt:Date,
    postId:number,
}

export type handleNavFuncType = (bool: boolean) => void;