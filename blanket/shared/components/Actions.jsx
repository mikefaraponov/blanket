import { ColumnsMobile, Column } from './ColumnsMobile'

const Actions = function({onSubscribe, isFollowing}){
  return <ColumnsMobile >
          <Column className="is-4-desktop is-offset-2-desktop">
              <button className={`button ${(isFollowing)?'is-primary':'is-success'} is-fullwidth is-outlined`} onClick={onSubscribe}>
                <i className={`fa ${(isFollowing)?'fa-chain-broken':'fa-link'}`}></i> {(isFollowing)?'Unsubscribe':'Subscribe'}
              </button>
          </Column>
          <Column className="is-4-desktop">
              <button className="button is-success is-fullwidth is-disabled">
                <i className="fa fa-envelope-o"></i> Send a message
              </button>
          </Column>
         </ColumnsMobile>
}

export default Actions


