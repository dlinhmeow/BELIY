'use client'
import { columnTableCategories } from '@/components/makecolumns'
import { Categories } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { schema } from '@/resolvers/stock_categories'
import { CatType } from '@/types/product'
import { yupResolver } from '@hookform/resolvers/yup'
import { addCategory, deleteCategory, getCategory } from 'apis/apis'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CategoriesPage = () => {
  const deleteData = async (id: string) => {
    if (id) {
      await deleteCategory(id)
        .then(() => {
          enqueueSnackbar('Đã xóa thành công', { variant: 'success' })
          setRefresh((cur) => !cur)
        })
        .catch(() => {
          enqueueSnackbar('Lỗi', { variant: 'error' })
        })
    }
  }
  const columns = columnTableCategories({ deleteData })
  const [refresh, setRefresh] = useState(false)
  const stateStore = useForm({
    defaultValues: {
      isModal: false,
      dataTable: []
    }
  })
  const dataForm = useForm<CatType>({
    resolver: yupResolver(schema)
  })

  const addCategories = async (data: CatType) => {
    const cat = {
      ...data,
      IDParent: 1
    }
    await addCategory(cat)
      .then(() => {
        enqueueSnackbar('Tạo phân loại thành công', { variant: 'success' })
        dataForm.reset()
        stateStore.reset()
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        enqueueSnackbar('Tạo phân loại thất bại', { variant: 'error' })
      })
  }

  useEffect(() => {
    getCategory()
      .then(({ data }) => {
        stateStore.setValue('dataTable', data)
      })
      .catch((error) => console.log(error))
  }, [refresh])

  const props = {
    columns,
    dataForm,
    stateStore,
    addCategories
  }
  return <Categories {...props} />
}
CategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default CategoriesPage
