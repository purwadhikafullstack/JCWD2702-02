import { MdEmail } from 'react-icons/md'
import { Form, Field } from 'formik'

export default function ResendVerification(props: any) {
  return (
    <Form>
      <div className='flex h-screen items-center justify-center p-[100px]'>
        <div className='flex h-[400px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl'>
          <div className='flex flex-col gap-[25px]'>
            <div className='text-[25px] font-bold'>{props.subject}</div>
          </div>
          <div className='flex w-full flex-col gap-10'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center font-bold'>
                Email*
                <MdEmail />
              </div>
              <div>
                <label className='input input-bordered flex w-full items-center gap-2'>
                  <Field
                    type='text'
                    className='grow'
                    placeholder='Email'
                    name='email'
                  />
                </label>
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col'>
            <button
              type='submit'
              className='rounded-m bg-cerulean btn flex w-full justify-center bg-eggplant text-white hover:bg-hover_eggplant'
              disabled={!(props.dirty && props.isValid)}
            >
              Verify
            </button>
            <div className='divider'></div>
          </div>
        </div>
      </div>
    </Form>
  )
}
