'use client'

import { columnTableAccountCustomerManagers } from '@/components/makecolumns'
import AccountCustomers from '@/components/templates/AccountCustomers'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { AccountType } from '@/types/account'
import { deleteCustomer, getCustomer } from 'apis/apis'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateAccountCustomersType = {
  customers: Array<AccountType>
  isModal: boolean
}
const AccountCustomersPage = () => {
  const [refresh, setRefresh] = useState(false)

  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const onDelete = async (id: string) => {
    await deleteCustomer(id).then(() => onRefresh())
  }
  const columns = columnTableAccountCustomerManagers({ onDelete })
  const dispatch = useDispatch()
  const stateStore = useForm<StateAccountCustomersType>({
    defaultValues: {
      isModal: false,
      customers: []
    }
  })
  const dataForm = useForm<AccountType>()

  useEffect(() => {
    dispatch(setLoading({ status: true }))
    getCustomer()
      .then(({ data }) => {
        stateStore.setValue('customers', data)
        dispatch(closeLoading())
      })
      .catch(() => {
        dispatch(closeLoading())
      })
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm
  }

  return <AccountCustomers {...props} />
}
AccountCustomersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AccountCustomersPage
