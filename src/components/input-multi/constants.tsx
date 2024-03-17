import type { CSSObjectWithLabel } from 'react-select'

export const DefaultStyles = "w-full px-2 py-1 outline-transparent text-lg focus:border-2 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-2 border-gray-300 rounded-md "

export const customStyles = {
  control: (provide: CSSObjectWithLabel) => ({
    ...provide,
    border: '2px solid rgb(209 213 219)', //rgb(99 102 241)'
    borderRadius: '0.375rem',
    outline: 'none',
    width: '100%',
  }),
}

export const Components = {
  DropdownIndicator: null,
}