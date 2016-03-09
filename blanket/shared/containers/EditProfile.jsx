import { Router, Route, IndexRoute, Redirect, Link } from 'react-router'
import { connect } from 'react-redux'
import Control from '../components/Control'
import Page from '../components/Page'
import { attachFile } from '../redux/actions/attachFile'
import {ColumnsMobile, Column} from '../components/ColumnsMobile'
import { editUser, deleteUser } from '../redux/actions/Edit'

@connect(state => ({
    message: state.user.errorMessage, 
    file: state.file 
}))
class EditProfile extends React.Component {
    constructor(...args){
        super(...args)
        this.state = {
            sex: JSON.parse(localStorage.user).sex
        }
    }
    destroy(){
        const ok = confirm('Are you sure?');
        const {dispatch} = this.props
        if(ok)
            dispatch(deleteUser())
        else 
            alert('Ok!')
    }
    edit(){
        const {email, name, sex, biography, password} = this.refs
        const {dispatch, file} = this.props
        const user = JSON.parse(localStorage.user)
        dispatch(editUser({
            name: name.value.trim() || user.name,
            email: email.value.trim() || user.email,
            password: password.value,
            sex: sex.checked,
            avatar: file.fileBase64,
            biography: biography.value.trim() || user.biography
        }));
    }
    handleFile(ev) {
        ev.preventDefault();

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
render() {
    const { file, isFetching } = this.props
    const user = JSON.parse(localStorage.user)
    const fileName = file.fileName ? file.fileName : 'Attach your Avatar';
    return (
        <Page>
            <ColumnsMobile>
                <Column className="is-offset-4-desktop is-4-desktop">
                    <Control className="hello">
                        <input ref="email" className="input" type="email" placeholder={user.email}/>
                    </Control>
                    <Control>
                        <input ref="name" className="input" type="text" placeholder={user.name}/>
                    </Control>
                    <Control>
                        <label className="radio">
                            <input  type="radio" ref="sex" name="question" value={false} checked={this.state.sex} onChange={()=>{
                                this.setState({sex: true})
                            }}/> Male
                        </label>
                        <label className="radio">
                            <input type="radio" name="question" value={true} checked={!this.state.sex}  onChange={()=>{
                                console.log(this.state.sex)
                                this.setState({sex: false})
                            }}/> Famale
                        </label>
                    </Control>
                    <Control>
                        <textarea ref="biography" className="textarea" placeholder={user.biography}></textarea>
                    </Control>
                    <Control style={{"overflow":"hidden"}}>
                        <label className="input is-text-centered"  
                               ref="avatar"
                               type="button">
                            <span>{file.fileName || 'Edit Your Avatar'}</span>
                            <input
                                onChange={::this.handleFile} 
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
                        <button onClick={this.edit.bind(this)} 
                                ref="submit" 
                                className={`button is-primary is-outlined ${(this.props.isFetching)?"is-loading":""}`}>
                                <i className="fa fa-edit"></i> Edit
                        </button>
                        &nbsp;
                        <button className="button is-outlined is-danger" onClick={this.destroy.bind(this)}><i className="fa fa-times"></i> Destroy</button>
                    </Control>
                </Column>
            </ColumnsMobile>
        </Page>
    );


}
}

export default EditProfile;

