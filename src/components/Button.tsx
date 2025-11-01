type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
        border-2 rounded-sm 
        focus:outline-hidden border-gray-300 bg-gray-200 text-gray-800 
        flex items-center justify-center 
        px-6 h-14 
        font-semibold 
        cursor-pointer disabled:cursor-not-allowed
        disabled:opacity-50 
        enabled:hover:border-blue-600
        enabled:focus:border-blue-600
        enabled:active:border-blue-800
        enabled:hover:bg-blue-200
        enabled:focus:bg-blue-200
        enabled:active:bg-blue-300
        enabled:hover:text-blue-900
        enabled:focus:text-blue-900
      `}
    >
      {props.children}
    </button>
  )
}
