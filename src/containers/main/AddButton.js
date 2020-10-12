import React from 'react';
import Button from '@material-ui/core/Button';
const AddButton = ({buttonText,buttonClassName,handleClick}) => {

    return (
        <Button variant="outlined" className={buttonClassName} onClick={handleClick}>
          + Add {buttonText}
        </Button>
    )
} 
export default AddButton;