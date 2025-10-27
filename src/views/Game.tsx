import Button from '../components/Button'
import type { BuzzerState } from '../components/Buzzer'
import Buzzer from '../components/Buzzer'
import type { BuzzerAPI } from '../hooks/useBuzzerAPI'
import type { Player } from '../types'

export default function Game({ buzz, reset, player, lobby }: BuzzerAPI) {
  function getBuzzerState(): BuzzerState {
    if (!lobby || !player) return 'loading'
    if (lobby.buzzes.length >= 1) {
      const firstBuzz = lobby.buzzes[0]
      if (firstBuzz.player.id === player.id) {
        return 'buzzed_won'
      }
      if (lobby.buzzes.some((buzz) => buzz.player.id === player.id)) {
        return 'buzzed_lost'
      }
    }
    return 'ready'
  }

  function isAdmin() {
    return lobby?.adminPlayerId === player?.id
  }

  function getBuzzedPlayerList(): [Player, number][] {
    if (!lobby) return []
    if (lobby.buzzes.length === 0) return []
    const sortedBuzzes = [...lobby.buzzes].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
    )
    const firstBuzzTime = new Date(sortedBuzzes[0].time)
    // get second diff between every buzz and first buzz
    const buzzDiffs = sortedBuzzes.map((buzz) => {
      const buzzTime = new Date(buzz.time)
      return Math.floor((buzzTime.getTime() - firstBuzzTime.getTime()) / 1000)
    })

    return sortedBuzzes.map((buzz, index) => [buzz.player, buzzDiffs[index]] as [Player, number])
  }

  function getWaitingPlayerList(): Player[] {
    if (!lobby || !player) return []
    const buzzedPlayerIds = lobby.buzzes.map((buzz) => buzz.player.id)
    return lobby.players
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .filter((p) => !buzzedPlayerIds.includes(p.id))
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-16 gap-12">
      <h1 className="text-4xl font-black">Buzzer Game</h1>
      <p>Lobby code: {lobby?.id ?? '-'}</p>
      <Buzzer onBuzz={buzz} state={getBuzzerState()} />

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Players:</h2>
        {getBuzzedPlayerList().map(([p, diff], index) => (
          <p key={p.id} className="flex justify-between w-64 font-bold">
            <span>{p.name}</span>
            <span>{index === 0 ? <span>🏆</span> : `+${diff.toFixed(1)}s`}</span>
          </p>
        ))}
        {getWaitingPlayerList().map((p) => (
          <p key={p.id} className="w-64">
            {p.name}
          </p>
        ))}
      </div>

      {isAdmin() && <Button onClick={reset}>Reset buzzer</Button>}
    </div>
  )
}
