import { Component } from 'react'
import { Router, Route, IndexRoute, IndexRedirect, Redirect, Link } from 'react-router'
import {connect} from 'react-redux'
import {logoutUser} from './redux/actions/Logout'
import App from './containers/App'
import Join from './containers/Join'
import Login from './containers/Login'
import Auth from './components/Auth'
import NotFound from './components/NotFound'
import User from './containers/User'
import Search from './containers/Search'
import EditProfile from './containers/EditProfile'
import store from './redux/store'
const Root = ({children}) => React.Children.only(children);
import { browserHistory } from 'react-router';
import {getUserPageById} from './redux/actions/UserPage'

function getAccess(nextState, replace){
  if (!localStorage.token) {
    replace('/login')
  }
}

export default (
  <Route path='/' component={Root}>
      <Route component={Auth} >
          <Route path='/join' component={Join} onLeave={()=> store.dispatch({type: 'CLEAR_FILE'}) }
          />
          <Route path='/login' component={Login}/>
      </Route>

      <Route component={App} onEnter={getAccess} onLeave={() => {delete localStorage.user;delete localStorage.token}}>
        <Route 
         onEnter={ (nextState, transition) =>{
            store.dispatch({type: 'CLEAR_FILE'})
          }} 

          path='/id:id' 
          component={User} 
          onLeave={()=>
            store.dispatch({type: 'CLEAR_FILE'})
          }
        />
        <Route path='/search' component={Search} onLeave={()=>store.dispatch({type: 'CLEAR_SEARCH_RESULTS'})}/>
        <Route path='/edit' component={EditProfile}/>
        <IndexRedirect to={`/id${(localStorage.user)?JSON.parse(localStorage.user).id:''}`} />
      </Route>
      <Route path="*" component={NotFound}/>
  </Route>
);

