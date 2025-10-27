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
      className="h-40 w-40 rounded-full bg-blue-500 text-white text-2xl disabled:bg-gray-400 hover:opacity-90 disabled:hover:opacity-100 cursor-pointer disabled:cursor-not-allowed"
      style={{}}
    >
      Buzz
    </button>
  )
}
