import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

class CreateCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      country: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSaveChanges = async () => {
    const { name, email, country } = this.state;
    const newCustomer = { name, email, countryCode: country };

    try {
      const response = await axios.post(`${BASE_URL}/customers/add`, newCustomer);
      console.log('Customer added successfully:', response.data);

      // Show success alert with customer ID
      alert(`Thank you for creating the customer! Customer ID is ${response.data.customerId}`);

      // Optionally: You can add logic here to update your customer list or perform other actions after successful post

      // Close the modal
      this.props.handleClose();
    } catch (error) {
      console.error('Error adding customer:', error);
      // Optionally: Handle error state or display error message to the user
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country </Form.Label>
              <Form.Control type="text" placeholder="Enter Country" onChange={this.handleInputChange} />
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

export default CreateCustomerModal;
