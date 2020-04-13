import React, { useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
import { List } from 'immutable'
import { Member, State } from '../../typings'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator'
import ReactGA from 'react-ga';
import GAConfig from './ga'
import { useTranslation } from "react-i18next"

import Layout from './components/layout'
import Header from './components/header'
import Cards from './components/cards'
import Members from './components/members'
import Footer from './components/footer'
import SPSnackbar, { SnackbarType } from "./components/snackbar"

export const uniqueNamesConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: '-'
}

ReactGA.initialize(GAConfig.trackingCode)
ReactGA.pageview(window.location.pathname)

const App = (): JSX.Element => {
  const endpoint: string = `${process.env.NODE_ENV !== 'development' ? window.location.origin : 'http://localhost:8080'}`
  const room: string = window.location.pathname.substr(1).toLowerCase()
  const [ snackbar, setSnackbar ] = useState<SnackbarType['state']>({
    open: false,
    message: '',
    severity: 'info',
    origin: {
      vertical: 'top',
      horizontal: 'center'
    },
    handleClose: () => {},
    autoHideDuration: 5000
  })
  const socket = socketIOClient(endpoint, {
    secure: true,
    transports: [ 'websocket' ]
  })
  const [ state, setState ] = useState<State>({
    id: Math.floor(Math.random() * 100001),
    members: List<Member>(),
  })
  const [ name, setName ] = useState<string>(localStorage.getItem('name') || uniqueNamesGenerator(uniqueNamesConfig))
  const { t } = useTranslation()

  const updateMemberList = (payload: { id: string, members: Member[] }): void => 
    setState({
      ...state,
      members: state.members.merge(List<Member>(payload.members))})

  const member_updated = (payload: Member[]) =>
    setState(s0 => ({
      ...s0,
      members: List<Member>(payload)
    }))

  const memberLeft = (payload: Member[]): void => 
    setState(s0 => ({
      ...s0,
      members: List<Member>(payload)
    }))

  useEffect(() => {
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


    socket.on('disconnect', (reason: string) => {
      if (reason === 'io server disconnect' || reason === 'transport close') {
        setSnackbar({
          ...snackbar,
          open: true,
          message: `${t('status.disconnected')}`,
          severity: 'error',
          autoHideDuration: null,
          handleClose: setSnackbar
        })
      }
    })

    socket.on('reconnect', (attemptNumber: number) => {
      socket.emit('join', member)
      setSnackbar({
        ...snackbar,
        open: true,
        message: `${t('status.reconnected')}`,
        severity: 'success',
        handleClose: setSnackbar
      })
    })
    // eslint-disable-next-line
  }, [])
  
  return (
    <Layout>
      <Header name={name} setName={setName} state={state} socket={socket} />
      <Cards state={state} socket={socket} />
      <Members members={state.members} state={state} socket={socket} />
      <Footer />
      <SPSnackbar state={snackbar} />
    </Layout>
  )
}

export default App