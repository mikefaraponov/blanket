import { Component } from 'react'
import { Route, IndexRoute, IndexRedirect, Redirect, Link } from 'react-router'
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
import Following from './containers/Following'
import Followers from './containers/Followers'
import store from './redux/store'
const Root = ({children}) => React.Children.only(children);
import { browserHistory } from 'react-router';
import {getUserPageById} from './redux/actions/UserPage'

function getAccess(nextState, replace){
  if (!localStorage.token) {
    replace('/login')
  }
}
function AddBlank(){
  return <h1>Hello!</h1>
}
export default (
  <Route path='/' component={Root}>
      <Route component={Auth} onEnter={()=> {
          delete localStorage.user;
          delete localStorage.token;
          }}>
          <Route path='/join' component={Join} 
          />
          <Route path='/login' component={Login} onLeave={()=>store.dispatch({type: 'CLEAR_FILE'})}/>
      </Route>

      <Route component={App} onEnter={getAccess}>
        <Route 
           onEnter={ (nextState, transition) => store.dispatch({type: 'CLEAR_FILE'}) } 
           path='/id:id' 
           component={User} 
           onLeave={()=>
            store.dispatch({type: 'CLEAR_FILE'})
           }
        />
        <Route path='/search' component={Search} onLeave={()=>store.dispatch({type: 'CLEAR_SEARCH_RESULTS'})}/>
        <Route path='/id:id/followers' component={Followers} onLeave={()=>store.dispatch({type: 'CLEAR_SEARCH_RESULTS'})}/>
        <Route path='/id:id/following' component={Following} onLeave={()=>store.dispatch({type: 'CLEAR_SEARCH_RESULTS'})}/>
        <Route path='/edit' component={EditProfile}/>
        <Route path='/add' component={AddBlank}/>
        <IndexRedirect to={`/id${(localStorage.user)?JSON.parse(localStorage.user).id:''}`} />
      </Route>
      <Route path="*" component={NotFound}/>
  </Route>
);

