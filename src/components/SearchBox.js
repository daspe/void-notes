import React, { useState } from 'react';
import {
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

function SearchBox({ onChangeSearchBox }) {
  // Declare state for enteredText using react hook
  const [enteredText, setEnteredText] = useState('');

  return (
    <InputGroup>
      <FormControl
        className=""
        type="search"
        value={enteredText}
        placeholder="Search notes"
        onChange={e => {
          onChangeSearchBox(e);
          setEnteredText(e?.target?.value);
        }}
      />
      <InputGroup.Append>
        <Button 
          type="reset" 
          variant="outline-info"
          onClick={() => {
            onChangeSearchBox('');
            setEnteredText('');
          }}>x</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default SearchBox;