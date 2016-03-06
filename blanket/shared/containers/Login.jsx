import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'
import Control from '../components/Control'
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/Login'

@connect(state => ({ isFetching: state.user.isFetching, 
    message: state.user.errorMessage }))
class Login extends React.Component {
  handleLogin(ev){
    ev.preventDefault()
    console.log(this.props)
    const { dispatch } = this.props;
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value
    const creds = {email, password}
    dispatch(loginUser(creds));
  }
  render(){

    return (
      <div>
        <h4 className="title">🔒 Login</h4>
        {
          (this.props.message)?

          <div className="notification is-danger">
            <button className="delete" onClick={()=>this.props.dispatch({type: 'CLEAR_FAILURE_MESSAGE'})}></button>
            {this.props.message}
          </div> : ''
        }
        <Control className="has-icon">
          <input className="input" ref="email" type="email" placeholder="Email"/>
          <i className="fa fa-envelope"></i>
        </Control>

        <Control className="has-icon">
          <input className="input" ref="password" type="password" placeholder="Password"/>
          <i className="fa fa-lock"></i>
        </Control>

        <Control>
          <button onClick={::this.handleLogin} className={`button ${(this.props.isFetching)?"is-loading":""}`} >🔑 Login</button>
          &nbsp;
          <Link to="/join" className="button" onClick={()=>this.props.dispatch({type: 'CLEAR_FAILURE_MESSAGE'})}>&#9745; Sign up</Link>
        </Control>
      </div>
    );
    
  }
}

export default Login;
