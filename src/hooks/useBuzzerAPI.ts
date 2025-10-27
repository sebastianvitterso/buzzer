import { useCallback, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import type { Lobby, LobbyResponse, Player } from '../types'
import usePreviousValue from './usePreviousValue'

export type BuzzerAPI = {
  createLobby: (playerName: string) => void
  joinLobby: (lobbyId: string, playerName: string) => void
  buzz: () => void
  reset: () => void
  player: Player | null
  lobby: Lobby | null
}

export function useBuzzerAPI() {
  const url = import.meta.env.DEV
    ? 'ws://localhost:3000/buzzer/ws'
    : 'wss://vitterso-api-8aab90551211.herokuapp.com/buzzer/ws'
  // TODO: Finn ut hvorfor ikke det funker med DNS'et url
  // const url = 'wss://api.vitterso.net/buzzer/ws'
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  })
  const previousReadyState = usePreviousValue(readyState)

  const [player, setPlayer] = useState<Player | null>(null)
  const [lobby, setLobby] = useState<Lobby | null>(null)

  const onWebsocketJsonMessage = useCallback((message: LobbyResponse) => {
    console.log('Received message from server:', message)
    setPlayer(message.player)
    setLobby(message.lobby)
  }, [])

  useEffect(() => {
    if (!lastJsonMessage) return
    onWebsocketJsonMessage(lastJsonMessage as LobbyResponse)
  }, [lastJsonMessage, onWebsocketJsonMessage])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore the rest.
  useEffect(() => {
    if (readyState === WebSocket.OPEN && previousReadyState !== WebSocket.OPEN) {
      if (player && lobby) {
        reconnectToLobby(lobby.id, player.id)
      }
    }
  }, [readyState, previousReadyState])

  function createLobby(playerName: string) {
    sendJsonMessage({ type: 'create_lobby_request', playerName })
  }

  function joinLobby(lobbyId: string, playerName: string) {
    sendJsonMessage({ type: 'join_lobby_request', lobbyId, playerName })
  }

  function reconnectToLobby(lobbyId: string, playerId: string) {
    console.log(`Reconnecting player ${playerId} to lobby ${lobbyId}`)
    sendJsonMessage({ type: 'reconnect_player_request', lobbyId, playerId })
  }

  function buzz() {
    sendJsonMessage({ type: 'buzz_request' })
  }

  function reset() {
    sendJsonMessage({ type: 'reset_request' })
  }

  return { createLobby, joinLobby, buzz, reset, player, lobby }
}
