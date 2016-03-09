import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Control from '../components/Control'
import { joinUser } from '../redux/actions/Join'
import { attachFile } from '../redux/actions/attachFile'
import Icon from '../components/Icon'


@connect(state => ({ 
    isFetching: state.user.isFetching, 
    message: state.user.errorMessage, 
    file: state.file 
}))
class Join extends React.Component {
    handleFile(ev) {
        const { dispatch } = this.props,
                reader = new FileReader(),
                file = ev.target.files[0];

        reader.onload = (stream) => {
          dispatch(attachFile({
            fileBase64: stream.target.result ,
            fileName: file.name
          }));
        }

        if(file instanceof Blob) reader.readAsDataURL(file);
    }

    onJoin(){
        const { dispatch, file } = this.props;
        const { name, email, password, confirm, sex, biography, submit } = this.refs;
        const user_params = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value,
            sex: sex.checked,
            avatar: file.fileBase64,
            biography: biography.value
        }

        dispatch(joinUser(user_params))
    
    }

    render() {
        const { file, user, dispatch } = this.props

        const fileName = file.fileName ? file.fileName : 'Attach your Avatar';

        return (
            <div>

                <h4 className="title" >🎯 Join us</h4>
                {
                    (this.props.message)?

                    <div className="notification is-danger">
                      <button className="delete" onClick={
                        ()=>dispatch({type: 'CLEAR_FAILURE_MESSAGE'})
                      }></button>
                      {this.props.message}
                    </div> : ''
                }
                <Control className="hello">
                    <input ref="email" className="input" type="email" placeholder="Email"/>
                </Control>

                <Control>
                    <input ref="name" className="input" type="text" placeholder="Name"/>
                </Control>

                <Control>
                    <label className="radio">
                        <input  type="radio" ref="sex" name="question" value="Male" defaultChecked/>
                        Male
                    </label>
                    <label className="radio">
                        <input type="radio" name="question" value="Female"/>
                        Famale
                    </label>
                </Control>

                <Control>
                    <textarea ref="biography" className="textarea" placeholder="Biography"></textarea>
                </Control>

                <Control style={{"overflow":"hidden"}}>
                    <label className="input is-text-centered"  
                           ref="avatar"
                           type="button">
                        <span>{fileName}</span>
                        <input onChange={::this.handleFile} 
                               type="file" 
                               ref="file" 
                               style={ {"display":"none"} }
                        />
                    </label>
                </Control>

                <Control>
                    <input className="input" ref="password" type="password" placeholder="Password"/>
                </Control>

                <Control>
                    <input className="input" ref="confirm" type="password" placeholder="Confirm your password"/>
                </Control>

                <Control>
                    <button onClick={::this.onJoin} 
                            ref="submit" 
                            className={`button is-primary ${(this.props.isFetching)?"is-loading":""}`}>
                             <Icon fa="check"/>&nbsp;Submit 
                    </button>
                    &nbsp;
                    <Link to="/login" className="button" onClick={()=>this.props.dispatch({type: 'CLEAR_FAILURE_MESSAGE'})}>
                    <Icon fa="unlock-alt"/>&nbsp;Cancel</Link>
                </Control>

            </div>
        );


    }
}

export default Join;

