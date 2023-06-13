import { CatType, ProductType, SizeType } from '@/types/product'
import AxiosServices from './AxiosServices'
import { OrderType } from '@/types/orders'
import { AccountType } from '@/types/account'
// get
const getCategory = async () => {
  return await AxiosServices.get<Array<CatType>>('category')
}
const getAllOrder = async () => {
  return await AxiosServices.get<Array<OrderType>>('order')
}

const getCustomer = async () => {
  return await AxiosServices.get<Array<AccountType>>('customer')
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
const getSize = async () => {
  return await AxiosServices.get<SizeType[]>(`size`)
}

const getEmployee = async () => {
  return await AxiosServices.get<AccountType[]>(`employee`)
}

const getCategoryByGender = async (gender) => {
  if (gender == 'all' || !gender) return await AxiosServices.get<Array<CatType>>('category')
  const id = gender == 'women' ? 2 : 1
  return await AxiosServices.get<Array<CatType>>(`category/parent/${id}`)
}
// post
const login = async (data) => {
  return await AxiosServices.post('customer/login', data)
}
const resgiter = async (data) => {
  return await AxiosServices.post('customer/register', data)
}
const addCategory = async (data) => {
  return await AxiosServices.post<any>('category/create', data)
}
const createProduct = async (data) => {
  return await AxiosServices.post<any>('product/create', data)
}

const createEmployee = async (data) => {
  return await AxiosServices.post<any>('employee/create', data)
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
// update
const updateStatusOrder = async (isCharge: boolean, idOrder: string) => {
  return await AxiosServices.put<Array<OrderType>>('order/change_status', {
    isCharge,
    idOrder
  })
}

const updateEmployeeRole = async (idEmp: string, role: string) => {
  return await AxiosServices.put('employee/updaterole', {
    idEmp,
    role
  })
}

const deleteEmployee = async (id: string) => {
  return await AxiosServices.delete('employee/delete/' + id, {})
}
const deleteCustomer = async (id: string) => {
  return await AxiosServices.delete('customer/delete/' + id, {})
}

const deleteCategory = async (id: string) => {
  return await AxiosServices.delete('category/delete/' + id, {})
}

const stockInCharge = async (nameStock: string, idOrder: string) => {
  return await AxiosServices.put<any>('order/stock_incharge', {
    nameStock,
    idOrder
  })
}
export {
  getCategory,
  getAllProduct,
  getProductById,
  getProductsByCatId,
  getCategoryByGender,
  getSize,
  getAllOrder,
  getCustomer,
  getEmployee,
  // post
  checkQuantityBeforeAddOrder,
  login,
  resgiter,
  addCategory,
  createProduct,
  updateStatusOrder,
  stockInCharge,
  createEmployee,
  updateEmployeeRole,
  // delete
  deleteEmployee,
  deleteCustomer,
  deleteCategory
}
