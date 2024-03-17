import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import TestComponent from 'components/TestComponent'

afterEach(cleanup)

it('Test Change', async () => {
  render(<TestComponent />)

  const field = screen.getByTestId('test-field')

  expect(field).toBeTruthy()

  fireEvent.change(field, {
    target: {
      value: '123',
    }
  })

  expect(field).toHaveValue('123')

  const error = await screen.findByTestId('test-field-error')

  expect(screen.getByTestId('test-field-wrap')).toMatchSnapshot()
})