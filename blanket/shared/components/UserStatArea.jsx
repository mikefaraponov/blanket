import {ColumnsMobile, Column} from './ColumnsMobile'

const UserStatArea = function({avatar, blanks_count, following_count, followers_count}){
  return <ColumnsMobile>
          <Column className="is-quarter-mobile v-magic is-offset-2-desktop is-2-desktop">
            <figure className="image is-64x64">
              <img height="64px" width="64px" src={API + avatar} alt="HEllo"/>
            </figure>
          </Column>
          <Column className="is-quarter-mobile v-magic is-2-desktop">
            <p className="heading capitilize">Blanks</p>
            <p className="title is-4">{blanks_count || 0}</p>
          </Column>
          <Column className="is-quarter-mobile v-magic is-2-desktop">
            <p className="heading capitilize">Following</p>
            <p className="title is-4">{following_count || 0}</p>
          </Column>
          <Column className="is-quarter-mobile v-magic is-2-desktop">
            <p className="heading capitilize">Followers</p>
            <p className="title is-4">{followers_count || 0}</p>
          </Column>
      </ColumnsMobile>
      
}

export default UserStatArea
