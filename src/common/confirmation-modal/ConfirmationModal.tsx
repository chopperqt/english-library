import { Button, Typography } from "antd"

import ModalContainer from "@components/ModalContainer"

const { Text } = Typography

export interface ConfirmationModalProps {
  text: string
  onClick: () => void
  isOpened: boolean
  onClose: () => void
  isLoading?: boolean
  textAccept: string
  textCancel: string
}
export const ConfirmationModal = ({
  onClick,
  isOpened,
  onClose,
  isLoading,
  text,
  textAccept,
  textCancel,
}: ConfirmationModalProps) => (
  <ModalContainer
    isOpened={isOpened}
    onClose={onClose}
  >
    <div data-testid="agreement-content" className="flex flex-col">
      <Text className="text-2xl text-center w-full">
        {text}
      </Text>
      <div className="flex gap-3 mt-5 justify-center">
        <Button
          type="primary"
          size="large"
          onClick={onClick}
          loading={isLoading}
        >
          {textAccept}
        </Button>
        <Button
          onClick={onClose}
          type="primary"
          size="large"
        >
          {textCancel}
        </Button>
      </div>
    </div>
  </ModalContainer>
)
