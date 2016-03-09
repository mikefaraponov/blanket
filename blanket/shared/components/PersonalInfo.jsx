import { ColumnsMobile, Column } from './ColumnsMobile'

const PersonalInfo = function({name, biography, email, children}){
  return (
    <ColumnsMobile >
       <Column className='is-8-desktop is-offset-2-desktop'>
        <div className='box' id='personal-info'>
        <p className="title is-5">{name} <small>{email || 'example@email.com'}</small></p>
                <p className="subtitle is-6">
{biography}                </p>
         
        </div>
         {children}
       </Column>
     </ColumnsMobile>
  )
}

export default PersonalInfo
