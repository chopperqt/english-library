import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect'

import Input from "components/Input";

afterEach(cleanup)

it('Input render currently', () => {
  render(<Input name="name" />)

  expect(screen.getByTestId('input-field')).toBeTruthy()
})


it('Check Input name attribute', () => {
  render(<Input name="name" />)

  const input = screen.getByTestId('input-field')

  expect(input).toHaveAttribute('name', 'name')
})

describe('Test changes field', () => {
  const handleChange = jest.fn()

  it('Check call change method', () => {
    render(
      <Input
        name="name"
        onChange={handleChange}
      />
    )

    const input = screen.getByTestId('input-field')

    fireEvent.change(input, {
      target: {
        value: 'change value',
      }
    })

    expect(handleChange).toBeCalled()

  })
})

// it('Check onChange method', () => {
//   render(<Input name="name" />)

//   const input = screen.getByTestId('input-field')

//   fireEvent.change(input, {
//     target: {
//       value: 'test value'
//     }
//   })

//   expect(input).toHaveValue('test value')
// })

