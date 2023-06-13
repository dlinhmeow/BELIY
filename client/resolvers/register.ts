import * as yup from 'yup'
export const schemaRegister = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Nhập email'),
  password: yup.string().min(8, 'Mật khẩu phải ít nhất 8 ký tự').required('Nhập mật khẩu'),
  confirm_password: yup
    .string()
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
    .required('Nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})
