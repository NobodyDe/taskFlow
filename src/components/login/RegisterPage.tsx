import { Check } from 'lucide-react'
import ButtonContinue from '../common/ButtonContinue'
import InputElement from '../common/InputElement'
import PasswordInput from '../common/PasswordInput'
import { useState } from 'react'
import { zodResolver } from '@hookForm/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateAccount } from '../../hooks/mutation/useAuthMutation'
import { useNavigate } from 'react-router'

const avatarColors = [
  { id: 'orange', value: '#FF6B1A' },
  { id: 'blue', value: '#4F8EF7' },
  { id: 'purple', value: '#9B5DE5' },
  { id: 'green', value: '#00C896' },
  { id: 'yellow', value: '#F7C948' },
  { id: 'pink', value: '#E05C7A' },
]

const accountSchema = z
  .object({
    first_name: z
      .string()
      .min(3, 'Deve ter mais que 3 caracteres')
      .regex(/^\D+$/, 'Não pode conter números'),
    last_name: z
      .string()
      .min(3, 'Deve ter mais que 3 caracteres')
      .regex(/^\D+$/, 'Não pode conter números'),
    position: z
      .string()
      .min(3, 'Deve ter mais que 3 caracteres')
      .regex(/^\D+$/, 'Não pode conter números'),
    email: z.email().min(3, 'O email é obrigatório'),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As sennhas precisam ser iguais',
    path: ['confirmPassword'],
  })

type AccountSchemeProps = z.infer<typeof accountSchema>

export default function RegisterPage({ setStep }) {
  const [selectedColor, setSelectedColor] = useState('#FF6B1A')
  const { mutate: createAccount } = useCreateAccount()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSchemeProps>({
    resolver: zodResolver(accountSchema),
  })

  function handleCreateAccont(data: AccountSchemeProps) {
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      initials: `${data.first_name.charAt(0)}${data.last_name.charAt(0)}`,
      position: data.position,
      color_hex: selectedColor,
      email: data.email,
      password: data.password,
    }
    createAccount(payload, {
      onSuccess: (data) => {
        console.log('Conta criada:', data)
        navigate('/', { replace: true })
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateAccont, (errors) => console.log(errors))}>
      <h2 className="text-white text-[22px] font-normal mb-6">Crie sua conta</h2>

      <div className="space-y-4 mb-6">
        {/* First name & Last name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <InputElement
              type="text"
              placeholder="Primeiro nome"
              {...register('first_name', { required: 'O primeiro nome é obrigatório' })}
              error={errors.first_name?.message}
            />
          </div>
          <div>
            <InputElement
              type="text"
              placeholder="Ultimo nome"
              {...register('last_name', { required: 'O ultimo nome é obrigatório' })}
              error={errors.last_name?.message}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <InputElement
            type="email"
            placeholder="name@company.com"
            {...register('email', { required: 'O email é obrigatório' })}
            error={errors.email?.message}
          />
          {/* {errors.email && <p className="text-[#E05C7A] text-xs mt-1.5">{errors.email}</p>} */}
        </div>

        {/* Position */}
        <div>
          <InputElement
            type="text"
            placeholder="e.g. Frontend Developer"
            {...register('position', { required: 'A posição é obrigatória' })}
            error={errors.position?.message}
          />
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
            <PasswordInput
              autoComplete="new-password"
              {...register('password', { required: 'A Senha é obrigatoria' })}
              error={errors.password?.message}
            />
          </div>
          <div>
            <PasswordInput
              placeholder="Confirme a senha"
              autoComplete="confirm-password"
              {...register('confirmPassword', { required: 'Confirma a senha é obrigatorio' })}
              error={errors.confirmPassword?.message}
            />
          </div>
        </div>

        <ButtonContinue type="submit" placeholder={'Criar conta'} />
      </div>

      {/* Bottom link */}
      <p className="text-center text-xs text-[#FFFFFF40]">
        Já tem uma conta?{' '}
        <button onClick={() => setStep('email')} className="text-[#FF6B1A] hover:underline">
          Faça login
        </button>
      </p>
    </form>
  )
}
