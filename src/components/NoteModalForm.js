import React from 'react';
import {
  Form,
  Modal,
  Button,
} from 'react-bootstrap';


class NoteModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.noteModalId,
      title: this.props.noteModalTitle,
      note: this.props.noteModalText,
    };
  }

  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeNote = (event) => {
    this.setState({
      note: event.target.value,
    });
  }

  render() {
    return (
      <Modal
        show={this.props.showNoteModal}
        onHide={this.props.closeNoteModal}
        className="mt-4"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title: </Form.Label>
            <Form.Control 
              type="text"
              onChange={this.onChangeTitle}
              value={this.state.title}
              placeholder="Title (Optional)"
            />
            <Form.Label>Note: </Form.Label>
            <Form.Control 
              as="textarea"
              rows={5}
              onChange={this.onChangeNote}
              value={this.state.note}
              placeholder="Enter text"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {this.props.noteModalEdit ?
            <Button 
              variant="info"
              type="submit"
              onClick={() => this.props.onEditNote(this.state)}
            >Edit</Button>
          : <Button 
              variant="success"
              type="submit"
              onClick={() => this.props.onCreateNote(this.state)}
            >Submit</Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NoteModalForm;