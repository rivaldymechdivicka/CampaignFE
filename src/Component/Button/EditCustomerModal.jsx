import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { putCustomer } from '../../Service/Service';

function EditCustomerModal({ show, handleClose, customer }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerId) {
      console.error('No customerId provided');
      return;
    }
    try {
      await putCustomer(formData.customerId, formData);
      handleClose();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formCountryCode">
            <Form.Label>Country Code</Form.Label>
            <Form.Control
              type="text"
              name="countryCode"
              value={formData.countryCode || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditCustomerModal;
