import React from 'react'
import { Member, State } from '../../../../typings'
import { List } from 'immutable'
import { Button } from '@material-ui/core'

import './Members.css'
import './Member.css'
import Card from '../cards/card'

type MembersProps = {
  members: List<Member>
  state: State
  socket: SocketIOClient.Socket
}

const Members = (props: MembersProps): JSX.Element => {
  const { members, state, socket } = props
  
  const resetti = (): void => {
    socket.emit('reset', state.members.find(m => m.id === state.id))
  }

  return (
    <div className="base-layout" id="members-layout">
      <div id="members-container">
        <span id="members_column_name" className="column_name">MEMBERS</span>
        <span id="vote_column_name" className="column_name">VOTES</span>
        <div id="members">
          {members.map((member, key) => (
            <MemberComp key={key} member={member} members={members} />
          ))}
          {members.size <= 1 &&
            <div id="lonely">
              <span id="lonely-title">LOOKS LIKE YOU'RE LONELY</span>
              <span id="lonely-sub">SHARE THIS LINK TO MAKE FRIENDS:</span>
              <span id="lonely-link">{window.location.href}</span>
            </div>
          }
        </div>
        <div id="reset-container">
          <Button variant="contained" disableElevation onClick={_ => resetti()} disabled={members.filter(mem => mem.vote.length <= 0).size === members.size}>Reset votes</Button>
        </div>
      </div>
    </div>
  )
}

export default Members

type MemberProps = {
  member: Member
  members: List<Member>
}

const MemberComp = (props: MemberProps): JSX.Element => {
  const { member, members } = props

  return (
    <div className="member-layout">
      <div className="member-status">{member.vote.length > 0
        ? (
          <div className="member-status-base member-status-voted"></div>
        )
        : ( 
          <div className="member-status-base"></div>
        )}</div>
      <span className="member-name">{member.name}</span>
      <span className="member-id">{member.id}</span>
      <Card className={`member-vote ${member.vote.length > 0 && 'member-vote-voted' }`}>
        {members.filter(mem => mem.vote.length <= 0).size > 0
          ? (
            <>
            {member.vote.length > 0
              ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="31.035" height="34.485" viewBox="0 0 31.035 34.485">
                  <g id="Group_31" data-name="Group 31" transform="translate(-6.182 -4.121)">
                    <path id="vote" d="M28.862,20.967H27.69l-3.448,3.448h3.293l3.052,3.448H6.448l3.069-3.448h3.535L9.6,20.967H8.172L3,26.139v6.9a3.448,3.448,0,0,0,3.448,3.448H30.586a3.448,3.448,0,0,0,3.448-3.448v-6.9l-5.172-5.172M27.138,12.26,18.6,20.794l-6.121-6.1,8.552-8.535,6.1,6.1M19.828,2.5,8.845,13.484a1.717,1.717,0,0,0,0,2.431l8.535,8.5a1.659,1.659,0,0,0,2.431,0L30.776,13.484a1.717,1.717,0,0,0,0-2.431L22.242,2.518A1.681,1.681,0,0,0,19.828,2.5Z" transform="translate(3.182 2.123)"/>
                  </g>
                </svg>
              )
              : (
                <svg id="Group_31" data-name="Group 31" xmlns="http://www.w3.org/2000/svg" width="42.839" height="42.839" viewBox="0 0 42.839 42.839">
                  <path id="vote" d="M28.862,20.967H27.69l-3.448,3.448h3.293l3.052,3.448H6.448l3.069-3.448h3.535L9.6,20.967H8.172L3,26.139v6.9a3.448,3.448,0,0,0,3.448,3.448H30.586a3.448,3.448,0,0,0,3.448-3.448v-6.9l-5.172-5.172M27.138,12.26,18.6,20.794l-6.121-6.1,8.552-8.535,6.1,6.1M19.828,2.5,8.845,13.484a1.717,1.717,0,0,0,0,2.431l8.535,8.5a1.659,1.659,0,0,0,2.431,0L30.776,13.484a1.717,1.717,0,0,0,0-2.431L22.242,2.518A1.681,1.681,0,0,0,19.828,2.5Z" transform="translate(3.182 2.123)"/>
                  <g id="Rectangle_10" data-name="Rectangle 10" transform="translate(0 39.341) rotate(-45)" stroke="#fcc" strokeWidth="1">
                    <rect width="55.637" height="4.946" stroke="none"/>
                    <rect x="0.5" y="0.5" width="54.637" height="3.946" fill="none"/>
                  </g>
                </svg>
              )}
            </>
          )
          : member.vote}
      </Card>
    </div>
  )
}