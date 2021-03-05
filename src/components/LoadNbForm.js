import React from 'react';
import {
  Form,
  FormControl,
  Button
} from 'react-bootstrap';

function LoadNbForm({ onChange, onSubmit }) {
  return (
    <Form inline>
      <FormControl
        type="text"
        placeholder="Enter Notebook Key"
        size="sm"
        className="mr-sm-2"
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <Button variant="outline-secondary" size="sm" onClick={onSubmit}>Load</Button>
    </Form>
  );
}

export default LoadNbForm;