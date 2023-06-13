'use client'
import { Login } from '@/components/templates'
import { DefaultLayout } from '@/layouts/Layouts'
import { setUser } from '@/redux/features/slices/user'
import { schemaLogin } from '@/resolvers/login'
import { LoginType } from '@/types/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { login } from 'apis/apis'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm<LoginType>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(schemaLogin)
  })

  const handleSubmit = async (data: LoginType) => {
    login(data)
      .then(({ data: user }) => {
        console.log(user)
        if (user?.username) {
          setCookie('user', JSON.stringify({ ...user }))
          dispatch(setUser({ id: user.idCus, email: user.username }))
          router.push('/')
        } else {
          enqueueSnackbar('Đăng nhập thất bại', { variant: 'error' })
        }
      })
      .catch(() => {
        enqueueSnackbar('Đăng nhập thất bại', { variant: 'error' })
      })
  }
  const props = {
    methods,
    handleSubmit
  }
  return <Login {...props} />
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default LoginPage
