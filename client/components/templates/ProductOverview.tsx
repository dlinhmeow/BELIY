'use client'
import { ProductType, SizeType } from '@/types/product'
import { RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import { useRef, useState } from 'react'
import { Autoplay, EffectCards } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ImageOptimizing } from '../atoms'

const breadcrumbs = [
  { id: 1, name: 'Trang chủ', href: '#' },
  { id: 2, name: 'Sản phẩm', href: '#' }
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
interface ProductOverviewProps {
  data: ProductType
  addToCart: (data: ProductType) => void
  addRatting: (ratting: number) => void
}
const ProductOverview: React.FC<ProductOverviewProps> = ({ addToCart, data, addRatting }) => {
  const [selectedSize, setSelectedSize] = useState<SizeType>(null)
  const handelAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...data, sizes: [selectedSize], quantityOrder: 1 })
    } else {
      enqueueSnackbar('Vui lòng chọn size nhó :v', { variant: 'info' })
    }
  }

  const progressContent = useRef(null)
  const [progressCircle, setProgressCircle] = useState(0)
  const onAutoplayTimeLeft = (s, time, progress) => {
    setProgressCircle(1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <p className="font-medium text-gray-500 hover:text-gray-600">
                {data?.product.namePro}
              </p>
            </li>
          </ol>
        </nav>

        <div className="grid-cols-2 hidden lg:grid columns-2xs gap-4 relative w-[80%] m-auto grid-rows-[500px] p-2">
          <div className="grid  grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              {data?.images?.[1] && (
                <ImageOptimizing
                  src={`https://drive.google.com/uc?id=${data?.images?.[1]}`}
                  objectFit="cover"
                />
              )}
            </div>
            <div className="rounded-2xl overflow-hidden row-span-1">
              {data?.images?.[2] && (
                <ImageOptimizing
                  src={`https://drive.google.com/uc?id=${data?.images?.[2]}`}
                  objectFit="cover"
                />
              )}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden">
            {data?.images?.[0] && (
              <ImageOptimizing
                src={`https://drive.google.com/uc?id=${data?.images?.[0]}`}
                objectFit="cover"
                className="object-center"
              />
            )}
          </div>
          <div className="rounded-2xl h-[65vh] overflow-hidden col-span-2 row-span-1">
            {data?.images?.[3] && (
              <ImageOptimizing
                src={`https://drive.google.com/uc?id=${data?.images?.[3]}`}
                objectFit="cover"
                className="object-center"
              />
            )}
          </div>
        </div>

        {/* Image gallery */}
        <div className="relative w-[95%] md:w-[80%] m-auto h-[400px] overflow-hidden lg:hidden rounded-2xl mt-2">
          <Swiper
            className="relative h-[400px] mySwiper"
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            centeredSlides={true}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
          >
            <SwiperSlide>
              {data?.images?.[0] && (
                <Image
                  width={1000}
                  height={1000}
                  alt=""
                  src={`https://drive.google.com/uc?id=${data?.images?.[0]}`}
                  className="w-[90%] m-auto rounded-2xl h-full object-cover"
                />
              )}
            </SwiperSlide>
            <SwiperSlide>
              {data?.images?.[1] && (
                <Image
                  width={1000}
                  height={1000}
                  alt=""
                  src={`https://drive.google.com/uc?id=${data?.images?.[1]}`}
                  className="w-[90%] m-auto rounded-2xl h-full object-cover"
                />
              )}
            </SwiperSlide>
            <SwiperSlide>
              {data?.images?.[2] && (
                <Image
                  width={1000}
                  height={1000}
                  alt=""
                  src={`https://drive.google.com/uc?id=${data?.images?.[2]}`}
                  className="w-[90%] m-auto rounded-2xl h-full object-cover"
                />
              )}
            </SwiperSlide>
            <SwiperSlide>
              {data?.images?.[3] && (
                <Image
                  width={1000}
                  height={1000}
                  alt=""
                  src={`https://drive.google.com/uc?id=${data?.images?.[3]}`}
                  className="w-[90%] m-auto rounded-2xl h-full object-cover"
                />
              )}
            </SwiperSlide>
            <div
              className="absolute right-4 bottom-3 z-40 w-12 h-12 flex items-center justify-center
              text-black"
              slot="container-end"
            >
              <svg
                viewBox="0 0 48 48"
                strokeDashoffset={125.6 * (1 - progressCircle)}
                strokeDasharray={125}
                className="rotate-90 fill-none stroke-[4px] rounded-sm stroke-white w-full h-full"
              >
                <circle cx="24" cy="24" r="20" strokeLinecap="round"></circle>
              </svg>
              <span className="text-white text-sm absolute" ref={progressContent}></span>
            </div>
          </Swiper>

          <div className="flex justify-center items-center pt-4">
            <button
              type="button"
              className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none"
            >
              <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
            >
              <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data?.product.namePro}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-2xl font-medium tracking-tight text-gray-900">
              {data?.product?.price?.toLocaleString()} VND
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        data?.avgReview > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0 hover:scale-150 ease-linear transition-all '
                      )}
                      onClick={() => addRatting(rating + 1)}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm font-medium text-black hover:text-indigo-500">
                  {data?.totalReview} Đánh giá
                </p>
              </div>
            </div>

            <div className="mt-10">
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Chọn size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {data?.sizes?.map((size) => (
                      <RadioGroup.Option
                        key={size.idSize}
                        value={size}
                        disabled={!size}
                        className={({ active }) =>
                          classNames(
                            size
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-[90%] m-auto rounded-2xl stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="button"
                onClick={handelAddToCart}
                className="mt-10 flex w-[90%] m-auto rounded-2xl items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-white hover:text-black hover:border-black hover:border ease-linear transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Mô tả sản phẩm</h3>

              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  <div dangerouslySetInnerHTML={{ __html: data?.product?.description }}></div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">Nổi bật</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <div className="text-sm text-gray-600">
                    <div dangerouslySetInnerHTML={{ __html: data?.product?.highlights }}></div>
                  </div>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-900">Chi tiết khác</h2>

              <div className="mt-4 space-y-6">
                <div className="text-sm text-gray-600">
                  <div dangerouslySetInnerHTML={{ __html: data?.product.details }}></div>
                </div>
              </div>
              <Link href="#" className="text-sm font-medium text-black hover:text-indigo-500">
                Hướng dẫn chọn size
              </Link>
              <div className="flex flex-col shadow-md rounded-xl border">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              #
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Dài
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Ngang
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2">
                          <tr className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">M</td>
                            <td className="whitespace-nowrap px-6 py-4">52</td>
                            <td className="whitespace-nowrap px-6 py-4">54</td>
                          </tr>
                          <tr className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">L</td>
                            <td className="whitespace-nowrap px-6 py-4">68</td>
                            <td className="whitespace-nowrap px-6 py-4">70</td>
                          </tr>
                          {/* <tr className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">XL</td>
                            <td className="whitespace-nowrap px-6 py-4">30</td>
                            <td className="whitespace-nowrap px-6 py-4">30</td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductOverview
