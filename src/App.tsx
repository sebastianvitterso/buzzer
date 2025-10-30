import { useBuzzerAPI } from './hooks/useBuzzerAPI'
import Game from './views/Game'
import Menu from './views/Menu'

export default function App() {
  const buzzerAPI = useBuzzerAPI()

  return (
    <div>
      {import.meta.env.DEV && buzzerAPI.lastDebugMessage && (
        <div className="absolute top-0 left-0 p-4 text-xs text-white bg-black bg-opacity-75 max-h-32 overflow-y-auto pointer-events-none">
          <div>
            [{buzzerAPI.lastDebugMessage.time.toLocaleTimeString()}]{' '}
            {buzzerAPI.lastDebugMessage.message}
          </div>
        </div>
      )}
      {buzzerAPI.lobby ? <Game {...buzzerAPI} /> : <Menu {...buzzerAPI} />}
    </div>
  )
}
