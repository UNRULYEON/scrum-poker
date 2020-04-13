import React, { useState } from 'react'
import { fibonacci } from './decks'
import Card from './card'
import { InputLabel, Select, MenuItem } from '@material-ui/core'
import { State } from '../../../../typings'

import './Cards.css'
import { useTranslation } from 'react-i18next'

export type Card = {
  value: string
  numeric_value?: number
  addable: boolean
}

export type Deck = {
  name: 'fibonacci'
  cards: Card[]
}

type CardsState = {
  currentDeck: Deck
  decks: Deck[]
}

const initialState: CardsState = {
  currentDeck: { ...fibonacci },
  decks: [
    { ...fibonacci }
  ]
}

type CardsProps = {
  state: State
  socket: SocketIOClient.Socket
}

const Cards = (props : CardsProps): JSX.Element => {
  const { state, socket } = props
  const [ cardState ] = useState<CardsState>(initialState)
  const { t } = useTranslation()

  const getClassName = (value: string): string => {
    const member = state.members.find(m => m.id === state.id)
    return typeof member !== 'undefined' && member.vote === value ? 'member-vote-voted' : '' 
  }

  return (
    <div id="cards-container">
      <div className="base-layout" id="deck-select">
        <div id="deck-select-container">
          <InputLabel id="deck-select-label">{t('deck').toUpperCase()}</InputLabel>
          <Select
            labelId="deck-select-label"
            value={cardState.currentDeck.name}
            // onChange={handleChange}
          >
            {cardState.decks.map((deck, key) => (
              <MenuItem value={deck.name} key={key}>{deck.name.charAt(0).toUpperCase() + deck.name.slice(1)}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div id="cards">
        {cardState.currentDeck.cards.map((card, key) => (
          <Card className={`${getClassName(card.value)}`} key={key} state={state} socket={socket} value={card}>{card.value}</Card>
        ))} 
      </div>
    </div>
  )
}

export default Cards