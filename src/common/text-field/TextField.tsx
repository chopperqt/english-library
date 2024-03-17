import { useController } from "react-hook-form"

import Input from "@components/Input"
import { FIELD_REQUIRED_TEXT } from '@helpers/texts'

import { checkUniqueWord } from './helpers/checkUniqueWord'

export interface TextFieldProps {
  name: string
  control?: any
  placeholder?: string
  value?: string
  isRequired?: boolean
  className?: string
  type?: string
  defaultValue?: string
  isCheckUniqueWord?: boolean
  words?: string[]
  shouldFocus?: boolean
  pattern?: {
    value: string | RegExp
    message: string
  }
}

const ALREADY_EXIST_TEXT = 'The word already exists'

const TextField = ({
  name,
  placeholder,
  control,
  isRequired = false,
  pattern,
  className,
  value,
  type = 'input',
  isCheckUniqueWord = false,
  words = [],
}: TextFieldProps) => {
  let defaultRules: { [key: string]: unknown } = {
    required: {
      value: isRequired,
      message: FIELD_REQUIRED_TEXT,
    },
  }

  if (pattern) {
    defaultRules = {
      ...defaultRules,
      pattern,
    }
  }

  if (isCheckUniqueWord) {
    defaultRules = {
      ...defaultRules,
      validate: {
        isWordUnique: (str: string): boolean => checkUniqueWord(str, words)
      }
    }
  }

  const {
    field: {
      onChange,
      value: fieldValue = '',
      ref,
      onBlur,
    },
    fieldState: {
      error,
    },
  } = useController({
    control,
    name,
    rules: defaultRules,
    defaultValue: value,
  })

  return (
    <div className={`h-14 ${className}`}>
      <Input
        data-testid="text-field"
        ref={ref}
        onBlur={onBlur}
        value={fieldValue}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        type={type}
      />
      {error?.type === 'isWordUnique' && (
        <div
          className='text-sm text-rose-700 flex'
          data-testid="text-field-error"
        >
          {ALREADY_EXIST_TEXT}
        </div>
      )}
      {error?.message && (
        <div
          className='text-sm text-rose-700 flex'
          data-testid="text-field-error"
        >
          {error.message}
        </div>
      )}
    </div>
  )
}

export default TextField
