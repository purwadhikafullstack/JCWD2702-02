export default function UserModal(props: any) {
  return (
    <div>
      <label htmlFor={props.id} className='font-bold hover:underline'>
        {props.link}
      </label>
      <input type='checkbox' id={props.id} className='modal-toggle' />
      <div className='modal' role='dialog'>
        <div className='modal-box flex h-[200px] w-[350px] flex-col items-center justify-center gap-3'>
          <h3 className='text-lg font-bold'>{props.header}</h3>
          <p>Click outside the box to close</p>
          <div className='modal-action'>
            <label
              onClick={props.fn}
              htmlFor={props.id}
              className='btn bg-eggplant text-white hover:bg-hover_eggplant'
            >
              Confirm
            </label>
          </div>
        </div>
        <label className='modal-backdrop' htmlFor={props.id}>
          Close
        </label>
      </div>
    </div>
  )
}
