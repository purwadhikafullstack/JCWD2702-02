'use client'

import {
  MdAddHomeWork,
  MdOutlineModeEditOutline,
  MdDeleteForever,
} from 'react-icons/md'
import { useMainAddress } from './../../../../helpers/address/hooks/useMainAddress'
import { useDeleteAddress } from '@/helpers/address/hooks/useDeleteMutation'

export default function AddressBox(props: any) {
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
      <figure></figure>
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
        <div className='card-actions justify-end'>
          <label
            htmlFor={props.html}
            className='btn flex items-center justify-center bg-eggplant text-white hover:bg-hover_eggplant'
          >
            <MdOutlineModeEditOutline size={20} />
            Edit Address
          </label>
          <input type='checkbox' id={props.html} className='modal-toggle' />
          <div className='modal' role='dialog'>
            <div className='modal-box flex w-[300px] flex-col items-center justify-center gap-3'>
              <h1 className='font-bold'>Edit Your Address</h1>
              {props.main == 'TRUE' ? null : (
                <div
                  onClick={handleMainAddressMutation}
                  className='btn w-[200px] bg-eggplant text-white hover:bg-hover_eggplant'
                >
                  <MdAddHomeWork className='text-white' /> Make Main Address
                </div>
              )}
              <div
                onClick={handleDeleteAddressMutation}
                className='btn w-[200px] bg-eggplant text-white hover:bg-hover_eggplant'
              >
                <MdDeleteForever size={20} />
                Delete Address
              </div>
            </div>
            <label className='modal-backdrop' htmlFor={props.html}>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
