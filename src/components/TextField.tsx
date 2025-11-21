type TextFieldProps = {
  value: string
  onChange: (newValue: string) => void
  label?: string
  placeholder?: string
  id?: string
}

export default function TextField(props: TextFieldProps) {
  return (
    <div>
      {props.label && <p className="text-sm text-gray-600">{props.label}</p>}
      <input
        type="text"
        value={props.value}
        id={props.id}
        onChange={(e) => props.onChange(e.target.value)}
        className="border-2 rounded-sm focus:outline-hidden border-gray-300 p-4 w-full grow read-only:focus:border-gray-600 read-only:bg-gray-200 focus:border-blue-600 bg-white"
      />
    </div>
  )
}
