import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState, type ChangeEvent, type ComponentPropsWithoutRef } from 'react'

interface PasswordInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  error?: string
  onValueChange?: (value: string) => void
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { error, onChange, onValueChange, placeholder = 'Digite sua senha', ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const hasError = Boolean(error)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event)
    onValueChange?.(event.target.value)
  }

  return (
    <div>
      <div className="relative">
        <input
          ref={ref}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3.5 pr-10 text-white text-sm placeholder-[#FFFFFF30] focus:outline-none focus:border-[#FF6B1A99] transition-colors"
          autoFocus
          {...props}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FFFFFF30] hover:text-[#FFFFFF60] transition-colors"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {hasError && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
})

export default PasswordInput
