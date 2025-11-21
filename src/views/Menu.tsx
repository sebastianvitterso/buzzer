import { useState } from 'react'
import Button from '../components/Button'
import TextField from '../components/TextField'
import type { BuzzerAPI } from '../hooks/useBuzzerAPI'

export default function Menu({ createLobby, joinLobby }: BuzzerAPI) {
  const [joinOrCreate, setJoinOrCreate] = useState<'join' | 'create'>('join')

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
      {joinOrCreate === 'create' ? (
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold">Create new lobby</h2>
          <label htmlFor="create-lobby-username" className="-mb-4">
            Username{' '}
            <span className="text-gray-500 text-xs">(leave empty to hide your buzzer)</span>
          </label>
          <TextField
            id="create-lobby-username"
            placeholder="Enter your name"
            value={createLobbyUserName}
            onChange={setCreateLobbyUserName}
          />
          <Button onClick={() => createLobby(createLobbyUserName)}>Create Lobby</Button>
          <button
            type="button"
            className="underline font-bold text-sm text-gray-600 self-start cursor-pointer"
            onClick={() => setJoinOrCreate('join')}
          >
            Join existing lobby
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-bold">Join lobby</h2>
          <label htmlFor="join-lobby-id" className="-mb-4">
            Lobby code
          </label>
          <TextField
            id="join-lobby-id"
            placeholder="Enter lobby code"
            value={joinLobbyId}
            onChange={setJoinLobbyId}
          />
          <label htmlFor="join-lobby-username" className="-mb-4">
            Username
          </label>
          <TextField
            id="join-lobby-username"
            placeholder="Enter your name"
            value={joinLobbyUserName}
            onChange={setJoinLobbyUserName}
          />
          <Button onClick={() => joinLobby(joinLobbyId, joinLobbyUserName)}>Join Lobby</Button>
          <button
            type="button"
            className="underline font-bold text-sm text-gray-600 self-start cursor-pointer"
            onClick={() => setJoinOrCreate('create')}
          >
            Create new lobby
          </button>
        </div>
      )}
    </div>
  )
}
