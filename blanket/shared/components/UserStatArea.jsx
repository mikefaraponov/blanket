import {ColumnsMobile, Column} from './ColumnsMobile'
import {Link} from 'react-router'
const UserStatArea = function({avatar, blanks_count, following_count, followers_count, userId}){



  return <ColumnsMobile>
          <Column className="is-quarter-mobile v-magic is-offset-2-desktop is-2-desktop">
            <figure className="image is-64x64">
              <img height="64px" width="64px" src={API + avatar} alt="HEllo"/>
            </figure>
          </Column>
          <Column className={"is-quarter-mobile v-magic  is-2-desktop " }>
            <p className="heading capitilize">Blanks</p>
            <p className={"title is-4 " + ((blanks_count > 0 )?'good-link':'bad-link')}>{blanks_count || 0}</p>
          </Column>
          <Column className="is-quarter-mobile v-magic  is-2-desktop">
            <Link to={"/id" + (userId) + "/following"} className={"is-text-centered"}>
              <p className="heading capitilize">Following</p>
              <p className={"title is-4 " + ((following_count > 0 )?'good-link':'bad-link')}>{following_count || 0}</p>
            </Link>
          </Column>
          <Column className="is-quarter-mobile v-magic  is-2-desktop">
            <Link to={"/id" + (userId) + "/followers"} className={"is-text-centered" }>
              <p className="heading capitilize">Followers</p>
              <p className={"title is-4 " + ((followers_count > 0 )?'good-link':'bad-link')}>{followers_count || 0}</p>
            </Link>
          </Column>
      </ColumnsMobile>
      
}

export default UserStatArea
