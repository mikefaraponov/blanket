import { Link } from 'react-router'

const SearchResult = ({ userId, avatar, name, email, body}) => {
  return <article className="media">
    <figure className="media-left">
      <p className="image is-64x64">
        <Link  to={`/id${userId}`}><img height="64px"  width="64px" src={API + avatar}/></Link>
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{name}</strong> <small>{email}</small>
          <br/>
          {body}
        </p>
      </div>
    </div>
  </article>  
}

export default SearchResult
