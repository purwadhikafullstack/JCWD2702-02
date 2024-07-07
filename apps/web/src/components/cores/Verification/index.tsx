'use client'
import { Field, ErrorMessage } from 'formik'

export default function VerificationComponent(props: any) {
  return (
    <div className='flex h-fit items-center justify-center p-[100px]'>
      <div className='flex h-[500px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
        <div className='flex flex-col gap-[25px]'>
          <div className='text-[25px] font-bold'>{props.header}</div>
        </div>
        <div className='flex w-full flex-col gap-10'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center font-bold'>
              {props.labelVal1}
              {props.iconVal1}
            </div>
            <div>
              <label className='input input-bordered flex w-full items-center gap-2'>
                <Field
                  type={props.type}
                  className='grow'
                  placeholder={props.placeholdeVal1}
                  name={props.initVal1}
                />
              </label>
              <ErrorMessage
                name={props.initVal1}
                component='div'
                className='text-red-500'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center font-bold'>
              {props.labelVal2}
              {props.iconVal2}
            </div>
            <div>
              <label className='input input-bordered flex w-full items-center gap-2'>
                <Field
                  type={props.type}
                  className='grow'
                  placeholder={props.placeholdeVal2}
                  name={props.initVal2}
                />
              </label>
              <ErrorMessage
                name={props.initVal2}
                component='div'
                className='text-red-500'
              />
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <button
            type='submit'
            className='rounded-m bg-cerulean btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
            disabled={!(props.dirty && props.isValid)}
          >
            Submit
          </button>
          <div className='divider'></div>
        </div>
      </div>
    </div>
  )
}
