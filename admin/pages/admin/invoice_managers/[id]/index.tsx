'use client'

import { InvoiceDetail } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { ReactElement } from 'react'

const InvoiceDetailPage = () => {
  return <InvoiceDetail data={null} />
}
InvoiceDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default InvoiceDetailPage
