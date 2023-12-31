'use client'
import Link from 'next/link'
import { Controller } from 'react-hook-form'
const Register = ({ methods, handleSubmit }) => {
  return (
    <section className="bg-gradient-to-r from-[#000000] via-purple-500 to-[#000000]  flex items-center justify-center h-screen">
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
            <div className="bg-white rounded-full shadow-md mb-2 absolute top-0 -translate-x-1/2 left-1/2 -translate-y-2/3">
              <div className="bg-[url('/logo.png')] w-28 h-28 bg-cover" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Đăng ký tài khoản
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={methods.handleSubmit(handleSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <Controller
                  name="email"
                  defaultValue=""
                  control={methods.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        type="email"
                        {...field}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                      <small className="text-red-400 text-xs">
                        {fieldState?.error && fieldState.error.message}
                      </small>
                    </>
                  )}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <Controller
                  name="username"
                  defaultValue=""
                  control={methods.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        type="text"
                        {...field}
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                      <small className="text-red-400 text-xs">
                        {fieldState?.error && fieldState.error.message}
                      </small>
                    </>
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <Controller
                  name="password"
                  defaultValue=""
                  control={methods.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        type="password"
                        {...field}
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="••••••••"
                      />
                      <small className="text-red-400 text-xs">
                        {fieldState?.error && fieldState.error.message}
                      </small>
                    </>
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Xác nhận lại mật khẩu
                </label>
                <Controller
                  name="confirm_password"
                  defaultValue=""
                  control={methods.control}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        type="password"
                        {...field}
                        id="confirm_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="••••••••"
                      />
                      <small className="text-red-400 text-xs">
                        {fieldState?.error && fieldState.error.message}
                      </small>
                    </>
                  )}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white border font-semibold bg-purple-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-base px-5 py-2.5 text-center"
              >
                Đăng ký
              </button>
              <p className="text-sm font-light text-gray-500">
                Bạn đã có tài khoản?
                <Link href="/login" className="font-medium text-primary-600 hover:underline px-1">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
