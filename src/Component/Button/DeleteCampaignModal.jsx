import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

class DeleteCampaignModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignId: '',
    };
  }

  handleChange = (e) => {
    this.setState({ campaignId: e.target.value });
  };

  handleDelete = async () => {
    const { campaignId } = this.state;
    try {
      await axios.delete(`${BASE_URL}/campaigns/${campaignId}`);
      alert(`Campaign with ID ${campaignId} has been successfully deleted.`);
      this.props.handleDelete(campaignId); // Update parent component state or perform any necessary actions
      this.setState({ campaignId: '' }); // Reset campaignId after deletion
      this.props.handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting campaign:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  render() {
    const { show, handleClose } = this.props;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter Campaign ID to Delete</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Campaign ID"
                value={this.state.campaignId}
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

export default DeleteCampaignModal;
