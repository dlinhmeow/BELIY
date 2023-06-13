import { OptionType } from '@/types/common'
import * as yup from 'yup'
export const schema = yup.object().shape({
  name: yup.string().required('Không được để trống họ tên.'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  award: yup
    .object()
    .required('Vui lòng chọn phường/xã.')
    .test('award', 'Vui lòng chọn phường/xã.', (opt: OptionType) => {
      return !!opt.value
    }),
  province: yup
    .object()
    .required('Vui lòng chọn tỉnh thành.')
    .test('award', 'Vui lòng chọn tỉnh thành.', (opt: OptionType) => {
      return !!opt.value
    }),
  district: yup
    .object()
    .required('Vui lòng chọn quận huyện.')
    .test('award', 'Vui lòng chọn quận huyện.', (opt: OptionType) => {
      return !!opt.value
    }),
  phone: yup.string().test('phone', 'Số điện thoại không hợp lệ.', (value: string) => {
    const reg = /((84|0[3|5|7|8|9])+([0-9]{8})\b)|(1[8|9]00)+([0-9]{4}\b)/g
    return !!reg.test(value.toString())
  })
})
