import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditCampaignModal = ({ show, handleClose, campaignId, handleUpdate }) => {
  const [campaign, setCampaign] = useState({
    campaignId: '',
    campaignName: '',
    campaignCode: '',
    // Tambahkan field lainnya sesuai dengan struktur data kampanye Anda
  });

  useEffect(() => {
    if (campaignId) {
      axios.get(`http://localhost:8080/api/campaigns/${campaignId}`)
        .then(response => setCampaign(response.data))
        .catch(error => console.error('Error fetching campaign:', error));
    }
  }, [campaignId]);

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:8080/api/campaigns/${campaign.campaignId}`, campaign)
      .then(response => {
        handleUpdate(response.data); // Panggil fungsi handleUpdate untuk memperbarui data kampanye di state
        handleClose();
      })
      .catch(error => console.error('Error updating campaign:', error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Campaign</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCampaignName">
            <Form.Label>Campaign Name</Form.Label>
            <Form.Control
              type="text"
              name="campaignName"
              value={campaign.campaignName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCampaignCode">
            <Form.Label>Campaign Code</Form.Label>
            <Form.Control
              type="text"
              name="campaignCode"
              value={campaign.campaignCode}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Tambahkan form group lainnya sesuai dengan field yang diperlukan */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCampaignModal;
