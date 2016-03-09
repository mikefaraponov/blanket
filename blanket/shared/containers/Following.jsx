import {connect} from 'react-redux'
import UserBox from '../components/UsersBox'
import { getFollowing } from '../redux/actions/Following'

@connect((state, own) => ({
  following: state.follow.following,
  id: own.params.id
}))
class Following extends React.Component {
  componentWillMount(){
    this.props.dispatch(getFollowing(this.props.id))
  }
  render(){
    return <UserBox users={this.props.following}/>
  }
}

export default Following
