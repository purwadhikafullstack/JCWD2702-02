import {
  MdAddHomeWork,
  MdOutlineModeEditOutline,
  MdDeleteForever,
} from 'react-icons/md'

export default function AddressModal(props: any) {
  return (
    <>
      <div className='card-actions justify-end'>
        <label
          htmlFor={props.html}
          className='flex h-full items-center justify-center font-bold text-eggplant hover:underline'
        >
          {/* <MdOutlineModeEditOutline size={20} /> */}
          {props.head}
        </label>
        <input type='checkbox' id={props.html} className='modal-toggle' />
        <div className='modal' role='dialog'>
          <div className='modal-box flex w-[300px] flex-col items-center justify-center gap-3'>
            <h1 className='font-bold'>{props.subject}</h1>
            <div
              onClick={props.fn}
              className='btn w-[200px] bg-eggplant text-white hover:bg-hover_eggplant'
            >
              {props.icon}
              {/* <MdDeleteForever size={20} /> */}
              {props.body}
            </div>
          </div>
          <label className='modal-backdrop' htmlFor={props.html}>
            Close
          </label>
        </div>
      </div>
    </>
  )
}
