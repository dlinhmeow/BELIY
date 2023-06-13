'use client'
import { ProductOverview } from '@/components/templates'
import { HFLayout } from '@/layouts/Layouts'
import { addCart } from '@/redux/features/slices/cart'
import { RootState } from '@/redux/features/store'
import { ProductType } from '@/types/product'
import { getProductById, updateReview } from 'apis/apis'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductOverviewPage = () => {
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const { query } = useRouter()
  const [data, setData] = useState<ProductType>()
  const user = useSelector((state: RootState) => state.user)

  const addToCart = (product: ProductType) => {
    // Product does not exist in the cart, add new product
    const newProduct = product
    dispatch(addCart(newProduct))
  }
  const addRatting = async (rate: number) => {
    if (!user.id) {
      enqueueSnackbar('Để đánh giá bạn cần phải đăng nhập', { variant: 'warning' })
      return
    }
    updateReview({ idPro: data.product.idPro, idUser: user.id, ratting: rate })
      .then(({ data }) => {
        enqueueSnackbar(data?.message, { variant: 'success' })
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        enqueueSnackbar('Không thể đánh giá', { variant: 'success' })
      })

    // const rattingRef = collection(db, 'rattings')
    // findAll(rattingRef, [
    //   ['productid', query?.id as any],
    //   ['uid', user.email as any]
    // ]).then(async (rattings) => {
    //   if (!rattings?.length) {
    //     await create(rattingRef, { uid: user.email, rate, productid: data.product.id })
    //       .then(() => {
    //         enqueueSnackbar('Đánh giá đã được gửi tới Beliy', { variant: 'success' })
    //       })
    //       .catch()
    //   } else {
    //     const rattingid = (rattings[0] as any).id
    //     await update(rattingRef, rattingid, { rate })
    //       .then(() => {
    //         enqueueSnackbar('Đánh giá đã được cập nhật', { variant: 'success' })
    //       })
    //       .catch()
    //   }
    //   setRefresh((cur) => !cur)
    // })
  }
  useEffect(() => {
    if (query?.id) {
      const id = query?.id

      getProductById(id).then(async (res) => {
        const product = res.data
        const ratting = {
          average: 0,
          totalCount: 0
        }
        ratting.totalCount = product.reviews?.length || 0
        const avg =
          Number(
            product.reviews?.reduce((total: number, item) => {
              return total + Number(item?.ratting)
            }, 0)
          ) / ratting.totalCount || 1
        ratting.average = avg
        setData({
          ...product,
          totalReview: ratting.totalCount,
          avgReview: ratting.average
        })
      })
    }
  }, [JSON.stringify(query?.id), refresh])

  const props = {
    addToCart,
    addRatting,
    data
  }
  return <ProductOverview {...props} />
}
ProductOverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <HFLayout>{page}</HFLayout>
}
export default ProductOverviewPage
