import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import AgreementModal from '../ConfirmationModal'

afterEach(cleanup)

it('AgreementModal test correctly', () => {
  render((
    <AgreementModal
      isOpened={true}
      onClose={() => { }}
      onClick={() => { }}
    />
  ))

  expect(screen.getByTestId('agreement-content')).toBeTruthy()
})

describe('Test AgreementModal click', () => {
  it('test close click', () => {
    const onClose = jest.fn()

    render(
      <AgreementModal
        isOpened={true}
        onClose={onClose}
        onClick={() => { }}
      />
    )

    const cancelButton = screen.getByText('Cancel')

    fireEvent.click(cancelButton)

    expect(onClose).toBeCalled()
  })

  it('test OK button click', () => {
    const onClick = jest.fn()

    render(
      <AgreementModal
        isOpened={true}
        onClose={() => { }}
        onClick={onClick}
      />
    )

    const okButton = screen.getByText('OK')

    fireEvent.click(okButton)

    expect(onClick).toBeCalled()
  })
})


describe('Test AgreementModal loading', () => {
  it('loading change', () => {
    const defaultProps = {
      isOpened: true,
      onClose: () => { },
      onClick: () => { },
    }

    const { rerender } = render(
      <AgreementModal
        {...defaultProps}
        isLoading={true}
      />
    )

    expect(screen.getByTestId('button-spin')).toBeTruthy()

    rerender(
      <AgreementModal
        {...defaultProps}
        isLoading={false}
      />
    )

    expect(screen.queryByTestId('button-spin')).not.toBeTruthy()
  })
})