import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'
import Control from '../components/Control'
import {connect} from 'react-redux';
import Page from '../components/Page'
import {searchUsers} from '../redux/actions/Search'
import {ColumnsMobile, Column} from '../components/ColumnsMobile'
import SearchResult from '../components/SearchResult'
import debounce from 'lodash/debounce'

@connect(mapStateToProps)
class Search extends React.Component {
  constructor(){
    super(...arguments)
    this.debouncedSearch = debounce(::this.goSearch, 350)
  }
  goSearch(ev){
    const {search} = this.refs;
    const {dispatch} = this.props;
    const v = search.value.trim()
    if(v.length) dispatch(searchUsers(v))
    else dispatch({type: 'CLEAR_SEARCH_RESULTS'})
  }
  renderSearchResult(r){
    return (
      <SearchResult 
        key={r.id} 
        avatar={r.avatar_url} 
        userId={r.id} 
        name={r.name} 
        email={r.email} 
        body={r.biography}
      /> 
    )
  }
  render(){
    const { results, isFetching } = this.props
    return (
      <Page>
        <ColumnsMobile>
          <Column className="is-6-desktop is-offset-3-desktop">
            <Control className="has-icon" style={{marginBottom: '20px'}}>
              <input 
                className="input" 
                ref="search" 
                type="search" 
                placeholder="Start typing name..." 
                onChange={this.debouncedSearch}
              />
              <i className="fa fa-search"></i>
            </Control>
            { results.map(this.renderSearchResult) }
          </Column>
        </ColumnsMobile>
      </Page>
    );
    
  }
}

function mapStateToProps(state){
  return { 
    isFetching: state.search.isFetching,
    results: state.search.results 
  }
}

export default Search;
