import { useBuzzerAPI } from './hooks/useBuzzerAPI'
import Game from './views/Game'
import Menu from './views/Menu'

export default function App() {
  const buzzerAPI = useBuzzerAPI()

  if (buzzerAPI.lobby) {
    return <Game {...buzzerAPI} />
  }

  return <Menu {...buzzerAPI} />
}
