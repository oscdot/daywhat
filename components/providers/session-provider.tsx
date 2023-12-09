import * as SecureStore from 'expo-secure-store'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const SessionContext = createContext(undefined as any)

export function useSessionId(): string | null {
  return useContext(SessionContext).sessionId
}

export function useSetSessionId(): (sessionId: string | null) => void {
  return useContext(SessionContext).setSessionId
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionIdState] = useState<string | null>(null)

  useEffect(() => {
    getSavedSessionId().then(setSessionIdState)
  }, [])

  const setSessionId = useCallback(
    (value: string | null) => {
      setSavedSessionId(value)
      setSessionIdState(value)
    },
    [setSessionIdState],
  )
  return (
    <SessionContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </SessionContext.Provider>
  )
}

async function getSavedSessionId() {
  return SecureStore.getItemAsync('sessionId')
}

export async function setSavedSessionId(sessionId: string | null) {
  if (sessionId == null) {
    SecureStore.deleteItemAsync('sessionId')
  } else {
    SecureStore.setItemAsync('sessionId', sessionId)
  }
}
