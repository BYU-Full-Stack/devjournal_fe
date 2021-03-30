import { Provider } from 'react-redux';
import { GlobalStyles } from './Styles';
import store from './store';
import Nav from './layouts/Nav';
import Pages from './layouts/Pages'
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Router>
          <Nav />
          <Pages />
        </Router>
      </Provider>
    </>
  );
}

export default App;
