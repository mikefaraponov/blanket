
function Control(props){
  return <p className={`control ${props.className || ""}`} style={props.style}>
      { props.children }
  </p>
}

export default Control;
