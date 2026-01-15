export interface IPersonConfig {
    id: number
    uid: string
    uuid: string
    name: string
    department: string
    identity: string
    avatar: string
    isWin: boolean
    x: number
    y: number
    createTime: string
    updateTime: string
    prizeName: string[]
    prizeId: string[]
    prizeTime: string[]
    prizeItemDetails?: string[]
}
export interface Separate {
    id: string
    count: number
    isUsedCount: number
}
export interface PrizeItem {
    id: string
    name: string
    quantity: number
}

export interface IPrizeConfig {
    id: number | string
    name: string
    sort: number
    isAll: boolean
    count: number
    isUsedCount: number
    picture: {
        id: string
        name: string
        url: string | Blob | ArrayBuffer
    }
    separateCount: {
        enable: boolean
        countList: Separate[]
    }
    desc: string
    isShow: boolean
    isUsed: boolean
    frequency: number
    prizeItems?: PrizeItem[]
}
export interface IMusic {
    id: string
    name: string
    url: string | Blob | ArrayBuffer
}

export interface IImage {
    id: string
    name: string
    url: string | Blob | ArrayBuffer
}
