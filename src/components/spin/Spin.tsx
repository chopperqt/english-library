import './Spin.css'

type Color = 'white' | 'black' | 'indigo'

interface SpinProps {
  width?: number
  height?: number
  color?: Color
}
const Spin = ({
  width,
  height,
  color = 'white'
}: SpinProps) => {
  let formattedClassName = 'lds-dual-ring'

  if (color === 'black') {
    formattedClassName = 'lds-dual-ring black'
  }

  if (color === 'indigo') {
    formattedClassName = 'lds-dual-ring indigo'
  }

  return (
    <div
      className={formattedClassName}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  )
}

export default Spin