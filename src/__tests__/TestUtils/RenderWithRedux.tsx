import { render as rtlRender } from '@testing-library/react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userReducer from '../../store/reducers/user'
import alertReducer from '../../store/reducers/alert'

const render = (
    ui: any,
    {
        initialState = {},
        store = createStore(combineReducers({ userReducer, alertReducer }), initialState),
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
        ...renderOptions
    }: {
        initialState?: any,
        store?: any,
        route?: string,
        history?: any,
        renderOptions?: any
    }
) => {
    function Wrapper({ children }: { children: any }) {
        return <Provider store={store}>
            <Router history={history}>{children}</Router>
        </Provider>
    }
    // @ts-ignore
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }