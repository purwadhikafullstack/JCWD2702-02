'use client'

import { MdAddHomeWork, MdDeleteForever } from 'react-icons/md'
import { useMainAddress } from './../../../../helpers/address/hooks/useMainAddress'
import { useDeleteAddress } from '@/helpers/address/hooks/useDeleteMutation'
import { useRouter } from 'next/navigation'
import AddressModal from './AddressModal'
import Loading from '../../Loading'

export default function AddressBox(props: any) {
  const navigate = useRouter()
  const addressId = props.id
  const { mutationMainAddress } = useMainAddress()
  const { mutationDeleteAddress } = useDeleteAddress()

  const handleMainAddressMutation = () => {
    mutationMainAddress({ addressId: addressId })
  }

  const handleDeleteAddressMutation = () => {
    mutationDeleteAddress({ addressId: addressId })
  }

  return (
    <div key={props.key} className='card card-side bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>
          {props.recipients}{' '}
          {props.main == 'TRUE' ? (
            <span className='badge badge-info bg-eggplant text-white'>
              Main
            </span>
          ) : null}
        </h2>{' '}
        <p>{props.phoneNumber}</p>
        <p>{props.province}</p>
        <p>{props.city}</p>
        <p>{props.address}</p>
        <div className='flex justify-end gap-2'>
          {props.main != 'TRUE' ? (
            <>
              <AddressModal
                html={'main'}
                head={'Make Main Address'}
                subject={'Make main address'}
                fn={handleMainAddressMutation}
                body={'Submit'}
                icon={<MdAddHomeWork size={20} />}
              />
              <div className='flex h-full items-center justify-center text-eggplant'>
                |
              </div>
            </>
          ) : null}
          <AddressModal
            html={'delete_address'}
            head={'Delete'}
            subject={'Are you sure want to delete?'}
            fn={handleDeleteAddressMutation}
            body={'Delete'}
            icon={<MdDeleteForever size={20} />}
          />
          <div className='flex h-full items-center justify-center text-eggplant'>
            |
          </div>
          <label
            onClick={() => navigate.push(`/dashboard/address/${addressId}`)}
            className='flex h-full items-center justify-center font-bold text-eggplant hover:underline'
          >
            Edit Address
          </label>
        </div>
      </div>
    </div>
  )
}
