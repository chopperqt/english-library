import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

interface CommonProviderProps {
  children: React.ReactNode
}

interface ContextProps {
  layoutWidth: number,
  setLayoutWidth: (width: number) => void
}

export const CommonContext = createContext<ContextProps>({
  layoutWidth: 0,
  setLayoutWidth: () => { },
})


export const CommonProvider = ({ children }: CommonProviderProps) => {
  const [state, setState] = useState({
    layoutWidth: 0
  })

  const setLayoutWidth = useCallback((width: number) => {
    setState((prevState) => ({
      ...prevState,
      width,
    }))
  }, [state])

  const getValues = useCallback(() => ({
    setLayoutWidth,
    ...state,
  }), [state, setLayoutWidth])

  return (
    <CommonContext.Provider value={getValues()}>
      {children}
    </CommonContext.Provider>
  )
}

export const useCommon = () => {
  const context = useContext(CommonContext)

  return context
}
