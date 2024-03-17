import { useController } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

import {
  FIELD_REQUIRED_TEXT,
  UNACCEPTABLE_SYMBOL_TEXT,
} from '@helpers/texts'

import {
  Components,
  customStyles,
} from './constants'
import useInputMulti from './hooks/useInputMulti'

import type { InputMultiProps, Option } from '.'

const InputMulti = ({
  placeholder = '',
  control,
  name,
  defaultValue = [],
}: InputMultiProps) => {
  const {
    field: {
      value: fieldValue,
      onChange,
    },
    fieldState: {
      error,
    },

  } = useController({
    control,
    name,
    defaultValue,
    rules: {
      minLength: {
        value: 1,
        message: FIELD_REQUIRED_TEXT,
      },
      pattern: {
        value: /^[а-яА-ЯёЁ\s]+$/,
        message: UNACCEPTABLE_SYMBOL_TEXT,
      },
      validate: {
        isEmptyWords: (v) => validateForEmpty(v),
        unacceptableSymbol: (v) => unacceptableSymbol(v as Option[])
      }
    }
  })

  const {
    handleChange,
    handleInputChange,
    handleKeyDown,
    inputValue,
    validateForEmpty,
    unacceptableSymbol,
  } = useInputMulti({
    onChange,
    value: fieldValue,
  })

  return (
    <div>
      <CreatableSelect
        className='w-full'
        styles={customStyles}
        components={Components}
        isClearable={true}
        isMulti={true}
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        inputValue={inputValue}
        value={fieldValue}
      />
      {error?.type === 'isEmptyWords' && (
        <div className='text-sm text-rose-700'>{FIELD_REQUIRED_TEXT}</div>
      )}
      {error?.type === 'unacceptableSymbol' && (
        <div className='text-sm text-rose-700'>{UNACCEPTABLE_SYMBOL_TEXT}</div>
      )}
    </div>
  )
}

export default InputMulti
