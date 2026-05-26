import { Check } from 'lucide-react'
import ButtonContinue from '../common/ButtonContinue'
import InputElement from '../common/InputElement'
import PasswordInput from '../common/PasswordInput'
import { useState } from 'react'

const avatarColors = [
  { id: 'orange', value: '#FF6B1A' },
  { id: 'blue', value: '#4F8EF7' },
  { id: 'purple', value: '#9B5DE5' },
  { id: 'green', value: '#00C896' },
  { id: 'yellow', value: '#F7C948' },
  { id: 'pink', value: '#E05C7A' },
]

export default function RegisterPage({ setStep }) {
  const [selectedColor, setSelectedColor] = useState('#FF6B1A')
  return (
    <div>
      <h2 className="text-white text-[22px] font-normal mb-6">Crie sua conta</h2>

      <div className="space-y-4 mb-6">
        {/* First name & Last name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <InputElement type={'text'} placeholder={'Primeiro nome'} />
            {/* {errors.firstName && (
                    <p className="text-[#E05C7A] text-xs mt-1.5">{errors.firstName}</p>
                  )} */}
          </div>
          <div>
            <InputElement type={'text'} placeholder={'Segundo nome'} />
            {/* {errors.lastName && (
                    <p className="text-[#E05C7A] text-xs mt-1.5">{errors.lastName}</p>
                  )} */}
          </div>
        </div>

        {/* Email */}
        <div>
          <InputElement type={'email'} placeholder={'name@company.com'} />
          {/* {errors.email && <p className="text-[#E05C7A] text-xs mt-1.5">{errors.email}</p>} */}
        </div>

        {/* Position */}
        <div>
          <InputElement type={'text'} placeholder={'e.g. Frontend Developer'} />
        </div>

        {/* Avatar color */}
        <div>
          <label className="block text-xs text-[#FFFFFF70] mb-3">Avatar color</label>
          <div className="flex gap-3">
            {avatarColors.map((color) => {
              const isSelected = selectedColor === color.value
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className="w-6 h-6 rounded-full relative transition-all delay-100"
                  style={{
                    backgroundColor: color.value,
                    outline: isSelected ? '2px solid #FFFFFF' : 'none',
                    outlineOffset: '2px',
                  }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check size={12} className="text-white drop-shadow-lg" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Password & Confirm password */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <PasswordInput />
            {/* {errors.password && (
                    <p className="text-[#E05C7A] text-xs mt-1.5">{errors.password}</p>
                  )} */}
          </div>
          <div>
            <PasswordInput />
            {/* {errors.confirmPassword && (
                    <p className="text-[#E05C7A] text-xs mt-1.5">{errors.confirmPassword}</p>
                  )} */}
          </div>
        </div>

        <ButtonContinue placeholder={'Criar conta'} />
      </div>

      {/* Bottom link */}
      <p className="text-center text-xs text-[#FFFFFF40]">
        Já tem uma conta?{' '}
        <button onClick={() => setStep('email')} className="text-[#FF6B1A] hover:underline">
          Faça login
        </button>
      </p>
    </div>
  )
}
