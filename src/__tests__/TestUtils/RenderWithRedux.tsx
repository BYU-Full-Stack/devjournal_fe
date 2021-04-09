import { render as rtlRender } from '@testing-library/react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import userReducer from '../../store/reducers/user'

const render = (
    ui: any,
    {
        initialState = {},
        ...renderOptions
    }: {
        initialState?: any,
        store?: any,
        renderOptions?: any
    }
) => {
    const store = createStore(combineReducers({ userReducer }), initialState)
    function Wrapper({ children }: { children: any }) {
        return <Provider store={store}>{children}</Provider>
    }
    // @ts-ignore
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }