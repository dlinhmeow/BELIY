export type SizeType = {
  idSize: string
  name: string
}

export type CatType = {
  idCat: string
  name: string
}
export type ProductType = {
  product: {
    idPro?: string
    namePro: string
    imageName: string

    imagesURL?: Array<string>
    price: number
    colors: Array<string>
    quantity: number
    quantityOrder: number
    highlights: string
    details: string
    description: string

    reviews?: {
      average?: number
      totalCount?: number
    }
  }
  sizes: Array<SizeType>
  category: CatType
  images: Array<string>
  quantityOrder?: number
}
