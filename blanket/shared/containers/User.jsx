import {connect} from 'react-redux'
import {Link} from 'react-router'
import Page from '../components/Page'
import UserStatArea from '../components/UserStatArea'
import PersonalInfo from '../components/PersonalInfo'
import Blank from '../components/Blank'
import Actions from '../components/Actions'
import PostButton from '../components/PostButton'
import { attachFile } from '../redux/actions/attachFile'
import { postBlank } from '../redux/actions/Blanks'
import { addComment } from '../redux/actions/Blanks'
import { postLike } from '../redux/actions/Like'
import { destroyLike } from '../redux/actions/Like'
import { postSubscribe } from '../redux/actions/Subscribe'
import { destroySubscribe } from '../redux/actions/Subscribe'
import {ColumnsMobile, Column} from '../components/ColumnsMobile'
import {getUserPageById} from '../redux/actions/UserPage'

@connect(
  (state, own) => ({
    id: own.params.id, 
    profile_id: state.user.user && state.user.user.id,
    profile: state.profile.profile,
    blanks: state.profile.profile.blanks || [],
    hasFile: state.file.fileName,
    file: state.file.fileBase64,
    is_following: state.profile.profile.is_following,
    isFetching: state.profile.isFetching
  })
)

class User extends React.Component {
  
  componentDidMount(){
    const {dispatch, id} = this.props;
    dispatch(getUserPageById(id))
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch, id} = this.props;
    
    if(id !== nextProps.params.id) {
      console.log('What!')
      dispatch(getUserPageById(nextProps.params.id))
    }

  }

  handleSubscribe(ev){
    const {is_following, id, dispatch} = this.props
    if( !is_following ) dispatch(postSubscribe(id));
    else dispatch(destroySubscribe(id))
  }

  onMakePost(image, file_name){
    const {dispatch } = this.props;
    dispatch(attachFile({
      fileBase64: image,
      fileName: file_name
    }));
  }

  handleMakeComment(blank_id, index, comment){
    const { dispatch } = this.props;
    dispatch(addComment(blank_id, index, comment))
  }

  onSendBlank(comment){
      const {dispatch, file} = this.props;
      if(comment.trim()) dispatch(postBlank(JSON.parse(localStorage.user).id, {image: file, body: comment}))
      else dispatch(postBlank(JSON.parse(localStorage.user).id, {image: file}))
  }
  
  onLike(user_id, blank_id, like_id, index ){
      const {dispatch} = this.props;
      if( !like_id )  dispatch(postLike(user_id, blank_id, index));
      else dispatch(destroyLike(user_id, blank_id, like_id, index))
  }

  onTransactionEnd(){
      const {dispatch} = this.props;
      dispatch({type: 'CLEAR_FILE'});
  }

  render(){
    const { hasFile, profile, is_following, blanks, id } = this.props;

    return (
    (!this.props.isFetching)?<Page>
          <UserStatArea 
            avatar={profile.avatar_url} 
            blanks_count={profile.blanks_count} 
            followers_count={profile.followers_count} 
            following_count={profile.following_count}
          />
          <PersonalInfo name={profile.name} biography={profile.biography}/>
          { 
            ((this.props.profile_id && this.props.profile_id) == (this.props.id && this.props.id))?
            <PostButton 
              onMakePost={::this.onMakePost} 
              onTransactionEnd={::this.onTransactionEnd} 
              onSendBlank={::this.onSendBlank} 
              attachName={hasFile && hasFile.substr(0, 8)}
            />
            :
            <Actions onSubscribe={::this.handleSubscribe} isFollowing={is_following}/>
          }
          <div className="columns is-multiline">
          {
            blanks.map((blank, i) => 
              <Blank 
                key={i} 
                index={i} 
                onLike={::this.onLike}
                handleMakeComment={::this.handleMakeComment} 
                userId={id}
                imageSrc={blank.image_url} 
                comments={blank.comments}
                likesCount={blank.likes_count}
                isLiked={blank.is_liked_by_current_user}
                likeId={blank.your_like_id}
                blankId={blank.id}
              />
            )
          }
          </div>
      </Page>
    :null
    );
  }
}
//

export default User


