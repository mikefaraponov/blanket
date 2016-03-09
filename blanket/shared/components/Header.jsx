import {Link, IndexLink } from 'react-router'
import Icon from './Icon'

class Header extends React.Component {

    constructor(...args){
        super(...args);
        this.state = {
            active: false
        }
    }

    toggleMenu(){
        this.setState({active: !this.state.active})
    }

    hideMenu(){
      this.setState({active: false})
    }

    render(){
        
        let id = localStorage.user && JSON.parse(localStorage.user).id;

        let active = this.state.active?'is-active':'';
        return <header className="header" style={{position: 'fixed', width: '100%', top: 0}}>
            <div className="container">
                <div className="header-left">
                    <Link className="header-item logo" to={"/id" + id} >
                        <strong style={{"fontSize": '1.5em'}}><Icon fa="map-o"/> blanket</strong>
                    </Link>
                    <Link className="header-tab" to="/search" activeClassName="is-active">
                        <Icon fa="user-plus"/> Search
                    </Link>
                </div>

                <span className={"header-toggle " + active} onClick={::this.toggleMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>

                <div className={"header-right header-menu " + active} >
                  <span className="header-item">
                    <Link activeClassName="be-active" to='/add' onClick={::this.hideMenu}><Icon fa="camera-retro"/>&nbsp;Make a Blank</Link>
                  </span>
                  <span className="header-item">
                    <Link activeClassName="be-active" to='/edit' onClick={::this.hideMenu}><Icon fa="pencil-square-o"/>&nbsp;Edit Profile</Link>
                  </span>
                  <span className="header-item">
                    <a><Icon fa="info-circle"/>&nbsp; About</a>
                  </span>
                  <span className="header-item ">
                    <a className="is-disabled"><Icon fa="inbox"/>&nbsp; Inbox</a>
                  </span>
                  <span className="header-item">
                    <a className="button is-danger" onClick={this.props.onLogout}><Icon fa="sign-out"/>&nbsp;Log out</a>
                  </span>
                </div>
            </div>
        </header>
    }

}

export default Header;
