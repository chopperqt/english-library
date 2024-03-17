import {
  ChangeEvent,
  forwardRef,
} from 'react'
import Spin from './spin'

const LAYOUT_STYLES = "relative flex items-center justify-center w-full"
const DEFAULT_STYLE = "w-full px-2 py-1 outline-transparent text-lg focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-2 border-gray-300 rounded-md"
const SPIN_WRAP_STYLES = "absolute right-[5px]"

interface InputProps extends React.ComponentProps<'input'> {
  control?: any
  name: string
  value?: string
  isLoading?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const Input = forwardRef(({
  control,
  value = '',
  onChange,
  isLoading = false,
  ...props
}: InputProps, ref: any) => {

  return (
    <div className={LAYOUT_STYLES}>
      <input
        onChange={(e) => onChange(e)}
        value={value}
        data-testid="input-field"
        type="input"
        ref={ref}
        className={DEFAULT_STYLE}
        {...props}
      />
      {isLoading && (
        <div className={SPIN_WRAP_STYLES}>
          <Spin           
            color="indigo"
          />
        </div>
      )}
    </div>
    
  )
})

export default Input