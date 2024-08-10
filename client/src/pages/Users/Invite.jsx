import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Invite = () => {
  return (
    <div>
        <button><FontAwesomeIcon icon={faPlus}/></button>
        <button><FontAwesomeIcon icon={faMinus}/></button>
    </div>
  )
}

export default Invite