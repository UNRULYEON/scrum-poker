import express = require('express')
import * as http from 'http'
import socketIO = require('socket.io')
import * as path from 'path'
import * as randomWords from 'random-words'
import Datastore = require('nedb')

import { Member, State } from '../typings'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const db = new Datastore()

app.get('/health', (_, res) => {
  res.sendStatus(200)
})

app.get('/', (req, res) => {
  res.redirect(randomWords(4).join('-'))
})

app.use(express.static('public'))

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

app.get('/health', (_, res) => res.sendStatus(200))

io.on('connection', client => {
  // Join a room based on the pathname
  client.on('join', (member: Omit<Member, '_id'> & { room: string }) => {
    const new_member: Member & { sid: string } = { ...member, sid: client.id }
    db.insert(new_member)

    client.join(member.room)
    
    db.find({ room: member.room }, (err, docs: Member[]) => {
      io.in(member.room).emit('member_joined', { id: client.id, members: docs })
    })
  })

  client.on('update_name', (member: Member) => {
    db.update({ id: member.id }, { $set: { name: member.name } }, { returnUpdatedDocs: true }, (err, numReplaced, doc: Member) => {
      db.find({ room: doc.room }, (err, docs) => {
        io.in(doc.room).emit('member_updated', docs)
      })
    })
  })

  // Cast a new vote to the rest of the clients in the room
  client.on('cast', (member: Member) => {
    db.update({ id: member.id }, { $set: { vote: member.vote } }, { returnUpdatedDocs: true }, (err, numReplaces, doc: Member) => {
      db.find({ room: doc.room }, (err, docs) => {
        io.in(doc.room).emit('new_cast', docs)
      })
    })
  })

  // Reset all casts from the clients in the room
  client.on('reset', (member: Member) => {
    db.update({ room: member.room }, { $set: { vote: '' } }, { multi: true, returnUpdatedDocs: true }, (err, numReplaces, docs: Member[]) => {
      io.in(docs[0].room).emit('reset_cast', docs)
    })
  })

  // Fires when a member leaves the room
  client.on('disconnecting', () => {
    const client_id = client.id
    const room = Object.keys(client.rooms)[1]

    db.remove({ sid: client_id }, (err, numRemoved) => {
      db.find({ room: room }, (err, docs) => {
        io.in(room).emit('member_left', docs)
      })
    })
  })

  client.on('error', (err) => {
    console.log(`Error on client: ${client.id}`)
    console.log(err)
  })
})

server.listen(5000, () => console.log('Your app is listening on port ' + 5000))