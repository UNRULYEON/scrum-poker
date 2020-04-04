import React, { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
import { List } from 'immutable'
import { Member, State } from '../typings'

const App = (): JSX.Element => {
  const endpoint: string = `${window.location.origin}`
  const room: string = window.location.pathname.substr(1)
  const socket = socketIOClient(endpoint)
  let [ state, setState ] = useState<State>({
    id: Math.floor(Math.random() * 100001),
    members: List<Member>(),
  })
  let [ name, setName ] = useState<string>(localStorage.getItem('name') || '')

  const updateMemberList = (payload: { id: string, members: Member[] }): void => 
    setState({
      ...state,
      members: state.members.merge(List<Member>(payload.members))})

  const member_updated = (payload: Member[]) =>
    setState(s0 => ({
      ...s0,
      members: List<Member>(payload)
    }))

  const updateName = (new_name: string): void => {
    setName(new_name)
    const member = state.members.find(m => m.id === state.id)
    const new_member = ({ ...member, name: new_name })
    localStorage.setItem('name', new_name)

    socket.emit('update_name', new_member)
  }

  const cast = (vote: string): void => {
    const member = state.members.find(m => m.id === state.id)
    const new_member = ({ ...member, vote })
    socket.emit('cast', new_member)
  }

  const resetCasts = (): void => {
    socket.emit('reset', state.members.find(m => m.id === state.id))
  }

  const memberLeft = (payload: Member[]): void => 
    setState(s0 => ({
      ...s0,
      members: List<Member>(payload)
    }))

  useEffect(() => {
    console.log(`Location: ${endpoint}`)
    const member: Omit<Member, '_id'> = {
      id: state.id,
      name,
      vote: '',
      room
    }

    // Send new member to remote
    socket.emit('join', member)

    // Update local member list because a new member joined
    socket.on('member_joined', (payload: { id: string, members: Member[] }) => updateMemberList(payload))

    // Update local member list because a property of a member has been updated
    socket.on('member_updated', (payload: Member[]) => member_updated(payload))

    // Update local member list because a vote was casted
    socket.on('new_cast', (payload: Member[]) => member_updated(payload))

    // Update local member list because the votes were resetted
    socket.on('reset_cast', (payload: Member[]) => member_updated(payload))

    // Update local member list because a member disconnected
    socket.on('member_left', (data: Member[]) => memberLeft(data))
  }, [])
  
  return (
    <div>
      <main>
        <input value={name} onChange={e => updateName(e.target.value)} />
        <button onClick={() => cast('10')}>send</button><br/>
        <button onClick={() => resetCasts()}>reset</button><br/>
        {state.members.map((member, key) => (
          <React.Fragment key={key}>
            <span>{member.id} - {member.name} - {member.vote}</span><br/>
          </ React.Fragment>
        ))}
      </main>
    </div>
  )
}

export default App

const state = {
  date: '',
  members: [
    {
      id: 'WpqObdXVnmBvf9CXAAAA',
      name: 'Amar',
      vote: ''
    }
  ]
}