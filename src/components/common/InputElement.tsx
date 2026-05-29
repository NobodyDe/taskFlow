import { forwardRef, type ComponentPropsWithoutRef } from 'react'

interface InputElementProps extends ComponentPropsWithoutRef<'input'> {
  placeholder: string
  type: string
  error?: string
}

const InputElement = forwardRef<HTMLInputElement, InputElementProps>(function InputElement(
  { placeholder, type = 'text', error, ...props },
  ref
) {
  const hasError = Boolean(error)
  return (
    <div>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3.5 text-white text-sm placeholder-[#FFFFFF30] focus:outline-none focus:border-[#FF6B1A99] transition-colors `}
        autoFocus
        {...props}
      />
      {hasError && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
})

export default InputElement
