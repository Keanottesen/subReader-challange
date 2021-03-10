import React, {useEffect, useState} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const types = [
  'String', 'Number', 'Array', 'Object'
]

function TypeScriptGenerator() {
  const [typeValues, setTypeValues] = useState([{
    type: types[0],
    name: '',
    open: false
  }])
  
  const _types = typeValues.map(t => t.type)
  const startTypeText = _types.toString().replaceAll(',', '<')
  const endTypeText = '>'.repeat(typeValues.length - 1)

  useEffect(() => {
    const indexOfFirstStringOrNumber = typeValues.findIndex(element => element.type === 'String' || element.type === 'Number')
    if (indexOfFirstStringOrNumber !== typeValues.length - 1) {
      const tempArr = [...typeValues]
      tempArr.length = indexOfFirstStringOrNumber + 1
      setTypeValues(tempArr)
    }
  }, [typeValues])
  
  const onToggle = (index, event) => {
    if (event.target.className === 'dropdown-item') {
      return
    }
    
    const newArray = [...typeValues]
    newArray[index].open = !newArray[index].open
    setTypeValues(newArray)
  };

  const onClickDropDown = (chosenType, item, index) => {
    const newArray = [...typeValues]
    const object = {
      type: 'String',
      name: '',
      open: false
    }
    
    newArray[index].type = chosenType
    newArray[index].name = item.name
    newArray[index].open = false

    if ((chosenType === 'Array' || chosenType === 'Object')) {
      setTypeValues([...newArray, object])
    } else {
      setTypeValues(newArray)
    }
  }

  const onInputChange = (event, index) => {
    const newArray = [...typeValues]
    newArray[index].name = event.target.value
    setTypeValues(newArray)
  }
    
  return (
    <div >
      {typeValues.map((item, index) => (
      <div key={index}>
          <div>
            <span>Name: </span>
            <input onChange={event => onInputChange(event, index)}/>
          </div>
          <div>
            <span>Type:</span>
            <Dropdown isOpen={item.open} toggle={(event) => onToggle(index, event)}>
              <DropdownToggle caret>
                {item.type}
              </DropdownToggle>
              <DropdownMenu>
                {types.map(v => (
                <DropdownItem key={v} onClick={() => onClickDropDown(v, item, index)}>
                  {v}
                </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
      </div>
      ))
      }

      <div>
      <span>type {typeValues[0].name} = {startTypeText + endTypeText} </span>
      </div>
    </div>
  );
}

export default TypeScriptGenerator;
