import Header from '../components/Header'
import {connect} from 'react-redux'
import {logoutUser} from '../redux/actions/Logout'
import Icon from '../components/Icon'
import {Column, ColumnsMobile} from '../components/ColumnsMobile'
import Control from '../components/Control'
import { attachFile } from '../redux/actions/attachFile'
import { postBlank } from '../redux/actions/Blanks'
import {routeActions} from 'react-router-redux'

const BlankForm = React.createClass({
  handleFile(ev) {
        const { onMakePost } = this.props,
                reader = new FileReader(),
                file = ev.target.files[0];

        reader.onload = stream => {
          onMakePost(stream.target.result, file.name);
        }
        if(file instanceof Blob) reader.readAsDataURL(file);

  },
  render(){
  const {attachName, onSendBlank, isBlankFetching, onClose} = this.props
  return <section className="section m-magic mb-magic">
            <div className="container">
              <ColumnsMobile>
                <Column className='is-8-desktop is-offset-2-desktop'>
                    <Control>
                      <textarea ref="comment" className="textarea" placeholder="Type your idea and attach an image..."></textarea>
                    </Control>
                    <Control>
                      <button 
                        className={"button is-success " + (isBlankFetching?'is-loading':'')}
                        onClick={ev => {onSendBlank(this.refs.comment.value.trim())}}>
                          <Icon fa="paper-plane"/>&nbsp;
                      </button>&nbsp;
                     <label className="button is-primary is-outlined" >
                <Icon fa="paperclip"/> {((attachName && attachName.substr(0, 8)) || 'Attach') + '..'}
                <input onChange={this.handleFile} 
                  type="file" 
                  
                  style={ {"display":"none"} }
                />
              </label>&nbsp;
                      <button className="button is-info is-outlined is-pulled-right" onClick={onClose}>
                        <Icon fa="compress"/> Close
                      </button>
                    </Control>
                  </Column>
              </ColumnsMobile>
            </div>
          </section>
}}) 

@connect(mapStateToProps)
class App extends React.Component {
  constructor(...args){
    super(...args)
    this.state = {
      toggleMakeBlank: false
    }
  }

  toggleField(){
    this.props.dispatch({type: 'CLEAR_FILE'})
    this.setState({toggleMakeBlank: false})
  }

  onMakePost(image, file_name){
    this
    .props
    .dispatch(attachFile({
      fileBase64: image,
      fileName: file_name
    }));
  }

  onSendBlank(comment){
      const {dispatch, file, id} = this.props;
      if(comment.trim()) dispatch(postBlank(JSON.parse(localStorage.user).id, {image: file, body: comment}, id))
      else dispatch(postBlank(JSON.parse(localStorage.user).id, {image: file}, id))
      this.toggleField();
  }

  render(){
    const {dispatch, children, fileName, isBlankFetching, id} = this.props
    return (
      <main id="blanket">
        <Header onLogout={()=>dispatch(logoutUser())} onCreateBlank={()=>{
          this.props.dispatch(routeActions.push(`/id${JSON.parse(localStorage.user).id}`))
          this.setState({toggleMakeBlank: true})}
        }/>
        
        { (!this.state.toggleMakeBlank && !isBlankFetching || !id )?
          null:<BlankForm 
                isBlankFetching={isBlankFetching}
                attachName={fileName} 
                onMakePost={this.onMakePost.bind(this)} 
                onSendBlank={this.onSendBlank.bind(this)}
                onClose={this.toggleField.bind(this)}
              />
          }

        {children}
        
        <footer className="app-footer">Powered by &copy;&nbsp;
         <a className="power-source" href="//mikefaraponov.github.io">Mishko F.</a>&nbsp;and&nbsp;
          <Icon fa='stack-overflow'/>&nbsp;
          <Icon fa='github'/>&nbsp;
          <Icon fa='css3'/>&nbsp;
          <Icon fa='html5'/>&nbsp;
        </footer>
      </main>
    );
  }
}

function mapStateToProps(state, own){
  return {
    id: own.params.id, 
    file: state.file.fileBase64,
    fileName: state.file.fileName,
    isBlankFetching: state.profile.isBlankFetching
  }
}

export default App
