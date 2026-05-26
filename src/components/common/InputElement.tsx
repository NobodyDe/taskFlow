interface InputElementProps {
  placeholder: string
  type: string
  value: string
  onChange: (e: string) => void
}

export default function InputElement({ placeholder, type, value, onChange }: InputElementProps) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3.5 text-white text-sm placeholder-[#FFFFFF30] focus:outline-none focus:border-[#FF6B1A99] transition-colors"
        autoFocus
      />
    </div>
  )
}
