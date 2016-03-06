import Header from '../components/Header'
import {connect} from 'react-redux'
import {logoutUser} from '../redux/actions/Logout'

@connect(f => f)
class App extends React.Component {
  render(){
    const {dispatch, children} = this.props
    return (
      <div id="blanket">
        <Header onLogout={() => dispatch(logoutUser())}/>
        {children}
        <footer className="app-footer">Powered by &copy; <a className="power-source" href="//mikefaraponov.github.io">PowerSource</a></footer>
      </div>
    );
  }
}
export default App
