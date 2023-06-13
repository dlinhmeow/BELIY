'use client'
import { StateProductPageType } from '@/pages/admin/products'
import { ProductType } from '@/types/product'
import clsx from 'clsx'
import { xor } from 'lodash'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MdAddCircle } from 'react-icons/md'
import { ImageOptimizing, Select, TextAreaField, TextField } from '../atoms'
import { Modal } from '../moleculers'

interface ProductProps {
  stateStore: UseFormReturn<StateProductPageType, any>
  dataForm: UseFormReturn<ProductType, any>
  addProduct: (data: ProductType) => void
  editProduct: (data: ProductType) => void
  deleteData: (id: string) => void
}
const Product: React.FC<ProductProps> = ({
  dataForm,
  stateStore,
  addProduct,
  editProduct,
  deleteData
}) => {
  const tab = useSearchParams().get('tab')
  // const CATEGORIES = stateStore.getValues('categories')?.reduce((list, item) => {
  //   return { ...list, [item.code]: item.name }
  // }, {})
  const handleSubmit = (data) => {
    if (stateStore.getValues('isEdit')) {
      editProduct(data)
    } else {
      addProduct(data)
    }
  }
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden p-2">
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <Controller
              name="categories"
              defaultValue={[]}
              control={stateStore.control}
              render={({ field }) => (
                <>
                  <li className="mr-2" key={'all'}>
                    <Link
                      href={`/admin/products?tab=${'all'}`}
                      className={clsx('inline-block p-4  rounded-t-l', {
                        'active text-blue-600 border-b-2 border-blue-600': !tab || tab === 'all'
                      })}
                    >
                      Tất cả
                    </Link>
                  </li>
                  {field.value.map((item) => (
                    <li className="mr-2" key={item.idCat}>
                      <Link
                        href={`/admin/products?tab=${item.idCat}`}
                        className={clsx('inline-block p-4  rounded-t-l', {
                          'active text-blue-600 border-b-2 border-blue-600': tab === item.idCat
                        })}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            />
          </ul>
        </div>
        <div className="flex-1 pr-4 h-full flex justify-end items-center">
          <button
            type="button"
            className="w-fit inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            onClick={() => {
              stateStore.setValue('isModal', true)
              stateStore.setValue('isEdit', false)
            }}
          >
            <label className="hidden md:block"> Tạo sản phẩm</label>
            <label className="block md:hidden">
              <MdAddCircle size={20} />
            </label>
          </button>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        <div className="flex justify-center gap-5 items-start flex-wrap h-[380px]">
          <Controller
            name="products"
            control={stateStore.control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                {[...field.value].map((item) => (
                  <div
                    key={item?.product.idPro}
                    className="w-[90%] min-w-[270px] md:max-w-[280px] md:w-[33.333%] lg:w-[25%] bg-white rounded-lg flex flex-col p-4 gap-2 shadow-lg h-full flex-1"
                  >
                    <div className="w-full h-[240px] relative overflow-hidden">
                      <ImageOptimizing
                        src={`https://drive.google.com/uc?id=${item?.images?.[0]}`}
                      />
                    </div>
                    <div className="flex items-start justify-between flex-1">
                      <p className="w-fit p-2 h-7 rounded-md border-2 border-black flex items-center text-black justify-center font-bold text-xs">
                        {item.product.namePro}
                      </p>
                    </div>

                    <div className="w-full text-white text-lg flex-1 flex items-start justify-between gap-2 px-2">
                      <p className="text-black font-medium rounded-lg text-xs flex-1">
                        Giá: {Number(item.product.price)?.toLocaleString()}
                      </p>
                      <div className="w-full text-white text-sm flex-1 flex items-start justify-between gap-2">
                        <div className="flex gap-1 flex-1 flex-wrap justify-start">
                          {[...item.sizes].map((item) => (
                            <p
                              key={item.idSize}
                              className={clsx(
                                'w-6 h-6 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-[9px]'
                              )}
                            >
                              {item.name}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
                        onClick={() => stateStore.setValue('isDelete', item.product.idPro)}
                      >
                        Xóa
                      </button>
                      <button
                        type="button"
                        className="flex-1 items-center  py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        onClick={() => {
                          const names: Array<keyof ProductType> = [
                            'category',
                            'product',
                            'sizes',
                            'images'
                          ]

                          names.forEach((name) => {
                            dataForm.setValue(name, item[name])
                          })
                          stateStore.setValue('isModal', true)
                          stateStore.setValue('isEdit', true)
                        }}
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </div>
      <Controller
        name="isModal"
        control={stateStore.control}
        defaultValue={false}
        render={({ field }) => (
          <Modal
            size="3xl"
            handleClose={() => {
              dataForm.reset({})
              dataForm.setValue('images.0', '')
              dataForm.setValue('images.1', '')
              dataForm.setValue('images.2', '')
              dataForm.setValue('images.3', '')
              field.onChange(false)
            }}
            isOpen={field.value}
            title="Tạo sản phẩm"
          >
            <form
              className="space-y-6 h-full"
              onSubmit={dataForm.handleSubmit(handleSubmit, (error) => console.log(error))}
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex flex-col gap-4 px-2  !min-h-[300px] relative ">
                  <Controller
                    name="images.0"
                    control={dataForm.control}
                    defaultValue={''}
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          title="Mã ảnh sản phẩm 1"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )
                    }}
                  />
                  <Controller
                    name="images.1"
                    control={dataForm.control}
                    defaultValue={''}
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          title="Mã ảnh sản phẩm 2"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )
                    }}
                  />
                  <Controller
                    name="images.2"
                    control={dataForm.control}
                    defaultValue={''}
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          title="Mã ảnh sản phẩm 3"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )
                    }}
                  />
                  <Controller
                    name="images.3"
                    control={dataForm.control}
                    defaultValue={''}
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          title="Mã ảnh sản phẩm 4"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )
                    }}
                  />
                </div>
                <div className="flex-[1.5] flex flex-col md:flex-row gap-2 items-start ">
                  <div className="flex flex-col flex-1  gap-3 w-full">
                    <div>
                      <Controller
                        name="product.namePro"
                        defaultValue=""
                        control={dataForm.control}
                        render={({ field, fieldState }) => (
                          <TextField
                            title="Tên sản phẩm"
                            {...field}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phân loại
                      </label>
                      <Controller
                        name="sizes"
                        control={stateStore.control}
                        defaultValue={[]}
                        render={({ field: { value: sizes } }) => (
                          <Controller
                            name="sizes"
                            defaultValue={[]}
                            control={dataForm.control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                              <>
                                <div className="flex gap-1">
                                  {sizes.map((item) => (
                                    <p
                                      key={item.idSize}
                                      className={clsx(
                                        'w-7 h-7 rounded-md border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-xs',
                                        {
                                          'border-blue-500': value
                                            .map((size) => size.idSize)
                                            ?.includes(item.idSize)
                                        }
                                      )}
                                      onClick={() => onChange(xor(value, [item]))}
                                    >
                                      {item.name}
                                    </p>
                                  ))}
                                </div>
                                {!!error?.message && (
                                  <p className="text-red-400 text-[10px] absolute bottom-0 translate-y-4">
                                    {error?.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <Controller
                        name="product.price"
                        control={dataForm.control}
                        defaultValue={0}
                        render={({ field, fieldState }) => (
                          <TextField
                            title="Giá sản phẩm"
                            {...field}
                            type="number"
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="product.quantity"
                        defaultValue={0}
                        control={dataForm.control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="number"
                            title="Số lượng hàng"
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="categories"
                        control={stateStore.control}
                        defaultValue={[]}
                        render={({ field: { value: opts } }) => (
                          <Controller
                            name="category.idCat"
                            control={dataForm.control}
                            defaultValue=""
                            render={({ field, fieldState }) => (
                              <Select
                                {...field}
                                title="Phân loại"
                                options={opts.map((item) => ({
                                  label: item.name,
                                  value: item.idCat
                                }))}
                                errors={fieldState.error}
                                required
                              />
                            )}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 flex-1 w-full">
                    {/* <div>
                      <Controller
                        name=""
                        control={dataForm.control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <Select
                            {...field}
                            title="Giới tính"
                            options={[
                              {
                                label: 'Nữ',
                                value: 'women'
                              },
                              {
                                label: 'Nam',
                                value: 'men'
                              },
                              {
                                label: 'Cả 2',
                                value: 'all'
                              }
                            ]}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div> */}
                    <div>
                      <Controller
                        name="product.description"
                        control={dataForm.control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <TextAreaField
                            title="Mô tả"
                            {...field}
                            rows={6}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="product.details"
                        control={dataForm.control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <TextAreaField
                            title="Chi tiết sản phẩm"
                            {...field}
                            rows={4}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="product.highlights"
                        control={dataForm.control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <TextAreaField
                            title="Nổi bật"
                            {...field}
                            rows={4}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-1">
                <button
                  type="submit"
                  className="w-full max-w-xs m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                >
                  {!stateStore.getValues('isEdit') ? 'Tạo' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      />

      <Controller
        name="isDelete"
        control={stateStore.control}
        defaultValue=""
        render={({ field }) => (
          <Modal
            size="md"
            handleClose={() => {
              stateStore.setValue('isDelete', '')
            }}
            isOpen={!!field.value}
            title="Bạn có chắn chắn xóa sản phẩm này?"
          >
            <div className="flex justify-between gap-5">
              <button
                className="w-full max-w-xs m-auto text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => stateStore.setValue('isDelete', '')}
              >
                Không
              </button>
              <button
                className="w-full max-w-xs m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  deleteData(field.value)
                  stateStore.setValue('isDelete', '')
                }}
              >
                Xác nhận
              </button>
            </div>
          </Modal>
        )}
      />
    </div>
  )
}

export default Product
