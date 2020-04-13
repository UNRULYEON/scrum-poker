import React from 'react'
import { Translation }  from '../i18n'

export const en = {
  translation: {
    name: 'Name',
    new_room: `New room`,
    themes: `Themes`,
    deck: `Deck`,
    members: `Members`,
    votes: `Votes`,
    members_empty_state: {
      title: `Looks like you're lonely. I can fix that`,
      subtitle: `Share this link to make friends:`
    },
    reset_votes: `Reset votes`,
    about: `About`,
    dialog: {
      close: `Close`
    },
    about_dialog: {
      title: `About scrum-poker`,
      t1: `What is this?`,
      p1: `You can use this app to play scrum poker with you team if you can't meet all in a physical way.`,
      t2: 'How does it work?',
      p2: `When you go to {{url}}, you're automatically assigned to a room. When you go to the link you've got from your team member, you join his or her room.`,
      t3: `How do I play?`,
      p3l: {
        l1: `Rename yourself to whatever you want. This will be saved locally for you next session.`,
        l2: `Share the link with you team members so they can join.`,
        l3: `Wait for everyone to pick a card.`,
        l4: `Once your discussion is over, hit "RESET VOTES" to play again.`,
      }
    },
    language_dialog: {
      title: `Choose language`
    },
    status: {
      disconnected: `Disconnected. Automatically trying to reconnect.`,
      reconnected: `You're connected.`
    }
  }
} as Translation

export const en_flag = () => <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 7410 3900">
<rect width="7410" height="3900" fill="#b22234"/>
<path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" stroke-width="300"/>
<rect width="2964" height="2100" fill="#3c3b6e"/>
<g fill="#fff">
<g id="s18">
<g id="s9">
<g id="s5">
<g id="s4">
<path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"/>
<use xlinkHref="#s" y="420"/>
<use xlinkHref="#s" y="840"/>
<use xlinkHref="#s" y="1260"/>
</g>
<use xlinkHref="#s" y="1680"/>
</g>
<use xlinkHref="#s4" x="247" y="210"/>
</g>
<use xlinkHref="#s9" x="494"/>
</g>
<use xlinkHref="#s18" x="988"/>
<use xlinkHref="#s9" x="1976"/>
<use xlinkHref="#s5" x="2470"/>
</g>
</svg>