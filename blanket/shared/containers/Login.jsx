import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'
import Control from '../components/Control'
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/Login'
import Icon from '../components/Icon'

@connect(state => ({ isFetching: state.user.isFetching, 
    message: state.user.errorMessage }))
class Login extends React.Component {
  handleLogin(ev){
    this.props.dispatch(loginUser({
      email: this.refs.email.value.trim(), 
      password: this.refs.password.value
    }));
  }
  render(){
    const {dispatch} = this.props;
    return (
      <div>
        <h4 className="title">🔒 Login</h4>
        {
          (this.props.message)?

          <div className="notification is-danger">
            <button className="delete" onClick={()=>dispatch({type: 'CLEAR_FAILURE_MESSAGE'})}></button>
            {this.props.message}
          </div> : ''
        }
        <Control className="has-icon">
          <input className="input" ref="email" type="email" placeholder="Email"/>
          <Icon fa="envelope"/>
        </Control>

        <Control className="has-icon">
          <input className="input" ref="password" type="password" placeholder="Password"/>
          <Icon fa="lock"/>
        </Control>

        <Control>
          <button onClick={::this.handleLogin} className={`button is-success ${(this.props.isFetching)?"is-loading":""}`} ><Icon fa="key"/> Login</button>
          &nbsp;
          <Link to="/join" className="button" onClick={()=>dispatch({type: 'CLEAR_FAILURE_MESSAGE'})}><Icon fa="check-square-o"/> Sign up</Link>
        </Control>
      </div>
    );
    
  }
}

export default Login;
