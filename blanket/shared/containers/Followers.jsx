import {connect} from 'react-redux'
import UserBox from '../components/UsersBox'
import { getFollowers } from '../redux/actions/Followers'

@connect(mapStateToProps)
class Followers extends React.Component {
  componentWillMount(){
    this.props.dispatch(getFollowers(this.props.id))
  }
  render(){
    return <UserBox users={this.props.followers}/>
  }
}

function mapStateToProps(state, own){
  return {
    followers: state.follow.followers,
    id: own.params.id
  }
}

export default Followers
