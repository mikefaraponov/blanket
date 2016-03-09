import Comment from './Comment'
import Control from './Control'
import { ColumnsMobile, Column } from './ColumnsMobile'


import {Link} from 'react-router'

export const Comment = function({avatarUrl, author, email, body, userId}){
  return <article className="comment">
            <div className="media">
              <div className="media-left">
                <figure className="image is-32x32">
                  <Link to={`/id${userId}`}><img height="32px" width="32px" src={API + avatarUrl}/></Link>
                </figure>
              </div>
              <div className="media-content">
               <p className="s"><strong>{author}</strong><small><Link to={`/id${userId}`}>{email}</Link></small></p> 
              
              </div>
            </div>
            <div className="content">
              {body}
            </div>
        </article>
}

 // default Comment;

export const CommentsArea = React.createClass({
  getInitialState() {
      return {
          toggleCommentForm: false
      }
  },
  handleSendComment(){
    this.props.handleMakeComment(this.props.blankId, this.props.indeX,  this.refs.comment.value )
    // this.refs.comment.value = ''
    this.setState({toggleCommentForm: !this.state.toggleCommentForm})
  },
render(){
  var {comments} = this.props;

  const that = this;

  function toggleCommentArea(){
    this.setState({toggleCommentForm: !that.state.toggleCommentForm});
  }

  function closeCommentArea(){
    that.setState({toggleCommentForm: false});
  }

  var element = (<a 
            className="button is-info is-outlined" 
            onDoubleClick={toggleCommentArea.bind(this)}>
            <i className="fa fa-thumb-tack "></i> Comment
          </a>)
  var element2 = <div>
            <button 
              className="button is-success is-outlined " 
              onDoubleClick={this.handleSendComment}>
              <i className="fa fa-paper-plane "></i>&nbsp;
            </button>
            &nbsp;
            <button 
              className="button is-info is-outlined" 
              onDoubleClick={toggleCommentArea.bind(this)}
              style={{marginLeft: '5px'}}>
              <i className="fa fa-compress"></i> Close
            </button>
          </div>

  return <div className="card-content">
    { 
      comments?comments.map(
        (comment, i) => 
          <Comment key={i} avatarUrl={comment.user.avatar_url} userId={comment.user_id} author={comment.user.name} email={comment.user.email} body={comment.body}/>
      ):null
    }
    {
      (this.state.toggleCommentForm)?
        <ColumnsMobile>
          <Column>
            <Control>
              <textarea className="textarea" ref="comment"></textarea>
            </Control>
          </Column>
        </ColumnsMobile>
        :
        null

    }
    <ColumnsMobile>
      <Column>
        {(!this.state.toggleCommentForm)?element:element2}
      </Column>
      <Column className="is-3">
         <button className="button is-danger is-outlined is-pulled-right" onDoubleClick={()=>(this.props.onLike(this.props.userId, this.props.blankId, this.props.likeId, this.props.indeX))}>
           <i className={`fa fa-thumbs${(this.props.isLiked)?'':'-o'}-up`}></i> {this.props.likesCount}
         </button>
      </Column>
    </ColumnsMobile>
    
  </div>
}
})






