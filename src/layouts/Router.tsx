import { Switch, Route } from 'react-router-dom';
import AdminPanel from '../pages/AdminPanel';
import UserSettings from '../pages/UserSettings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Journal from '../pages/Journal/Journal';
import Error from '../pages/Error';
import CreateJournal from '../pages/Journal/CreateJournal';
import CreateEntry from '../pages/Entry/CreateEntry';
import { useUser } from '../API/AppLogic'

export default function Router() {
  const [user] = useUser();

  return (
    user.username ?
      <Switch>
        <Route path='/admin'>
          <AdminPanel />
        </Route>
        <Route path='/account'>
          <UserSettings />
        </Route>
        <Route path='/:username/journals/create'>
          <CreateJournal />
        </Route>
        <Route path='/:username/journals/:id/entries/create'>
          <CreateEntry />
        </Route>
        <Route path='/:username/journals/:id?'>
          <Journal />
        </Route>
        <Route path='/error'>
          <Error />
        </Route>
        <Route path='/'>
          <Journal />
        </Route>

      </Switch>
      :
      <Switch>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/error'>
          <Error />
        </Route>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
  );
}
