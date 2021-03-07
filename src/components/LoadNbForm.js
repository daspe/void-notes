import React from 'react';
import {
  Form,
  FormControl,
  Button
} from 'react-bootstrap';

function LoadNbForm({ onChange, onSubmit, onCreateNb }) {
  return (
    <Form inline>
      <Button
        variant="outline-success"
        size="sm"
        className="mr-2 mb-2"
        onClick={onCreateNb}
      >+ New Notebook</Button>
      <FormControl
        type="text"
        placeholder="Enter Notebook Key"
        size="sm"
        className="mr-2 mb-2"
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <Button
        variant="outline-secondary"
        size="sm"
        className="mr-2 mb-2"
        onClick={onSubmit}
      >Load</Button>
    </Form>
  );
}

export default LoadNbForm;