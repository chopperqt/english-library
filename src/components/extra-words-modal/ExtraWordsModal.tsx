import ModalContainer from "@components/ModalContainer"

interface ExtraWordsModalProps {
  isOpened: boolean
  onClose: () => void
  words: string[]
}
const ExtraWordsModal = ({
  isOpened = false,
  onClose,
  words,
}: ExtraWordsModalProps) => (
  <ModalContainer
    isOpened={isOpened}
    onClose={onClose}
  >
    {words.map((word, index) => (
      <div
        key={index}
        className="text-1xl"
      >
        {index + 1}. {word}
      </div>
    ))}
  </ModalContainer>
)

export default ExtraWordsModal
