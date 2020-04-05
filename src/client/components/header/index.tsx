import React from 'react'
import { State } from '../../../typings'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { uniqueNamesConfig } from '../../App'

import './Header.css'

type HeaderProps = {
  name: string
  state: State
  setName: (value: React.SetStateAction<string>) => void
  socket: SocketIOClient.Socket
}

const Header = (props: HeaderProps): JSX.Element => {
  const { name, setName, state, socket } = props

  const updateName = (new_name: string): void => {
    setName(new_name)
    const member = state.members.find(m => m.id === state.id)
    const new_member = ({ ...member, name: new_name })
    localStorage.setItem('name', new_name)

    socket.emit('update_name', new_member)
  }

  return (
    <header className="base-layout">
      <div id='header'>
        <div id="header__room-name">
          <span>{window.location.pathname.substr(1).toUpperCase()}</span>
        </div>
        <div id="header__name_and_buttons">
          <TextField
            id="name"
            label="NAME"
            variant="outlined"
            value={name}
            onBlur={e => e.target.value.length <= 0 && updateName(uniqueNamesGenerator(uniqueNamesConfig))}
            onChange={e => updateName(e.target.value)}
          />
          <div id="header_buttons">
            <Button variant="contained" disableElevation onClick={_ => window.location.href = window.location.origin}>New room</Button>
            {/* <Button variant="contained">Themes</Button> */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header