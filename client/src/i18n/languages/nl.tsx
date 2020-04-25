import { Translation }  from '../i18n'

export const nl =  {
  code: 'nl',
  name: 'Dutch',
  nativeName: 'Nederlands',
  IETFTag: 'NL',
  translation: {
    name: `Naam`,
    new_room: `Nieuwe kamer`,
    themes: `Themas`,
    deck: `Deck`,
    members: `Leden`,
    votes: `Stemmen`,
    members_empty_state: {
      title: `Looks like you're lonely. I can fix that`,
      subtitle: `Deel de link om vrienden te maken:`
    },
    reset_votes: `Reset stemmen`,
    about: `Over`,
    dialog: {
      close: `Sluiten`
    },
    about_dialog: {
      title: `Over scrum-poker`,
      t1: `Wat is dit?`,
      p1: `Je kan deze app gebruiken om plannings poker te spelen met je team als jullie niet in een fysieke manier kunnen samenkomen.`,
      t2: 'Hoe werkt het?',
      p2: `Wanneer je naar {{url}} gaat, krijg je automatische een kamer toegewezen. Wanneer je naar de kamer gaat van een teamgenoot via de link, kom je in zijn of haar kamer terecht.`,
      t3: `Hoe speel ik?`,
      p3l: {
        l1: `Geef jezelf een naam. Dit wordt lokaal opgeslagen voor je volgende sessie.`,
        l2: `Deel de link met je teamgenoten.`,
        l3: `Wacht totdat iedereen een kaart heeft gespeeld.`,
        l4: `Zodra je discussie voorbij is, kan je op "RESET STEMMEN" drukken om opnieuw te spelen.`,
      }
    },
    language_dialog: {
      title: `Kies taal`
    },
    status: {
      disconnected: `Verbinding verloren. Automatische proberen om opnieuw verbinding te maken.`,
      reconnected: `Je bent verbonden.`
    }
  }
} as Translation