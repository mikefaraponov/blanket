import Control from './Control'
import {ColumnsMobile, Column} from './ColumnsMobile'


const PostButton = React.createClass({
  getInitialState() {
      return {
          togglePostForm: true
      };
  },
  handleFile(ev) {
        ev.preventDefault();

        const { onMakePost } = this.props,
                reader = new FileReader(),
                file = ev.target.files[0];

        reader.onload = stream => {
          onMakePost(stream.target.result, file.name);
          this.setState({togglePostForm: false})
        }

        if(file instanceof Blob) reader.readAsDataURL(file);
  },
  toggleForm(){
    this.props.onTransactionEnd();
    this.setState({togglePostForm: true})
  },
  render(){
    const {togglePostForm} = this.state;
    const {onSendBlank, attachName} = this.props
    return (
      <ColumnsMobile>
        <Column className='is-8-desktop is-offset-2-desktop'>
        {
          (togglePostForm)?
          <label className="button is-outlined is-primary is-fullwidth">
            <i className="fa fa-picture-o"></i>&nbsp; Make a blank
            <input 
              onChange={this.handleFile} 
              type="file" 
              ref="file2" 
              style={ {"display":"none"} }
            />
          </label>:
          [
            <Control key="0">
              <textarea ref="comment" className="textarea" placeholder="Type your idea and attach an image..."></textarea>
            </Control>,
            <Control key="1">
              <button 
                className="button is-success is-outlined" 
                onClick={()=>{onSendBlank(this.refs.comment.value); this.toggleForm()}}>
                  <i className="fa fa-paper-plane"></i>&nbsp;
              </button>&nbsp;
              <label className="button is-primary is-outlined" >
                <i className="fa fa-paperclip"></i> {attachName + '...'}
                <input onChange={this.handleFile} 
                  type="file" 
                  ref="file1" 
                  style={ {"display":"none"} }
                />
              </label>&nbsp;
              <button className="button is-info is-outlined is-pulled-right" onClick={this.toggleForm}>
                <i className="fa fa-compress"></i> Close
              </button>
            </Control>
          ]

        }
        </Column>
      </ColumnsMobile>
    );   
  }
});


export default PostButton
      // let view = [
      //   <Control key="0">
      //     <textarea ref="comment" className="textarea" placeholder="Type your idea and attach an image..."></textarea>
      //   </Control>,
      //   <Control key="1">
      //     <button className="button is-success is-outlined" onClick={()=>{onSendBlank(this.refs.comment.value); this.toggleForm()}}><i className="fa fa-paper-plane"></i>&nbsp;</button>&nbsp;
      //     <label className="button is-primary is-outlined" ><i className="fa fa-paperclip"></i> {attachName + '...'}

      //     <input onChange={this.handleFile} 
      //                type="file" 
      //                ref="file1" 
      //                style={ {"display":"none"} }
      //         />
      //         </label>&nbsp;
      //     <button className="button is-info is-outlined is-pulled-right" onClick={this.toggleForm}><i className="fa fa-compress"></i> Close</button>
      //   </Control>];


      // if(togglePostForm)
      //   view =  <label className="button is-outlined is-primary is-fullwidth"><i className="fa fa-picture-o"></i>&nbsp; Make a blank<input onChange={this.handleFile} 
      //                          type="file" 
      //                          ref="file2" 
      //                          style={ {"display":"none"} }
      //                   /></label>

