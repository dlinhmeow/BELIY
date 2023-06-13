'use client'
import { removeInCart, updateCart } from '@/redux/features/slices/cart'
import { ProductType } from '@/types/product'
import { StarIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
interface OrderSumariesProps {
  orders: ProductType[]
  onCheckout: () => void
}
const OrderSumaries: React.FC<OrderSumariesProps> = ({ orders, onCheckout }) => {
  const dispatch = useDispatch()
  const total = useCallback(() => {
    return orders?.reduce((total, item) => {
      return total + item?.quantityOrder * item?.product?.price
    }, 0)
  }, [orders])
  const removeItem = (item) => {
    dispatch(removeInCart(item))
  }
  return (
    <div className="h-auto max-w-5xl m-auto py-6 md:px-10 select-none">
      <h1 className="mb-10 text-2xl font-bold px-3">Giỏ hàng</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {orders.map((item) => (
            <div
              key={item.product.idPro + item.sizes[0]}
              className="justify-between mb-6 rounded-lg bg-white p-6 border shadow-md sm:flex sm:justify-start"
            >
              <div className="h-full w-36 overflow-hidden rounded-lg bg-cover bg-no-repeat">
                <Image
                  src={`https://drive.google.com/uc?id=${item?.images?.[0]}`}
                  width={1000}
                  height={1000}
                  alt=""
                  className="w-full max-h-[240px] object-contain md:object-cover rounded-md"
                />
              </div>
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h1 className="text-lg font-bold text-gray-900">{item.product.namePro}</h1>
                  <div className="flex  items-center gap-2">
                    {item.sizes.map((size) => (
                      <p
                        key={size.idSize}
                        className={clsx(
                          'w-6 h-6 rounded-full border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-[9px]'
                        )}
                      >
                        {size.name}
                      </p>
                    ))}
                  </div>
                  <div className="py-2 flex gap-2 mt-2">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={clsx(
                          item?.product?.reviews?.average > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0 hover:scale-150 ease-linear transition-all '
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 gap-4">
                  <div className="flex items-center justify-end flex-1 border-gray-100 gap-2">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-white"
                      onClick={() => {
                        dispatch(
                          updateCart({
                            ...item,
                            quantityOrder: item.quantityOrder - 1 > 0 ? item.quantityOrder - 1 : 0
                          })
                        )
                      }}
                    >
                      {' '}
                      -{' '}
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="text"
                      value={item.quantityOrder}
                      readOnly
                    />

                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-white"
                      onClick={() => {
                        dispatch(
                          updateCart({
                            ...item,
                            quantityOrder: item.quantityOrder < 10 ? item.quantityOrder + 1 : 10
                          })
                        )
                      }}
                    >
                      {' '}
                      +{' '}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-semibold">
                      {(item.quantityOrder * item?.product?.price).toLocaleString()} VND
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => removeItem(item)}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sub total */}

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Tạm tính</p>
            <p className="text-gray-700">{total().toLocaleString()}đ</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Phí ship</p>
            <p className="text-gray-700">30.000đ</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Tổng tiền</p>
            <div>
              <p className="mb-1 text-lg font-bold">
                {(total() ? total() + 30000 : 0).toLocaleString()}đ
              </p>
              <p className="text-sm text-gray-700">Đã bao gồm VAT</p>
            </div>
          </div>

          <button
            className={clsx(
              'mt-3 w-full text-sm rounded-md bg-black py-2 font-medium text-white disabled:hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed'
            )}
            onClick={onCheckout}
            disabled={!orders.length}
          >
            Tiến hành thanh toán
          </button>

          <Link href="/products">
            <button className="w-full mt-3 flex gap-1 justify-center items-center text-sm rounded-md bg-[#005BAA] py-2 font-medium text-blue-50 hover:bg-blue-600">
              Tiếp tục mua hàng
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSumaries
