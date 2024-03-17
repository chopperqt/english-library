import Button from "@components/button"

const WRONG_TEXT = 'Oops! Something went wrong.'
const TRY_AGAIN_TEXT = 'Try again'

const ErrorContent = () => {
  const handleReloadPage = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="text-3xl mb-5">
        {WRONG_TEXT}
      </div>
      <Button onClick={handleReloadPage}>
        {TRY_AGAIN_TEXT}
      </Button>
    </div>
  )
}

export default ErrorContent
