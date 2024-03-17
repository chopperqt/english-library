import InputMulti from "./InputMulti";

export interface Option {
  readonly label: string
  readonly value: string
}

export interface State {
  readonly inputValue: string
  readonly value: readonly Option[]
}

export interface InputMultiProps {
  placeholder?: string
  name: string
  defaultValue?: unknown
  control: any
  isRequired?: boolean
}

export default InputMulti