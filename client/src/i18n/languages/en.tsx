import { Translation }  from '../i18n'

export const en = {
  code: 'en',
  name: 'English',
  nativeName: 'English',
  IETFTag: 'en-US',
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