import { Provider } from 'react-redux';
import { GlobalStyles } from './styles/GlobalStyles';
import store from './store';
import Nav from './layouts/Nav';
import MyRouter from './layouts/Router'
import Alerts from './components/Alerts/AlertsContainer'
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Alerts />
        <Router>
          <Nav />
          <MyRouter />
        </Router>
      </Provider>
    </>
  );
}

export default App;
