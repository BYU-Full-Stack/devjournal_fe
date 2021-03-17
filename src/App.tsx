import React from 'react';
import { Provider } from 'react-redux';
import { GlobalStyles } from './Styles';
import store from './store';
import Router from './layouts/router';

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <div>
          <Router />
        </div>
      </Provider>
    </>
  );
}

export default App;
