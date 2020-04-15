import { Deck } from './'

export const fibonacci: Deck = {
  name: 'fibonacci',
  cards: [
    { value: '0', numeric_value: 0, addable: true },
    { value: '1/2', numeric_value: 0.5, addable: true },
    { value: '1', numeric_value: 1, addable: true },
    { value: '2', numeric_value: 2, addable: true },
    { value: '3', numeric_value: 3, addable: true },
    { value: '5', numeric_value: 5, addable: true },
    { value: '8', numeric_value: 8, addable: true },
    { value: '13', numeric_value: 13, addable: true },
    { value: '20', numeric_value: 20, addable: true },
    { value: '40', numeric_value: 40, addable: true },
    { value: '100', numeric_value: 100, addable: true },
    { value: '∞', addable: false },
    { value: '?', addable: false },
    { value: '☕', addable: false },
  ]
}
