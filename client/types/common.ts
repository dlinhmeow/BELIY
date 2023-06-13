export type OptionType = {
  label: string
  value: string
}

export type OrderType = {
  name: string
  email: string
  award: OptionType
  province: OptionType
  district: OptionType
  phone: string
  addressNumber: string
}

export type LoginType = {
  idCus?: string
  username: string
  password: string
}

export type RattingType = {
  idPro?: string
  idUser?: string
  ratting: number
}
