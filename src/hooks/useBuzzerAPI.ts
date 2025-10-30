import { useCallback, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import type { ErrorResponse, Lobby, LobbyResponse, Player } from '../types'
import usePreviousValue from './usePreviousValue'

export type BuzzerAPI = {
  createLobby: (playerName: string) => void
  joinLobby: (lobbyId: string, playerName: string) => void
  buzz: () => void
  reset: () => void
  player: Player | null
  lobby: Lobby | null
}

type DebugMessage = {
  time: Date
  message: string
}

export function useBuzzerAPI() {
  const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([])
  const lastDebugMessage: DebugMessage | null = debugMessages[debugMessages.length - 1] ?? null
  const addDebugMessage = useCallback((message: string) => {
    const debugMessage = { time: new Date(), message }
    console.log(debugMessage)
    setDebugMessages((prev) => [...prev, debugMessage])
  }, [])

  const url = import.meta.env.DEV
    ? 'ws://localhost:3000/buzzer/ws'
    : 'wss://vitterso-api-8aab90551211.herokuapp.com/buzzer/ws'
  // TODO: Finn ut hvorfor ikke det funker med DNS'et url
  // const url = 'wss://api.vitterso.net/buzzer/ws'
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
    shouldReconnect: () => true,
    heartbeat: {
      interval: 10000,
      message: 'ping',
      returnMessage: 'pong',
      timeout: 60000,
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  })

  const previousReadyState = usePreviousValue(readyState)

  const [player, setPlayer] = useState<Player | null>(null)
  const [lobby, setLobby] = useState<Lobby | null>(null)

  const onWebsocketJsonMessage = useCallback(
    (message: LobbyResponse | ErrorResponse) => {
      addDebugMessage(`Received message from server: ${JSON.stringify(message)}`)
      if (message.type !== 'lobby_response') {
        addDebugMessage(`Error from server: ${JSON.stringify(message)}`)
        return
      }

      setPlayer(message.player)
      setLobby(message.lobby)
    },
    [addDebugMessage],
  )

  useEffect(() => {
    if (!lastJsonMessage) return
    onWebsocketJsonMessage(lastJsonMessage as LobbyResponse)
  }, [lastJsonMessage, onWebsocketJsonMessage])

  // Auto-reconnect logic
  // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore the rest.
  useEffect(() => {
    addDebugMessage(`WebSocket readyState changed: ${readyState}`)
    if (readyState === WebSocket.OPEN && previousReadyState !== WebSocket.OPEN) {
      if (player && lobby) {
        reconnectToLobby(lobby.id, player.id)
      }
    }
  }, [readyState, previousReadyState])

  function createLobby(playerName: string) {
    addDebugMessage(`Creating lobby as player ${playerName}`)
    sendJsonMessage({ type: 'create_lobby_request', playerName })
  }

  function joinLobby(lobbyId: string, playerName: string) {
    addDebugMessage(`Joining lobby ${lobbyId} as player ${playerName}`)
    sendJsonMessage({ type: 'join_lobby_request', lobbyId, playerName })
  }

  function reconnectToLobby(lobbyId: string, playerId: string) {
    addDebugMessage(`Reconnecting player ${playerId} to lobby ${lobbyId}`)
    sendJsonMessage({ type: 'reconnect_player_request', lobbyId, playerId })
  }

  function buzz() {
    addDebugMessage(`Player ${player?.name} buzzed`)
    sendJsonMessage({ type: 'buzz_request' })
  }

  function reset() {
    addDebugMessage('Resetting buzzer')
    sendJsonMessage({ type: 'reset_request' })
  }

  return { createLobby, joinLobby, buzz, reset, player, lobby, lastDebugMessage }
}
