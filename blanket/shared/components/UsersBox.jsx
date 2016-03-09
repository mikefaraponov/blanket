import SearchResult from './SearchResult'
import Page from './Page'
import {ColumnsMobile, Column} from './ColumnsMobile'
import Icon from './Icon'
const UserBox = ({users}) => <Page>
      <ColumnsMobile>
        <Column className="is-6-desktop is-offset-3-desktop">
          {
            users.length?users.map((user, i) => <SearchResult
                                        key={i} 
                                        avatar={user.avatar_url} 
                                        userId={user.id} 
                                        name={user.name} 
                                        email={user.email} 
                                        body={user.biography}
            />
          ):<div className="is-text-centered"><h1 className="title is-3">
         <Icon fa="users"/>
        </h1></div>
          }
        </Column>
      </ColumnsMobile>
    </Page>

export default UserBox
