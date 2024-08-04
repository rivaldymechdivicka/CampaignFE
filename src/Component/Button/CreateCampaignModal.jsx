import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

class CreateCampaignModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: '',
      campaignCode: '',
      campaignAddress: '',
      campaignEmail: '',
      campaignPhone: '',
      campaignFax: '',
      campaignNpwp: '',
      campaignSite: '',
      developmentBoard: '',
      businessField: '',
      sector: '',
      subSector: '',
      industry: '',
      subIndustry: '',
      securitiesAdministrationBureau: '',
      campaignRecording: '',
      isActive: false
    };
  }

  handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    this.setState({
      [id]: type === 'checkbox' ? checked : value
    });
  }

  handleSaveChanges = async () => {
    const {
      campaignName, campaignCode, campaignAddress, campaignEmail,
      campaignPhone, campaignFax, campaignNpwp, campaignSite,
      developmentBoard, businessField, sector, subSector, industry,
      subIndustry, securitiesAdministrationBureau, campaignRecording, isActive
    } = this.state;

    const newCampaign = {
      campaignName, campaignCode, campaignAddress, campaignEmail,
      campaignPhone, campaignFax, campaignNpwp, campaignSite,
      developmentBoard, businessField, sector, subSector, industry,
      subIndustry, securitiesAdministrationBureau, campaignRecording, isActive
    };

    try {
      const response = await axios.post(`${BASE_URL}/campaigns`, newCampaign);
      console.log('Campaign added successfully:', response.data);

      // Show success alert with campaign ID
      alert(`Campaign created successfully! Campaign ID is ${response.data.campaignId}`);

      // Optionally: You can add logic here to update your campaign list or perform other actions after successful post

      // Close the modal
      this.props.handleClose();
    } catch (error) {
      console.error('Error adding campaign:', error);
      // Optionally: Handle error state or display error message to the user
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="campaignName">
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Campaign Name" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignCode">
                  <Form.Label>Campaign Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter Campaign Code" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignAddress">
                  <Form.Label>Campaign Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Campaign Address" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignEmail">
                  <Form.Label>Campaign Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter Campaign Email" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignPhone">
                  <Form.Label>Campaign Phone</Form.Label>
                  <Form.Control type="text" placeholder="Enter Campaign Phone" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignFax">
                  <Form.Label>Campaign Fax</Form.Label>
                  <Form.Control type="text" placeholder="Enter Campaign Fax" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignNpwp">
                  <Form.Label>NPWP</Form.Label>
                  <Form.Control type="text" placeholder="Enter NPWP" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignSite">
                  <Form.Label>Website</Form.Label>
                  <Form.Control type="text" placeholder="Enter Website URL" onChange={this.handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="developmentBoard">
                  <Form.Label>Development Board</Form.Label>
                  <Form.Control type="text" placeholder="Enter Development Board" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="businessField">
                  <Form.Label>Business Field</Form.Label>
                  <Form.Control type="text" placeholder="Enter Business Field" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="sector">
                  <Form.Label>Sector</Form.Label>
                  <Form.Control type="text" placeholder="Enter Sector" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="subSector">
                  <Form.Label>Subsector</Form.Label>
                  <Form.Control type="text" placeholder="Enter Subsector" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="industry">
                  <Form.Label>Industry</Form.Label>
                  <Form.Control type="text" placeholder="Enter Industry" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="subIndustry">
                  <Form.Label>Subindustry</Form.Label>
                  <Form.Control type="text" placeholder="Enter Subindustry" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="securitiesAdministrationBureau">
                  <Form.Label>Securities Administration Bureau</Form.Label>
                  <Form.Control type="text" placeholder="Enter Securities Administration Bureau" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="campaignRecording">
                  <Form.Label>Recording Date</Form.Label>
                  <Form.Control type="date" onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="isActive">
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
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

export default CreateCampaignModal;
