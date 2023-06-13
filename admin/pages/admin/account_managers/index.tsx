'use client'

import { columnTableAccountManagers } from '@/components/makecolumns'
import { AccountManagers } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { AccountType } from '@/types/account'
import { createEmployee, deleteEmployee, getEmployee, updateEmployeeRole } from 'apis/apis'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateAccountManagersType = {
  accounts: Array<AccountType>
  isModal: boolean
}
const AccountManagersPage = () => {
  const [refresh, setRefresh] = useState(false)

  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const onDelete = async (id: string) => {
    await deleteEmployee(id)
      .then(() => {
        onRefresh()
      })
      .catch()
  }
  const onUpdate = async (id: string, role: string) => {
    await updateEmployeeRole(id, role)
      .then(() => {
        enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
        onRefresh()
      })
      .catch()
  }

  const columns = columnTableAccountManagers({ onDelete, onUpdate })
  const dispatch = useDispatch()
  const stateStore = useForm<StateAccountManagersType>({
    defaultValues: {
      isModal: false,
      accounts: []
    }
  })
  const dataForm = useForm<AccountType>()
  const addAccount = (data: AccountType) => {
    createEmployee(data).then(async () => {
      dataForm.reset()
      stateStore.reset()
      onRefresh()
    })
  }

  useEffect(() => {
    dispatch(setLoading({ status: true }))
    getEmployee().then(({ data }) => {
      console.log(data)
      stateStore.setValue('accounts', data)
      dispatch(closeLoading())
    })
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    addAccount
  }

  return <AccountManagers {...props} />
}
AccountManagersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AccountManagersPage
