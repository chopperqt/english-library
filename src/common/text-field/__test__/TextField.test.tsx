import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TextField from '../TextField'
import { useForm } from 'react-hook-form'

afterEach(cleanup)

it('Test render correctly', () => {
  const Component = () => {
    const {
      control,
    } = useForm({
      mode: 'onChange',
    })

    return (
      <TextField
        name="name"
        control={control}
      />
    )
  }

  render(<Component />)
})

describe('Test value', () => {
  const Component = () => {
    const {
      control,
    } = useForm({
      mode: 'onChange',
    })

    return (
      <TextField
        name="name"
        value='test default value'
        control={control}
      />
    )
  }

  it('Test default value', () => {
    render(<Component />)

    expect(screen.getByTestId('text-field')).toHaveValue('test default value')
  })

  it('Test change value', () => {
    render(<Component />)

    const input = screen.getByTestId('text-field')

    fireEvent.change(input, {
      target: {
        value: '',
      }
    })

    expect(input).toHaveValue("")

    fireEvent.change(input, {
      target: {
        value: 'second value change',
      }
    })

    expect(input).toHaveValue('second value change')
  })
})

describe('Test display errors', () => {
  const Component = () => {
    const {
      control,
    } = useForm({
      mode: 'onChange',
    })

    return (
      <TextField
        name="name"
        value='some text'
        control={control}
        isRequired={true}
        words={['test']}
        isCheckUniqueWord={true}
      />
    )
  }

  it('Check required error message', async () => {
    render(<Component />)

    const input = screen.getByTestId('text-field')

    fireEvent.change(input, {
      target: {
        value: '',
      }
    })

    const error = await screen.findByText('Field is required!')

    expect(error).toMatchSnapshot()
  })

  it('Check already exist error message', async () => {
    render(<Component />)

    const input = screen.getByTestId('text-field')

    fireEvent.change(input, {
      target: {
        value: 'test',
      }
    })

    expect(input).toHaveValue('test')

    const error = await screen.findByTestId('text-field-error')

    expect(error).toMatchSnapshot()
  })
})
