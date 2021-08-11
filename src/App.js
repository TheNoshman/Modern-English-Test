import './css/App.css';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Layout from './views/Layout';

function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <Layout />
    </Router>
  );
}

export default App;
