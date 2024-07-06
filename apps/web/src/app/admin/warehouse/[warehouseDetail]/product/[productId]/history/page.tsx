'use client'
import { useState, useEffect } from 'react'
import { useGetWarehouseDetail } from '@/helpers/adminWarehouse/hooks/useGetWarehouseDetail'
import { useGetStockHistoryByProductAndWarehouse } from '@/helpers/adminWarehouse/hooks/useGetStockHistoryByProductAndWarehouse'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IoIosArrowBack } from 'react-icons/io'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import Head from 'next/head'

export default function ProductHistoryPerWarehouse({
  params,
}: {
  params: { warehouseDetail: string; productId: string }
}) {
  const navigate = useRouter()

  const { dataWarehouseDetail, isError } = useGetWarehouseDetail(
    params.warehouseDetail
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [monthAndYear, setMonthAndYear] = useState<string>('')

  useEffect(() => {
    if (selectedDate) {
      setMonthAndYear(
        `month=${selectedDate.getMonth() + 1}&year=${selectedDate.getFullYear()}`
      )
    } else {
      setMonthAndYear('')
    }
  }, [selectedDate])

  const {
    dataStockHistoryByProductAndWarehouse,
    refetchDataStockHistoryByProductAndWarehouse,
  } = useGetStockHistoryByProductAndWarehouse(
    params.productId,
    params.warehouseDetail,
    monthAndYear?.toString()
  )

  const handleClearFilters = () => {
    setSelectedDate(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    }
    return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString(undefined, timeOptions)}`
  }

  useEffect(() => {
    if (isError) navigate.back()
  }, [isError])

  if (
    dataStockHistoryByProductAndWarehouse === undefined ||
    dataWarehouseDetail === undefined ||
    dataStockHistoryByProductAndWarehouse.stockHistory === undefined
  )
    return <div>Loading...</div>

  const stockMoveDetails = (
    <div>
      {dataStockHistoryByProductAndWarehouse && (
        <>
          {dataStockHistoryByProductAndWarehouse.toSum !== undefined && (
            <div className='mt-2 flex gap-1 text-[15px] font-bold'>
              <div>Stock In:</div>
              <div className='ml-2 text-green-600'>
                {dataStockHistoryByProductAndWarehouse.toSum ?? 0} Units
              </div>
            </div>
          )}
          {dataStockHistoryByProductAndWarehouse.fromSum !== undefined && (
            <div className='mt-2 flex gap-1 text-[15px] font-bold'>
              <div>Stock Out:</div>
              <div className='ml-2 text-red-600'>
                {dataStockHistoryByProductAndWarehouse.fromSum ?? 0} Units
              </div>
            </div>
          )}
          {dataStockHistoryByProductAndWarehouse.currentStock !== undefined && (
            <div className='mt-2 flex gap-1 text-[15px] font-bold'>
              <div>Stock Report:</div>
              <div
                className={
                  dataStockHistoryByProductAndWarehouse.currentStock >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {dataStockHistoryByProductAndWarehouse.currentStock ?? 0} Units
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )

  return (
    <div className='container mx-auto max-h-[95vh] overflow-y-auto rounded-md border border-gray-300 p-4 shadow-lg'>
      <Head>
        <title>
          {dataStockHistoryByProductAndWarehouse.product.name} Stock Mutation
          History
        </title>
        <meta
          name='description'
          content={`View stock mutation history for ${dataStockHistoryByProductAndWarehouse.product.name} in ${dataWarehouseDetail?.name}, ${dataWarehouseDetail?.province}, ${dataWarehouseDetail?.city}`}
        />
      </Head>
      <div className='flex flex-col'>
        <div className='mb-4 flex flex-row items-center justify-between gap-4'>
          <div>
            <div className='breadcrumbs text-sm'>
              <ul>
                <li className='flex gap-2'>
                  <Link
                    className='hover:text-eggplant'
                    href={`/admin/warehouse/${params.warehouseDetail}`}
                  >
                    <IoIosArrowBack />
                    {dataWarehouseDetail?.name}
                  </Link>
                </li>
                <li>Stock Mutation History</li>
                <li>{dataStockHistoryByProductAndWarehouse.product.name}</li>
              </ul>
            </div>
            <div className='text-[30px] font-bold'>
              {dataStockHistoryByProductAndWarehouse.product.name}
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <div className='text-center text-[15px] font-bold text-[#704b66]'>
              {dataWarehouseDetail?.name}
            </div>
            <div className='text-[12px] font-bold text-gray-500'>
              {dataWarehouseDetail?.province}, {dataWarehouseDetail?.city}
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='mb-4 flex items-center gap-4'>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date as Date)}
              dateFormat='MM/yyyy'
              showMonthYearPicker
              placeholderText='Select Month and Year'
              className='rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-eggplant focus:outline-none focus:ring-eggplant'
            />
            <button
              className='hover:bg-eggplant-dark rounded bg-eggplant px-4 py-2 font-bold text-white'
              onClick={() => refetchDataStockHistoryByProductAndWarehouse()}
            >
              Apply Filters
            </button>
            <button
              className='rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400'
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
          <div className='flex justify-end gap-4'>
            <Popover
              title='Stock Moves'
              placement='bottom'
              content={stockMoveDetails}
            >
              <Button className='border border-eggplant text-eggplant'>
                Stock Move Details
              </Button>
            </Popover>
          </div>
        </div>
      </div>
      <table className='min-w-full'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-2 text-left'>ID</th>
            <th className='px-4 py-2 text-left'>Date Adjusted</th>
            <th className='px-4 py-2 text-left'>From</th>
            <th className='px-4 py-2 text-left'>To</th>
            <th className='px-4 py-2 text-right'>Quantity</th>
            <th className='px-4 py-2 text-left'>UoM</th>
            <th className='px-4 py-2 text-center'>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataStockHistoryByProductAndWarehouse.stockHistory.length === 0 ? (
            <tr>
              <td colSpan={7} className='px-4 py-2 text-center text-gray-500'>
                No stock mutation history found for the selected date.
              </td>
            </tr>
          ) : (
            dataStockHistoryByProductAndWarehouse.stockHistory.map(
              (
                item: {
                  id: number
                  createdAt: string
                  from: { name: string; warehouse: { name: string } }
                  to: { name: string; warehouse: { name: string } }
                  quantity: number
                  status: string
                },
                index: number
              ) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}
                >
                  <td className='px-4 py-2 text-left text-[14px]'>{item.id}</td>
                  <td className='px-4 py-2 text-left text-[14px]'>
                    {formatDate(item.createdAt)}
                  </td>
                  <td className='px-4 py-2 text-left text-[14px]'>
                    {item.from.warehouse?.name
                      ? `${item.from.warehouse?.name}/`
                      : ''}
                    {item.from.name}
                  </td>
                  <td className='px-4 py-2 text-left text-[14px]'>
                    {item.to.warehouse?.name
                      ? `${item.to.warehouse.name}/`
                      : ''}
                    {item.to.name}
                  </td>
                  <td
                    className={`px-4 py-2 text-right text-[14px] ${item.status === 'REJECTED' ? 'text-black' : ''} ${item.from.warehouse?.name === dataWarehouseDetail?.name && item.status === 'ACCEPTED' ? 'text-red-500' : ''} ${item.to.warehouse?.name === dataWarehouseDetail?.name && item.status === 'ACCEPTED' ? 'text-green-500' : ''}`}
                  >
                    {item.from.warehouse?.name === dataWarehouseDetail?.name
                      ? `-${item.quantity}.00`
                      : `${item.quantity}.00`}
                  </td>
                  <td className='px-4 py-2 text-left text-[14px]'>Units</td>
                  <td
                    className={`w-[2px] px-4 py-2 text-center text-[14px] ${item.status === 'ACCEPTED' ? 'px-2 py-1 font-bold text-[#4CAF50]' : ''} ${item.status === 'REJECTED' ? 'px-2 py-1 font-bold text-[#F44336]' : ''} ${item.status === 'PENDING' ? 'px-2 py-1 font-bold text-yellow-400' : ''}`}
                  >
                    {item.status}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  )
}
