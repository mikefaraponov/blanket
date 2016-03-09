import { ColumnsMobile, Column } from './ColumnsMobile'
import Icon from './Icon'
const Actions = function({onSubscribe, isFollowing}){
  return <ColumnsMobile >
          <Column className="is-4-desktop is-offset-2-desktop">
              <button className={`button ${(isFollowing)?'is-primary':'is-success'} is-fullwidth `} onClick={onSubscribe}>
                <Icon fa={`${(isFollowing)?'chain-broken':'link'}`}/> {(isFollowing)?'Unsubscribe':'Subscribe'}
              </button>
          </Column>
          <Column className="is-4-desktop">
              <button className="button is-success is-fullwidth is-disabled">
                <i className="fa fa-envelope-o"></i> Message
              </button>
          </Column>
         </ColumnsMobile>
}

export default Actions


