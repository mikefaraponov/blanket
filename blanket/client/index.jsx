import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import store from '../shared/redux/store';
import routes from '../shared/routes';
// import styles from 'bulma'

render(

  <Provider store={store}>
    <Router children={routes} history={browserHistory}/>
  </Provider>, 

  document.getElementById('root') 

);
