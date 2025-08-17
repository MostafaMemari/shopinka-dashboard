import { isEqual } from '@/utils/helder'
import type { UseQueryStatesKeysMap, Values } from 'nuqs'
import { useQueryStates } from 'nuqs'
import { useCallback, useMemo } from 'react'

export function useQuerySetState<T extends UseQueryStatesKeysMap>(config: T, options?: { history?: 'push' | 'replace' }) {
  const [state, setState] = useQueryStates(config, {
    history: options?.history ?? 'replace'
  })

  const initialState: Values<T> = useMemo(() => {
    return Object.fromEntries(Object.entries(config).map(([key, parser]) => [key, (parser as any).defaultValue ?? null])) as Values<T>
  }, [config])

  const canReset = !isEqual(state, initialState)

  const setField = useCallback(
    <K extends keyof Values<T>>(name: K, value: Values<T>[K]) => {
      setState({ [name]: value } as Partial<Values<T>>)
    },
    [setState]
  )

  const onResetState = useCallback(() => {
    setState(initialState)
  }, [initialState, setState])

  return useMemo(
    () => ({
      state,
      setState,
      setField,
      onResetState,
      canReset
    }),
    [state, setState, setField, onResetState, canReset]
  )
}
