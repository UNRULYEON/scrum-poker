import React from 'react'
import { Card as CardType } from './'
import { State } from '../../../typings'

import './Card.css'

type CardProps = {
  state?: State
  className?: string
  socket?: SocketIOClient.Socket
  value?: CardType
}

const Card = (props: React.PropsWithChildren<CardProps>): JSX.Element => {
  const { children, className, state, socket, value } = props

  const cast = (vote: string): void => {
    const member = state.members.find(m => m.id === state.id)
    if (state.members.filter(mem => mem.vote.length <= 0).size <= state.members.size && state.members.filter(mem => mem.vote.length <= 0).size !== 0) {
      if (member.vote === vote) {
          socket.emit('cast', ({ ...member, vote: '' }))
      } else {
        socket.emit('cast', ({ ...member, vote }))
      }
    }
  }

  return (
    <div className={`card ${className}`} onClick={_ => cast(value.value)}>
      {children}
    </div>
  )
}

export default Card