'use client'

export default function DropDown() {
  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        role='button'
        className='btn m-1 flex h-[10px] w-[100px] items-center justify-center rounded-md border-2 border-regent_gray bg-regent_gray font-bold text-white hover:border-bombay hover:bg-bombay'
      >
        Click
      </div>
      <ul
        tabIndex={0}
        className='menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow'
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  )
}
