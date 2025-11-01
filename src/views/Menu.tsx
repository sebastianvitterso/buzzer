import { useState } from 'react'
import Button from '../components/Button'
import TextField from '../components/TextField'
import type { BuzzerAPI } from '../hooks/useBuzzerAPI'

export default function Menu({ createLobby, joinLobby }: BuzzerAPI) {
  const [createLobbyUserName, setCreateLobbyUserName] = useState('')

  const [joinLobbyId, _setJoinLobbyId] = useState('')
  const [joinLobbyUserName, setJoinLobbyUserName] = useState('')

  function setJoinLobbyId(value: string) {
    // uppercase and remove spaces
    _setJoinLobbyId(value.toUpperCase().replace(/\s+/g, ''))
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-16 gap-16">
      <h1 className="text-5xl font-black">Buzzer Game</h1>
      <div className="w-full h-screen flex flex-col md:flex-row gap-12 md:justify-around items-center">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold">Create new lobby</h2>
          <label htmlFor="create-lobby-username">
            Username <span className="text-gray-500 text-xs">(leave empty for hidden buzzer)</span>
          </label>
          <TextField
            id="create-lobby-username"
            placeholder="Enter your name"
            value={createLobbyUserName}
            onChange={setCreateLobbyUserName}
          />
          <Button onClick={() => createLobby(createLobbyUserName)}>Create Lobby</Button>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold">Join lobby</h2>
          <label htmlFor="join-lobby-id">Lobby code</label>
          <TextField
            id="join-lobby-id"
            placeholder="Enter lobby code"
            value={joinLobbyId}
            onChange={setJoinLobbyId}
          />
          <label htmlFor="join-lobby-username">Username</label>
          <TextField
            id="join-lobby-username"
            placeholder="Enter your name"
            value={joinLobbyUserName}
            onChange={setJoinLobbyUserName}
          />
          <Button onClick={() => joinLobby(joinLobbyId, joinLobbyUserName)}>Join Lobby</Button>
        </div>
      </div>
    </div>
  )
}
