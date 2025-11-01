export type BuzzerState = 'loading' | 'ready' | 'buzzed_won' | 'buzzed_lost'

type BuzzerProps = {
  state: BuzzerState
  onBuzz: () => void
}

export default function Buzzer({ state, onBuzz }: BuzzerProps) {
  return (
    <button
      type="button"
      onClick={onBuzz}
      disabled={state !== 'ready'}
      className={`
        size-40 md:size-60 lg:size-80 rounded-full
        text-white text-2xl md:text-3xl lg:text-4xl font-bold
        bg-blue-500 disabled:bg-gray-400
        enabled:hover:opacity-90
        cursor-pointer disabled:cursor-not-allowed
      `}
      style={{}}
    >
      Buzz
    </button>
  )
}
