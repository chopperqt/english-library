import '@testing-library/jest-dom/extend-expect'

import { checkUniqueWord } from '../helpers/checkUniqueWord'

describe('Test check already exist function', () => {
  it('Word already exist', () => {
    const check = checkUniqueWord('test', ['test'])

    expect(check).toBe(false)
  })
})