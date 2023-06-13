'use client'
import { Product } from '@/components/templates'
import { HFLayout } from '@/layouts/Layouts'
import { getCategory, getCategoryByGender } from 'apis/apis'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ProductPage = () => {
  const stateStore = useForm({
    defaultValues: {
      categories: []
    }
  })
  const { query, isReady } = useRouter()
  useEffect(() => {
    if (isReady) {
      const gender = query.type as string
      if (gender) {
        getCategoryByGender(gender)
          .then((res) => {
            const data = res.data
            stateStore.setValue('categories', data)
          })
          .catch((error) => console.log(error))
      } else {
        getCategory()
          .then((res) => {
            const data = res.data
            stateStore.setValue('categories', data)
          })
          .catch((error) => console.log(error))
      }
    }
  }, [isReady, query.type])
  const props = {
    stateStore
  }
  return <Product {...props} />
}
ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <HFLayout>{page}</HFLayout>
}
export default ProductPage
