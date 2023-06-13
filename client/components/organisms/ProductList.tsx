'use client'
import { ProductType } from '@/types/product'
import { getAllProduct, getProductsByCatId } from 'apis/apis'
import clsx from 'clsx'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ImageOptimizing } from '../atoms'
interface ProductListProps {
  title?: string
  id?: string
  catId?: string
  gender?: string
}

const ProductList: React.FC<ProductListProps> = ({ id, catId, title }) => {
  const { setValue, control } = useForm<{ products: ProductType[] }>({
    defaultValues: {
      products: []
    }
  })

  const fetch = async () => {
    if (!catId) {
      await getAllProduct()
        .then(async (res) => {
          const data = res.data
          setValue('products', data)
        })
        .catch((error) => console.log(error))
    } else {
      await getProductsByCatId(catId)
        .then(async (res) => {
          const data = res.data
          setValue('products', data)
        })
        .catch((error) => console.log(error))
    }
  }
  useEffect(() => {
    fetch()
  }, [catId])
  return (
    <section className="bg-white" id={id}>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6  lg:max-w-7xl lg:px-8">
        <Controller
          name="products"
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            if (!field.value.length) return <></>
            return (
              <>
                {title && (
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                )}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 fit:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                  {[...field.value].map((item,index) => (
                    <Fragment key={item.product.idPro+index}>
                      <Link href={`/products/${item.product.idPro}`} key={item.product.idPro}>
                        <div
                          key={item?.images?.[0]}
                          className="sxx:w-full ss:w-[50%] 
                          md:min-w-[280px] first-letter:md:max-w-[280px] md:w-[33.333%] lg:w-[25%] bg-white rounded-lg flex flex-col p-4 gap-2 shadow-lg transition-all ease-linear h-full flex-1 hover:shadow-2xl"
                        >
                          <div className="w-full h-[240px] relative overflow-hidden rounded-lg">
                            <ImageOptimizing
                              src={`https://drive.google.com/uc?id=${item?.images?.[0]}`}
                              objectFit="cover"
                              className="object-center"
                            />
                          </div>
                          <div className="flex items-start justify-between flex-1">
                            <h2 className="w-fit p-2 h-7  flex items-center text-black justify-center font-bold text-sm">
                              {item.product.namePro}
                            </h2>
                          </div>

                          <div className="w-full text-white text-sm flex-1 flex items-start justify-between gap-2 px-2">
                            <p className="text-black font-medium rounded-lg text-xs ">
                              Giá: {Number(item.product.price)?.toLocaleString()}
                            </p>
                          </div>
                          <div className="w-full text-white text-sm flex-1 flex items-start justify-between gap-2 px-2">
                            <div className="flex gap-1 flex-1 flex-wrap justify-start">
                              {[...item.sizes].map((item, index) => (
                                <p
                                  key={item.idSize + index}
                                  className={clsx(
                                    'w-6 h-6 rounded-full border-2 cursor-pointer border-gray-500 flex items-center text-black justify-center font-bold text-[9px]'
                                  )}
                                >
                                  {item.name}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Fragment>
                  ))}
                </div>
              </>
            )
          }}
        />
      </div>
    </section>
  )
}
export default ProductList
