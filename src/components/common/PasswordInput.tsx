import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface PasswordInputProps {
  onChange: (e: string) => void
}

export default function PasswordInput({ onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <div className="relative">
      <input
        placeholder="Enter your password"
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3.5 pr-10 text-white text-sm placeholder-[#FFFFFF30] focus:outline-none focus:border-[#FF6B1A99] transition-colors"
        autoFocus
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FFFFFF30] hover:text-[#FFFFFF60] transition-colors"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}
