import { useState } from 'react'
import Brand from './Brand'
import { Edit2 } from 'lucide-react'
import ButtonContinue from '../common/ButtonContinue'
import PasswordInput from '../common/PasswordInput'
import InputElement from '../common/InputElement'
import { useCheckEmail } from '../../hooks/mutation/useAuthMutation'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router'
import RegisterPage from './RegisterPage'

type steps = 'email' | 'password' | 'register'

interface EmailStepProps {
  email: string
  onEmailChange: (email: string) => void
  onEmailConfirmed: (exists: boolean) => void
  setStep: (step: string) => void
}

interface PasswordStepProps {
  email: string
  onBack: () => void // voltar para o step de email
}

function PasswordPage({ email, onBack }: PasswordStepProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { mutate: login, isPending } = useLogin()
  const { setAccessToken } = useAuthStore()
  const navigate = useNavigate() // do react-router

  function handleLogin(e: React.SubmitEvent) {
    e.preventDefault()
    if (!password.trim()) {
      setError('Digite uma senha valida.')
      return
    }
    login(
      { email, password },
      {
        onSuccess: (data) => {
          setAccessToken(data.access_token)
          navigate('/')
        },
        onError: () => {
          setError('Email ou senha incorreta.')
        },
      }
    )
  }
  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-white text-[22px] font-normal mb-6">Enter your password</h2>

      {/* Email chip */}
      <div className="mb-6 flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
        <span className="flex-1 text-sm text-[#FFFFFF80] truncate">{email}</span>
        <button className="text-[#FF6B1A] hover:text-[#E05A0E] transition-colors">
          <Edit2 size={14} />
        </button>
      </div>

      <div className="space-y-4 mb-2">
        <PasswordInput
          onChange={(e) => {
            setPassword(e)
            setError('')
          }}
        />
      </div>
      {error && <p className="text-[#ff4343] text-xs pb-2">{error}</p>}
      {/* Forgot password */}
      <div className="mb-6 text-right">
        <button className="text-xs text-[#FF6B1A] hover:underline">Forgot password?</button>
      </div>

      <ButtonContinue type={'submit'} placeholder={'Sign in'} />

      {/* Step indicator */}
      <div className="flex justify-center gap-2 mt-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF15]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A]" />
      </div>
    </form>
  )
}

function EmailPage({ email, onEmailChange, onEmailConfirmed, setStep }: EmailStepProps) {
  const [error, setError] = useState('')
  const { mutate: checkEmail, isPending } = useCheckEmail()

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Digite um email valido.')
      return
    }

    checkEmail(email, {
      onSuccess: (data) => onEmailConfirmed(data.exists),
      onError: (err) => setError(`Erro no servidor: ${err.message}`),
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-white text-[22px] font-normal mb-2">Welcome back</h2>
      <p className="text-[#FFFFFF50] text-[13px] mb-8">Enter your email to continue</p>

      <div className="pb-4">
        <InputElement
          type={'email'}
          placeholder={'name@company.com'}
          value={email}
          onChange={(e: string) => {
            onEmailChange(e)
            setError('')
          }}
        />
      </div>
      {error && <p className="text-[#ff4343] text-xs pb-2">{error}</p>}
      <div className="space-y-4 mb-6">
        <ButtonContinue type={'submit'} onClick={handleSubmit} placeholder={'Continue'} />
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#FFFFFF15]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#0F0F0F] px-2 text-[#FFFFFF15]">or</span>
        </div>
      </div>

      {/* SSO option */}
      <button className="w-full h-11 bg-transparent border border-[#2A2A2A] rounded-lg text-[#FFFFFF70] text-[13px] hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2 mb-6">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
            fill="#4285F4"
          />
          <path
            d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5345 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
            fill="#34A853"
          />
          <path
            d="M3.52 9.52C3.36 9.03636 3.27273 8.52364 3.27273 8C3.27273 7.47636 3.36 6.96364 3.52 6.48V4.40727H0.858182C0.312727 5.49091 0 6.70909 0 8C0 9.29091 0.312727 10.5091 0.858182 11.5927L3.52 9.52Z"
            fill="#FBBC05"
          />
          <path
            d="M8 3.17818C9.17818 3.17818 10.2255 3.58545 11.0582 4.37818L13.3527 2.08364C11.9673 0.792727 10.1564 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.40727L3.52 6.48C4.15273 4.58182 5.92 3.17818 8 3.17818Z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>
    </form>
  )
}

export default function LoginPage() {
  const [step, setStep] = useState<steps>('email')
  const [email, setEmail] = useState('')

  return (
    <section className="flex h-screen bg-[#0F0F0F] overflow-hidden">
      {/* first panel */}
      <Brand />
      {/* loginPanel */}
      <div className="w-1/2 bg-background flex items-center justify-center px-8">
        <div className="w-full max-w-[360px]">
          {/* step email */}
          {step === 'email' && (
            <EmailPage
              email={email}
              onEmailChange={setEmail}
              onEmailConfirmed={(exists) => setStep(exists ? 'password' : 'register')}
              setStep={(step: string) => setStep(step)}
            />
          )}

          {/* password step */}
          {step === 'password' && <PasswordPage email={email} />}

          {/* register step */}
          {/* STEP 3 - Register */}
          {step === 'register' && <RegisterPage setStep={setStep} />}
          {/* Bottom link */}
          <p className="text-center text-xs text-[#FFFFFF40] mt-6">
            Don't have an account?{' '}
            <button onClick={() => setStep('register')} className="text-[#FF6B1A] hover:underline">
              Create one
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
