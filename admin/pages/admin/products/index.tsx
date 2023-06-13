'use client'
import { Product } from '@/components/templates'
import { deleteItem, deleteItemByField, update } from '@/firebase/base'
import { db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { schema } from '@/resolvers/product'
import { CatType, ProductType, SizeType } from '@/types/product'
import { yupResolver } from '@hookform/resolvers/yup'
import { createProduct, getAllProduct, getCategory, getProductsByCatId, getSize } from 'apis/apis'
import { collection } from 'firebase/firestore'
import { useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export type StateProductPageType = {
  products: Array<ProductType>
  isModal: boolean
  isEdit: boolean
  isDelete: string
  imagePreviews: any
  fileImageNews: Array<any>
  categories: Array<CatType>
  sizes: Array<SizeType>
}
const ProductPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [refresh, setRefresh] = useState(false)
  const tab = useSearchParams().get('tab') as any
  const stateStore = useForm<StateProductPageType>({
    defaultValues: {
      products: [],
      isModal: false,
      isEdit: false,
      isDelete: '',
      imagePreviews: null,
      fileImageNews: [],
      categories: [],
      sizes: []
    }
  })
  const dataForm = useForm<ProductType>({
    resolver: yupResolver(schema)
  })

  const addProduct = async (data: ProductType) => {
    const product = {
      idCat: data.category.idCat,
      ...data.product,
      sizes: data.sizes.map((size) => size.idSize),
      images: data.images
    }
    await createProduct(product)
      .then(async (id) => {
        console.log(id)
        enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' })

        setRefresh((cur) => !cur)
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar('Thêm sản phẩm lỗi', { variant: 'error' })
      })
  }

  const editProduct = (data: ProductType) => {
    const { category, product, sizes } = data
    console.log(product, sizes)

    const productRef = collection(db, 'products')
    update(productRef, '11', {
      category
    })
      .then(async () => {
        await enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        enqueueSnackbar('Cập nhật thất bại', { variant: 'error' })
      })
  }

  const deleteData = async (id: string) => {
    if (id) {
      await deleteItem('products', id)
        .then(async () => {
          await deleteItemByField('initStock', 'prod_id', id)
          enqueueSnackbar('Đã xóa thành công', { variant: 'success' })
          setRefresh((cur) => !cur)
        })
        .catch(() => {
          enqueueSnackbar('Lỗi', { variant: 'error' })
        })
    }
  }
  useEffect(() => {
    ;(async () => {
      await getCategory()
        .then((res) => {
          const data = res.data
          stateStore.setValue('categories', data)
        })
        .catch((error) => console.log(error))
      await getSize()
        .then((res) => {
          const data = res.data
          stateStore.setValue('sizes', data)
        })
        .catch((error) => console.log(error))
    })()
  }, [])
  useEffect(() => {
    dataForm.reset()
    stateStore.resetField('isModal')
    ;(tab === 'all' || !tab ? getAllProduct() : getProductsByCatId(tab)).then(async ({ data }) => {
      stateStore.setValue('products', data)
    })
  }, [refresh, tab])

  const props = {
    stateStore,
    dataForm,
    addProduct,
    editProduct,
    deleteData
  }
  return <Product {...props} />
}
ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default ProductPage
