import { List } from 'immutable'

export type Member = {
  _id?: string
  id: number
  name: string
  vote: string
  room: string
}

export type State = {
  members: List<Member>
  id: number
}