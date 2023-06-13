import { LoginType, RattingType } from '@/types/common'
import { CatType, ProductType } from '@/types/product'
import AxiosServices from './AxiosServices'
// get
const getCategory = async () => {
  return await AxiosServices.get<Array<CatType>>('category')
}

const getAllProduct = async () => {
  return await AxiosServices.get<ProductType[]>('product')
}

const getProductById = async (id) => {
  return await AxiosServices.get<ProductType>(`product/${id}`)
}

const getProductsByCatId = async (id) => {
  return await AxiosServices.get<ProductType[]>(`product/cat/${id}`)
}

const getCategoryByGender = async (gender) => {
  if (gender == 'all' || !gender) return await AxiosServices.get<Array<CatType>>('category')
  const id = gender == 'women' ? 2 : 1
  return await AxiosServices.get<Array<CatType>>(`category/parent/${id}`)
}
// post
const login = async (data: LoginType) => {
  return await AxiosServices.post<Omit<LoginType, 'password'>>('customer/login', data)
}
const register = async (data: LoginType & { email: string }) => {
  return await AxiosServices.post('customer/register', data)
}
const createOrder = async (data: any) => {
  return await AxiosServices.post('order/create', data)
}
// put
const updateReview = async (data: RattingType) => {
  return await AxiosServices.put('product/ratting', { review: data })
}
//
const checkQuantityBeforeAddOrder = async (data: Array<ProductType>) => {
  const orders = data.map((item) => ({
    idPro: item.product.idPro,
    idSize: item.sizes[0].idSize,
    quantityOrder: item.quantityOrder
  }))

  return await AxiosServices.post('product/checkquantity', { orders })
}
export {
  // post
  checkQuantityBeforeAddOrder,
  createOrder,
  getAllProduct,
  getCategory,
  getCategoryByGender,
  getProductById,
  getProductsByCatId,
  login,
  register,
  updateReview
}
