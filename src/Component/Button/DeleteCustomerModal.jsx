import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class DeleteCustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '',
    };
  }

  handleChange = (e) => {
    this.setState({ customerId: e.target.value });
  };

  handleDelete = async () => {
    const { customerId } = this.state;
    try {
      await axios.delete(`http://localhost:8080/api/customers/${customerId}`);
      alert(`Customer with ID ${customerId} has been successfully deleted.`);
      this.props.handleDelete(customerId); // Update parent component state or perform any necessary actions
    } catch (error) {
      console.error('Error deleting customer:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  render() {
    const { show, handleClose } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter Customer ID to Delete</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Customer ID"
                value={this.state.customerId}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={this.handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteCustomerModal;
