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
  const [typeText, setTypeText] = useState('')

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
      const insertPosition = typeText.length - 1;
      if (typeText === '') {
        setTypeText(chosenType)
      } else {
        if (typeText === 'Array') {
          setTypeText(`${typeText}<${chosenType}>`)
        } else {
          setTypeText([typeText.slice(0, insertPosition), `<${chosenType}>`, typeText.slice(insertPosition)].join('')) 
        }
      }
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
      <span>type {typeValues[0].name} = </span>
        {typeValues.length === 1
        ? 
        <span>{typeValues[0].type} </span>
        :
        <span>{typeText} </span>
        }
      </div>
    </div>
  );
}

export default TypeScriptGenerator;
