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

export default Comment;
