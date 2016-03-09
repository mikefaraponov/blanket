import Header from '../components/Header'
import {connect} from 'react-redux'
import {logoutUser} from '../redux/actions/Logout'
import Icon from '../components/Icon'

@connect($=>$)
class App extends React.Component {
  render(){
    const {dispatch, children} = this.props
    return (
      <main id="blanket">
        <Header onLogout={()=>dispatch(logoutUser())} onCreateBlank={function(){console.log('Universal')}}/>
        {children}
        
        <footer className="app-footer">Powered by &copy;&nbsp;
         <a className="power-source" href="//mikefaraponov.github.io">Mishko F.</a>&nbsp;and&nbsp;
          <Icon fa='stack-overflow'/>&nbsp;
          <Icon fa='github'/>&nbsp;
          <Icon fa='css3'/>&nbsp;
          <Icon fa='html5'/>&nbsp;
        </footer>
      </main>
    );
  }
}
export default App
