import * as yup from 'yup'
export const schema = yup.object().shape({
  product: yup.object().shape({
    namePro: yup.string().required('Không được để trống'),
    price: yup.number().test('quantity', 'Nhập giá sản phẩm', (value) => {
      if (!value) return false
      return true
    }),
    quantity: yup.number().test('quantity', 'Nhập số lượng', (value) => {
      if (!value) return false
      return true
    }),
    description: yup.string().required('Không được để trống')
  }),
  sizes: yup.array().test('sizes', 'Hãy chọn size', (value) => {
    if (!value.length) return false
    return true
  }),

  category: yup.object().required('Không được để trống')
})
