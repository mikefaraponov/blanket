
import Control from './Control'
import { ColumnsMobile, Column } from './ColumnsMobile'

import {Link} from 'react-router'

const Comment = function({avatarUrl, author, email, body, userId}){
  return <article className="comment">
            <div className="media">
              <div className="media-left">
                <figure className="image is-32x32">
                  <Link to={`/id${userId}`}><img height="32px" width="32px" src={API + avatarUrl}/></Link>
                </figure>
              </div>
              <div className="media-content">
              
                <p className="title is-5">{author}</p>
                <p className="subtitle is-6">
                  <Link to={`/id${userId}`}>{email}</Link>
                </p>
              </div>
            </div>
            <div className="content">
              {body}
            </div>
        </article>
}

const Blank = React.createClass({
  getInitialState: function() {
      return {
          toggleCommentForm: false
      }
  },

  handleSendComment: function(){
    this.props.handleMakeComment(this.props.blankId, this.props.index,  this.refs.comment.value )
    this.setState({toggleCommentForm: !this.state.toggleCommentForm})
    // this.refs.comment.value = ''
  },

  render: function(){
    const {comments, index, imageSrc, handleMakeComment, blankId, isLiked, likesCount, onLike, likeId, userId} = this.props;
    function toggleCommentArea(){
    this.setState({toggleCommentForm: !this.state.toggleCommentForm});
  }
    var element = (<a 
              className="button is-info is-outlined" 
              onDoubleClick={toggleCommentArea.bind(this)}>
              <i className="fa fa-thumb-tack "></i> Comment
            </a>)

    var element2 = <div>
              <a 
                className="button is-success is-outlined " 
                onClick={this.handleSendComment}>
                <i className="fa fa-paper-plane "></i>&nbsp;
              </a>
              &nbsp;
              <a 
                className="button is-info is-outlined" 
                onClick={toggleCommentArea.bind(this)}
                style={{marginLeft: '5px'}}>
                <i className="fa fa-compress"></i> Close
              </a>
            </div>

    return <div className="column">
              <div className="card" style={{margin: '0 auto'}}>
                  <div className="card-image">

                    <figure className="image is-4by3">
                      <img src={API + imageSrc}/>
                    </figure>
                  </div>



                  <div className="card-content">
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
                       <a className="button is-danger is-outlined is-pulled-right" onClick={()=>{
                        onLike(userId, blankId, likeId, index)
                      }}>
                         <i className={`fa fa-thumbs${(this.props.isLiked)?'':'-o'}-up`}></i> {this.props.likesCount}
                       </a>
                    </Column>
                  </ColumnsMobile>
                  
                  </div>
                </div>
           </div>


  }
})

export default Blank
