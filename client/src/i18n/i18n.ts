import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import {
  en,
  nl,
} from './languages'

export const resources = {
  en,
  nl
};

export type Translation = {
  code: string
  name: string
  nativeName: string
  IETFTag: string
  translation: {
    name: string
    new_room: string
    themes: string
    deck: string
    members: string
    votes: string
    members_empty_state: {
      title: string
      subtitle: string
    }
    reset_votes: string
    about: string,
    dialog: {
      close: string
    } 
    about_dialog: {
      title: string
      t1: string
      p1: string
      t2: string
      p2: string
      t3: string
      p3l: {
        l1: string
        l2: string
        l3: string
        l4: string
      }
    }
    language_dialog: {
      title: string
    },
    status: {
      disconnected: string
      reconnected: string
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en',
    debug: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    resources
  })

export default i18n
