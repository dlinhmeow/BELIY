'use client'
import { Register } from '@/components/templates'
import { DefaultLayout } from '@/layouts/Layouts'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { schemaRegister } from '@/resolvers/register'
import { yupResolver } from '@hookform/resolvers/yup'
import { register } from 'apis/apis'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
const RegisterPage = () => {
  const router = useRouter()
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(schemaRegister)
  })
  const dispatch = useDispatch()

  const handleSubmit = async (data) => {
    dispatch(setLoading({ status: true, mode: 'default', title: 'Đang tạo tài khoản' }))
    console.log(data)
    await register(data)
      .then(() => {
        dispatch(
          setLoading({
            status: true,
            mode: 'success',
            title: (
              <div className="flex flex-col pt-3 justify-center items-center">
                <p>Tạo thành công</p>
                <button
                  onClick={() => {
                    dispatch(closeLoading())
                    router.push('/')
                  }}
                  className="flex-1 mt-2 items-center py-2 px-4 text-xs font-medium text-center text-white bg-emerald-400 rounded-lg focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-600"
                >
                  Về trang đăng nhập
                </button>
              </div>
            )
          })
        )
      })
      .catch(() => {
        enqueueSnackbar('Tài khoản đã tồn tại', { variant: 'error' })
        dispatch(closeLoading())
      })
  }
  const props = {
    methods,
    handleSubmit
  }
  return <Register {...props} />
}
RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default RegisterPage
