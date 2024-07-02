import { ReactNode } from 'react'

interface TransactionModalProps {
  html: string
  head: string
  subject: string
  fn?: () => void
  icon?: ReactNode
  body: string
  href?: string
}

export default function TransactionModal(props: TransactionModalProps) {
  return (
    <>
      <div className='card-actions justify-end'>
        <label
          htmlFor={props.html}
          className='flex h-full items-center justify-center font-bold text-eggplant hover:underline'
        >
          {props.head}
        </label>
        <input type='checkbox' id={props.html} className='modal-toggle' />
        <div className='modal' role='dialog'>
          <div className='modal-box flex w-[300px] flex-col items-center justify-center gap-3'>
            <h1 className='font-bold'>{props.subject}</h1>
            <p>{props.href}</p>
            <a
              href={props.href}
              target='_blank'
              className='flex h-full cursor-pointer items-center justify-center font-bold text-eggplant underline hover:text-hover_eggplant'
            >
              {props.body}
            </a>
          </div>
          <label className='modal-backdrop' htmlFor={props.html}>
            Close
          </label>
        </div>
      </div>
    </>
  )
}
