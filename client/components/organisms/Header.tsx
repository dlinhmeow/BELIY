'use client'
import { LogoSvg } from '@/components/atoms'
import { RootState } from '@/redux/features/store'
import { Popover } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { GrClose } from 'react-icons/gr'
import { resetUser } from '@/redux/features/slices/user'
import { useEffect, useState } from 'react'
import { ProductType } from '@/types/product'

const navigation = {
  pages: [
    { name: 'Trang chủ', href: '/' },
    { name: 'Tất cả sản phẩm', href: '/products' },
    { name: 'Dành cho nữ', href: '/products?type=women' },
    { name: 'Dành cho nam', href: '/products?type=men' },
    // { name: 'Bộ phối', href: '/products' },
    { name: 'Về chúng tui', href: '/about' }
  ]
}

const Header = () => {
  const { push, asPath } = useRouter()

  const cart = useSelector((state: RootState) => state.cart)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [store,setStore]= useState<{cart:ProductType[], user:{id:string}}>()
  useEffect(()=>{
    setStore({
      cart,user
    })
  },[user,cart])
  return (
    <header className="sticky bg-white w-full h-fit z-40 top-0 shadow-sm">
      <input id="hamburger" type="checkbox" className="hidden" defaultChecked />
      <div className="flex h-10 items-center justify-start gap-4 bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        <div className="flex items-center">
          <FaTiktok />
        </div>
        <a href="https://www.facebook.com/beliystores">
          <FaFacebook />
        </a>

        <FaInstagram />
      </div>
      <div className="flex h-10 items-center justify-center bg-white px-4 mt-2 text-sm font-medium text-white sm:px-6 lg:px-8">
        <Link href="/" className="ml-4 flex justify-center items-center lg:ml-0 w-36 h-36" passHref>
          <LogoSvg />
        </Link>
      </div>
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <label
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              aria-label="Menu"
              htmlFor="hamburger"
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </label>

            {/* Flyout menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className={clsx(
                      'flex items-center text-xs font-medium text-gray-700 hover:text-gray-800',
                      {
                        '!font-bold': asPath === page.href
                      }
                    )}
                  >
                    <h2>{page.name}</h2>
                  </Link>
                ))}
              </div>
            </Popover.Group>
            {/* Logo */}
            <section className="ml-auto flex items-center">
              {store?.user?.id ? (
                <div className="flex items-center gap-2">
                  <span className="border rounded-full w-10 h-10 bg-[url('/user.png')] bg-cover"></span>
                  <p
                    onClick={() => dispatch(resetUser())}
                    className="text-xs font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                  >
                    Đăng xuất
                  </p>
                </div>
              ) : (
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    href="/login"
                    className="text-xs font-medium text-gray-700 hover:text-gray-800"
                  >
                    Đăng nhập
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link
                    href="/register"
                    className="text-xs font-medium text-gray-700 hover:text-gray-800"
                  >
                    Đăng ký thành viên
                  </Link>
                </div>
              )}

              {/* Search */}
              {/* <div className="flex lg:ml-6">
                <Link href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              </div> */}

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link href="/orders" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />

                  <span className="ml-2 text-sm font-bold text-gray-700 group-hover:text-gray-800">
                    {store?.cart?.length || 0}
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </nav>
      <aside
        id="bar-mobile"
        className="z-20 h-[70vh] absolute top-[150px] left-0 w-full md:w-[50%] flex-shrink-0  overflow-y-auto bg-white md:block lg:hidden shadow-lg pt-10"
      >
        <label htmlFor="hamburger" className="absolute top-3 right-3">
          <GrClose size={20} />
        </label>
        <div className="text-gray-500">
          <div className="w-full">
            <ul className="pb-4 flex flex-col gap-2">
              {navigation.pages.map((item) => (
                <label htmlFor="hamburger" key={item.name}>
                  <li className="relative py w-full">
                    <div
                      onClick={() => push(item.href)}
                      className={clsx(
                        'flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md',
                        {
                          'bg-[#F2F2F2] text-black': item.href === asPath
                        }
                      )}
                    >
                      <span className="ml-2">{item.name}</span>
                    </div>
                  </li>
                </label>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </header>
  )
}

export default Header
