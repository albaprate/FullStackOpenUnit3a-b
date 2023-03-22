const PersonForm = ({onSubmit, nameValue, nameChange, numberValue, numberChange}) => {
  return(
    <form onSubmit={onSubmit}>
  <div>
    name: <input value={nameValue} onChange={nameChange} />
  </div>
  <div>
    number: <input value={numberValue} onChange={numberChange}></input>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
  
}

export default PersonForm;