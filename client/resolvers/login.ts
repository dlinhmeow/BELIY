import * as yup from 'yup'
export const schemaLogin = yup.object().shape({
  username: yup.string().required('Nhập tên đăng nhập'),
  password: yup.string().min(8, 'Mật khẩu phải ít nhất 8 ký tự').required('Nhập mật khẩu')
})
