interface ButtonContinueProps {
  placeholder: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function ButtonContinue({
  placeholder,
  onClick,
  type = 'button',
}: ButtonContinueProps) {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className="w-full h-11 bg-[#FF6B1A] hover:bg-[#E05A0E] rounded-lg text-white text-sm font-medium transition-colors"
      >
        {placeholder}
      </button>
    </div>
  )
}
