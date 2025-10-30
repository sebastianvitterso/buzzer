export type Player = {
  id: string
  name: string
  connected: boolean
}

export type Buzz = {
  player: Player
  time: string
}

export type Lobby = {
  id: string
  adminPlayerId: string
  players: Player[]
  buzzes: Buzz[]
}

export type LobbyResponse = {
  type: 'lobby_response'
  player: Player
  lobby: Lobby
}

export type ErrorResponse = {
  type: 'error'
  message: string
}

export type CreateLobbyRequest = {
  type: 'create_lobby_request'
  playerName: string
}

export type JoinLobbyRequest = {
  type: 'join_lobby_request'
  lobbyId: string
  playerName: string
}

export type ReconnectPlayerRequest = {
  type: 'reconnect_player_request'
  lobbyId: string
  playerId: string
}

export type BuzzRequest = {
  type: 'buzz_request'
}

export type ResetRequest = {
  type: 'reset_request'
}

export type WebSocketRequestMessage =
  | CreateLobbyRequest
  | JoinLobbyRequest
  | ReconnectPlayerRequest
  | BuzzRequest
  | ResetRequest
