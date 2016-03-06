import { ColumnsMobile, Column } from './ColumnsMobile'

const PersonalInfo = function({name, biography}){
  return (
    <ColumnsMobile >
       <Column className='is-8 is-offset-2-desktop'>
         <h4 className="title is-5">{name}</h4>
         <h5 className="subtitle is-6">{biography}</h5>
       </Column>
     </ColumnsMobile>
  )
}

export default PersonalInfo
