import {Link, IndexLink } from 'react-router'

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
                        <strong style={{"fontSize": '1.5em'}}><i className="fa fa-map-o"></i> blanket</strong>
                    </Link>
                    <Link className="header-tab" to="/search" activeClassName="is-active">
                        Search
                    </Link>
                </div>

                <span className={"header-toggle " + active} onClick={::this.toggleMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>

                <div className={"header-right header-menu " + active} >
                  <span className="header-item">
                    <Link to='/edit' onClick={::this.hideMenu}><i className="fa fa-pencil-square-o"></i>&nbsp;Edit Profile</Link>
                  </span>
                  <span className="header-item">
                    <a href="#"><i className="fa fa-info-circle"></i>&nbsp; About</a>
                  </span>
                  <span className="header-item ">
                    <a href="#" className="is-disabled"><i className="fa fa-inbox"></i>&nbsp; Inbox</a>
                  </span>
                  <span className="header-item">
                    <a className="button" onClick={this.props.onLogout}>Log out</a>
                  </span>
                </div>
            </div>
        </header>
    }

}

export default Header;
