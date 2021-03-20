import React from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button
} from 'react-bootstrap';

function LoadNbForm ({ onChangeNbKey, onSubmitNbKey, onCreateNb }) {
  function handleSubmit(e) {
    e.stopPropagation();
    onChangeNbKey(e);
    if (e.charCode === 13) {
      onSubmitNbKey();
    }
  }

  return (
    <Form as="div" inline>
      <Button
        variant="outline-success"
        size="sm"
        className="mr-2 mb-2"
        onClick={onCreateNb}
      >+ New Notebook</Button>
      <InputGroup className="mb-2">
        <FormControl
          type="text"
          placeholder="Enter Notebook Key"
          size="sm"
          onChange={onChangeNbKey}
          onKeyPress={handleSubmit}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onSubmitNbKey}
          >Load</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default LoadNbForm;