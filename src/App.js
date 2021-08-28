import {Route, Switch} from 'react-router-dom';
import './index.css';
import Register from './register';
import Login from './login';
import mapView from './classmaps'


function App(){
  return (
    <main>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/map" component={mapView} />
      </Switch>
    </main>
  );
}

export default App;