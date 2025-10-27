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
      className="border-2 rounded-sm focus:outline-hidden border-gray-300 bg-gray-200 text-gray-800 flex items-center justify-center px-6 h-14 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:border-blue-600 focus:border-blue-600 active:border-blue-800 hover:bg-blue-200 focus:bg-blue-200 active:bg-blue-300 hover:text-blue-900 focus:text-blue-900"
    >
      {props.children}
    </button>
  )
}
