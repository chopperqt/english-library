import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import {
  render,
  screen,
  cleanup,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Button from 'components/button/Button'

afterEach(cleanup)

it('renders without crashing', () => {
  act(() => {
    const container = document.createElement('div')
    const root = createRoot(container)
    root.render(<Button>Test render without crashing</Button>)
  })
})

it('Check button children as string', () => {
  render(<Button>Render button correctly</Button>)

  expect(screen.getByTestId('button')).toHaveTextContent('Render button correctly')
})

it('Check button children as Element', () => {
  render((
    <Button>
      <div data-testid="button-child"></div>
    </Button>
  ))

  expect(screen.getByTestId('button')).toContainHTML('button-child')
})