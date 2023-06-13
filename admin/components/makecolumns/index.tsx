import { ColumnDef } from '@tanstack/react-table'
import { stockInCharge, updateStatusOrder } from 'apis/apis'
import clsx from 'clsx'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'
import { MdAdminPanelSettings, MdDelete, MdPayment } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import { Select } from '../atoms'
import Checkbox from '../atoms/Checkbox/Checkbox'
interface ColumnTableAccountManagersProps {
  openModel?: () => void
  onUpdate?: (id: string, role: string) => void
  onDelete?: (id: string) => void
}
export const columnTableAccountManagers = ({
  onDelete,
  onUpdate
}: ColumnTableAccountManagersProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'ID',
      accessorKey: 'idEmp',
      size: 120,
      cell: (info) => info.getValue().slice(0, 4)
    },
    {
      header: 'TÊN ĐẦY ĐỦ',
      accessorKey: 'name',
      size: 120
    },
    {
      header: 'EMAIL',
      accessorKey: 'email',
      size: 120
    },
    {
      header: 'TỈNH THÀNH',
      accessorKey: 'address',
      size: 160
    },
    {
      header: 'SỐ ĐIỆN THOẠI',
      accessorKey: 'phone',
      size: 120
    },
    {
      header: 'QUYỀN',
      accessorKey: 'role',
      size: 80,
      cell: (info) => {
        const {
          row: { original },
          getValue
        } = info
        return (
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 disabled:opacity-50 relative"
              onClick={() => onUpdate(original.idEmp, 'employee')}
              disabled={getValue() === 'employee'}
            >
              <IoIosPeople size={18} />
              {getValue() === 'employee' && (
                <span className="absolute -top-[5px] -left-[5px]">
                  <BsFillCheckCircleFill size={14} color="green" />
                </span>
              )}
            </button>
            <button
              type="button"
              className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 disabled:opacity-50 relative"
              onClick={() => onUpdate(original.idEmp, 'admin')}
              disabled={getValue() === 'admin'}
            >
              <MdAdminPanelSettings size={18} />
              {getValue() === 'admin' && (
                <span className="absolute -top-[5px] -left-[5px]">
                  <BsFillCheckCircleFill size={14} color="green" />
                </span>
              )}
            </button>
          </div>
        )
      }
    },
    {
      header: 'Xóa',
      accessorKey: 'idEmp',
      size: 54,
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-600"
          >
            <MdDelete size={16} onClick={() => onDelete(info.getValue())} />
          </button>
        </div>
      )
    }
  ]
}
export const columnTableAccountCustomerManagers = ({
  onDelete
}: ColumnTableAccountManagersProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'ID',
      accessorKey: 'idCus',
      size: 120
    },
    {
      header: 'EMAIL',
      accessorKey: 'email',
      size: 120
    },
    {
      header: 'USERNAME',
      accessorKey: 'username',
      size: 120
    },
    {
      header: 'Xóa',
      accessorKey: 'idCus',
      size: 54,
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-600"
          >
            <MdDelete size={16} onClick={() => onDelete(info.getValue())} />
          </button>
        </div>
      )
    }
  ]
}
// addressNumber: string
// award: string
// checkoutId: string
// district: string
// email: string
// name: string
type ColumnTableInvoiceManagersProps = {
  onUpdate: () => void
}
export const columnTableInvoiceManagers = ({
  onUpdate
}: ColumnTableInvoiceManagersProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'NGÀY TẠO',
      accessorKey: 'orderDate',
      size: 120,
      cell: (info) => info?.getValue()?.toString()?.split('T')?.[0]
    },
    {
      header: 'TÊN ĐẦY ĐỦ',
      accessorKey: 'name',
      size: 120
    },
    {
      header: 'ĐỊA CHỈ',
      accessorKey: 'deliveryAddress',
      size: 190,
      minSize: 180,
      cell: (info) => {
        return <p className="min-w-[200px]">{info.getValue()}</p>
      }
    },
    {
      header: 'SỐ ĐIỆN THOẠI',
      accessorKey: 'phone',
      size: 120
    },
    {
      header: 'PHƯƠNG THỨC',
      accessorKey: 'paymentMethod',
      size: 120,
      cell: (info) => (
        <div className="flex gap-2">
          <button
            type="button"
            className={clsx(
              'w-8 h-8  opacity-25 items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800',
              {
                '!opacity-100': info.getValue() === 'payment_on_delivery'
              }
            )}
          >
            <TbTruckDelivery color="white" size={16} />
          </button>

          <button
            className={clsx(
              'w-8 h-8  opacity-25 py-2 px-2 flex gap-1 justify-center items-center text-sm rounded-md font-medium text-blue-50 bg-[#cc2684]',
              {
                '!opacity-100': info.getValue() === 'momo'
              }
            )}
          >
            <svg
              className="scale-90"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5888 0C10.7047 0 9.17752 1.61509 9.17752 3.60755C9.17752 5.59999 10.7047 7.2151 12.5888 7.2151C14.4728 7.2151 16 5.59999 16 3.60755C16 1.61509 14.4728 0 12.5888 0ZM12.5888 5.14717C11.7895 5.14717 11.1401 4.46038 11.1401 3.6151C11.1401 2.7698 11.7895 2.08302 12.5888 2.08302C13.3881 2.08302 14.0375 2.7698 14.0375 3.6151C14.0375 4.46038 13.3881 5.14717 12.5888 5.14717ZM8.19268 2.70943V7.22263H6.23015V2.6868C6.23015 2.34716 5.97324 2.07546 5.6521 2.07546C5.33095 2.07546 5.07403 2.34716 5.07403 2.6868V7.22263H3.1115V2.6868C3.1115 2.34716 2.8546 2.07546 2.53345 2.07546C2.21232 2.07546 1.9554 2.34716 1.9554 2.6868V7.22263H0V2.70943C0 1.21509 1.14897 0 2.562 0C3.14005 0 3.66815 0.203773 4.09635 0.543396C4.52453 0.203773 5.05977 0 5.63068 0C7.04372 0 8.19268 1.21509 8.19268 2.70943ZM12.5888 8.77735C10.7047 8.77735 9.17752 10.3925 9.17752 12.3849C9.17752 14.3774 10.7047 15.9924 12.5888 15.9924C14.4728 15.9924 16 14.3774 16 12.3849C16 10.3925 14.4728 8.77735 12.5888 8.77735ZM12.5888 13.9245C11.7895 13.9245 11.1401 13.2377 11.1401 12.3924C11.1401 11.5472 11.7895 10.8604 12.5888 10.8604C13.3881 10.8604 14.0375 11.5472 14.0375 12.3924C14.0375 13.2377 13.3881 13.9245 12.5888 13.9245ZM8.19268 11.4868V16H6.23015V11.4641C6.23015 11.1245 5.97324 10.8528 5.6521 10.8528C5.33095 10.8528 5.07403 11.1245 5.07403 11.4641V16H3.1115V11.4641C3.1115 11.1245 2.8546 10.8528 2.53345 10.8528C2.21232 10.8528 1.9554 11.1245 1.9554 11.4641V16H0V11.4868C0 9.99245 1.14897 8.77735 2.562 8.77735C3.14005 8.77735 3.66815 8.98113 4.09635 9.32075C4.52453 8.98113 5.05263 8.77735 5.63068 8.77735C7.04372 8.77735 8.19268 9.99245 8.19268 11.4868Z"
                fill="white"
              />
            </svg>
          </button>

          <button
            type="button"
            className={clsx(
              'inline-flex opacity-25 items-center py-2 px-2 text-xs font-medium text-center text-white bg-emerald-500 rounded-lg focus:ring-4 focus:ring-ebg-emerald-500 hover:bg-emerald-700',
              {
                '!opacity-100': info.getValue() === 'banking'
              }
            )}
          >
            <MdPayment size={18} />
          </button>
        </div>
      )
    },
    {
      header: 'CHỈ ĐỊNH',
      accessorKey: 'stock',
      size: 80,
      cell: (info) => {
        const {
          row: { original }
        } = info
        const id = original.idOrder
        const nameStock = original.nameStock
        const handleStockInCharge = async (idStock: string) => {
          if (id) {
            stockInCharge(idStock, id)
              .then(({ data }) => {
                enqueueSnackbar(data.message, { variant: 'success' })
                onUpdate()
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }

        return (
          <Select
            options={[
              {
                label: 'HCM',
                value: 'hcm'
              }
            ]}
            value={nameStock}
            onChange={(e) => handleStockInCharge(e.target.value)}
            name=""
          />
        )
      }
    },
    {
      header: 'THANH TOÁN',
      accessorKey: 'status',
      size: 80,
      cell: (info) => (
        <p
          className={clsx(
            'inline-flex items-center py-1.5 px-3 text-xs font-medium text-center rounded-full text-white',
            {
              'bg-blue-700': !(info?.getValue() === 'isCharged'),
              'bg-emerald-400': info?.getValue() === 'isCharged'
            }
          )}
        >
          {info?.getValue() === 'isCharged' ? 'Thanh toán' : 'Đang chờ'}
        </p>
      )
    },
    {
      header: 'TUỲ CHỌN',
      accessorKey: 'actions',
      size: 84,
      cell: (info) => {
        const {
          row: { original }
        } = info
        return (
          <div className="flex gap-2">
            <Link href={`/admin/invoice_managers/${original.checkoutId}`}>
              <span
                className={clsx(
                  'inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800'
                )}
              >
                <FaEye size={16} />
              </span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-600"
            >
              <MdDelete size={16} />
            </button>
          </div>
        )
      }
    },
    {
      header: 'ĐÃ TRẢ',
      accessorKey: 'isCharge',
      size: 80,
      cell: (info) => {
        const {
          row: { original }
        } = info
        const id = original.idOrder
        const handleToggleStatusCharge = async (status: boolean) => {
          if (id) {
            updateStatusOrder(!!status, id)
              .then(() => {
                console.log('ok')
                onUpdate()
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }

        return (
          <div className="flex gap-2">
            <Checkbox
              checked={info.getValue()}
              onChange={(e) => handleToggleStatusCharge(e.target.checked)}
            />
          </div>
        )
      }
    }
  ]
}

interface ColumnTableCategoriesProps {
  deleteData: (id: string) => void
}
export const columnTableCategories = ({
  deleteData
}: ColumnTableCategoriesProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Mã phân loại',
      accessorKey: 'idCat',
      size: 120
    },
    {
      header: 'Tên phân loại',
      accessorKey: 'name',
      size: 120
    },

    {
      header: 'Xóa',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => (
        <button
          type="button"
          onClick={() => deleteData(original?.idCat)}
          className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
        >
          Xóa
        </button>
      )
    }
  ]
}
type ColumnTableEmployeeManagersProps = {
  onDelete: (id: string) => void
}
export const columnTableEmployeeManagers = ({
  onDelete
}: ColumnTableEmployeeManagersProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Mã nhân viên',
      accessorKey: 'id',
      size: 120
    },
    {
      header: 'Tên nhân viên',
      accessorKey: 'name',
      size: 120
    },
    {
      header: 'Địa chỉ',
      accessorKey: 'address',
      size: 120
    },
    {
      header: 'Vị trí',
      accessorKey: 'position',
      size: 120
    },
    {
      header: 'Xóa',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => (
        <button
          type="button"
          onClick={() => onDelete(original?.id)}
          className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
        >
          Xóa
        </button>
      )
    }
  ]
}
