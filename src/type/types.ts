export type CardType =  {
    id: string
    updated_at: Date
    img: string
    description: string
    price: number
    brand?: string
    name?: string
    surname?: string
    address?: string
    phone?: string
}
 export type AdminType = {
     address: string | null
     brands: Array<string> | null
     id: string | null
     name: string | null
     phone: string | null
     prices: Array<number> | null
     primaryKey: string
     surname: string
 }
