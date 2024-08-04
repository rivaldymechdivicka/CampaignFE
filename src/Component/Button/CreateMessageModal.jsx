import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

class CreateMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderEmail: '',
      recipientEmail: '',
      message: '',
      sendAt: '',
      receivedAt: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSaveChanges = async () => {
    const { senderEmail, recipientEmail, message, sendAt, receivedAt } = this.state;
    const newMessage = {
      senderEmail,
      recipientEmail,
      message,
      sendAt,
      receivedAt
    };

    try {
      const response = await axios.post(`${BASE_URL}/message-logs`, newMessage);
      console.log('Message added successfully:', response.data);

      // Show success alert with message ID
      alert(`Message created successfully! Message ID is ${response.data.messageId}`);

      // Optionally: You can add logic here to update your message list or perform other actions after successful post

      // Close the modal
      this.props.handleClose();
    } catch (error) {
      console.error('Error adding message:', error);
      // Optionally: Handle error state or display error message to the user
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="senderEmail">
              <Form.Label>Sender Email</Form.Label>
              <Form.Control type="email" placeholder="Enter sender's email" onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="recipientEmail">
              <Form.Label>Recipient Email</Form.Label>
              <Form.Control type="email" placeholder="Enter recipient's email" onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter message" onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="sendAt">
              <Form.Label>Send At</Form.Label>
              <Form.Control type="datetime-local" onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="receivedAt">
              <Form.Label>Received At</Form.Label>
              <Form.Control type="datetime-local" onChange={this.handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreateMessageModal;
