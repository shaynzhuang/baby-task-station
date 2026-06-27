type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  children: React.ReactNode
}

const variantClass = {
  primary: 'bg-pink-mid text-white hover:bg-pink-strong',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
  danger: 'bg-red-400 text-white hover:bg-red-500',
}

const sizeClass = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-5 py-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-semibold transition disabled:opacity-50 ${variantClass[variant]} ${sizeClass[size]}`}
    >
      {children}
    </button>
  )
}
