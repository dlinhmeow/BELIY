'use client'

import { columnTableInvoiceManagers } from '@/components/makecolumns'
import { InvoiceManagers } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { OrderType } from '@/types/orders'
import { getAllOrder } from 'apis/apis'
import { ReactElement, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export type StateInvoiceManagersPageType = {
  datasets: Array<OrderType>
}
const InvoiceManagersPage = () => {
  const onUpdate = () => {
    getAllOrder()
      .then(({ data }) => {
        stateStore.setValue('datasets', data)
        dispatch(closeLoading())
      })
      .catch(() => dispatch(closeLoading()))
  }
  const columns = useMemo(() => columnTableInvoiceManagers({ onUpdate }), [])
  const dispatch = useDispatch()
  const stateStore = useForm<StateInvoiceManagersPageType>({
    defaultValues: {
      datasets: []
    }
  })
  useEffect(() => {
    dispatch(setLoading({ status: true, title: 'Loading...', mode: 'default' }))
    getAllOrder()
      .then(({ data }) => {
        stateStore.setValue('datasets', data)
        dispatch(closeLoading())
      })
      .catch(() => dispatch(closeLoading()))
  }, [])
  const props = {
    columns,
    stateStore
  }

  return <InvoiceManagers {...props} />
}
InvoiceManagersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default InvoiceManagersPage
