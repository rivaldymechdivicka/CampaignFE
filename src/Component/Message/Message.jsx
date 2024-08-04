// Message.jsx
import React, { useState, useEffect } from 'react';
import MainMenu from '../MainMenu';
import MainMenuSide from '../MainMenuSide';
import { Container, Row, Col, Button, Table, Pagination, Form, Alert } from 'react-bootstrap';
import CreateMessageModal from '../Button/CreateMessageModal';
import CreateSendEmailModal from '../Button/CreateSendEmailModal'; // Import the new modal
import './Message.css';
import { getMessage } from '../../Service/Service';

function Message() {
    const [messages, setMessages] = useState([]);
    const [showCreateMessageModal, setShowCreateMessageModal] = useState(false);
    const [showCreateSendEmailModal, setShowCreateSendEmailModal] = useState(false); // State for new modal

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getMessage();
        data.sort((a, b) => a.messageId - b.messageId);
        setMessages(data);
    };

    const handleCreateMessageModalClose = () => setShowCreateMessageModal(false);
    const handleCreateMessageModalShow = () => setShowCreateMessageModal(true);

    const handleCreateSendEmailModalClose = () => setShowCreateSendEmailModal(false);
    const handleCreateSendEmailModalShow = () => setShowCreateSendEmailModal(true);

    return (
        <div className='message'>
            <MainMenu />
            <div className='message-content'>
                <MainMenuSide />
                <Container>
                    <Col xs={12} md={6} className="d-flex justify-content-start">
                        <p className="mb-0">Paragraph 3 / Messages</p>
                    </Col>
                    <Container>
                        <Row className="align-items-center">
                            <Col xs={12} md={6} className="d-flex justify-content-start">
                                <p className="mb-1">Messages (50)</p>
                            </Col>
                            <Col xs={12} md={6} className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    className="mr-2"
                                    style={{ borderRadius: '15px', marginRight: '25px', width: '190px' }}
                                    onClick={handleCreateMessageModalShow}
                                >
                                    Add Message
                                </Button>
                                <Button
                                    variant="danger"
                                    className="mr-2"
                                    style={{ borderRadius: '15px', width: '190px' }}
                                >
                                    Delete Customer
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row className="mt-3">
                            <Col xs={12} md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search Message by ID"
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button
                                    variant="secondary"
                                    style={{ borderRadius: '15px', width: '100%' }}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                        {/* Warning message */}
                        <Row className="mt-3">
                            <Col>
                                <Alert variant="warning">Message with ID not found.</Alert>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Table striped bordered hover className="mt-3">
                            <thead>
                                <tr>
                                    <th>Message ID</th>
                                    <th>Sender Email</th>
                                    <th>Recipient Email</th>
                                    <th>Message</th>
                                    <th>Send At</th>
                                    <th>Received At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(message => (
                                    <tr key={message.messageId}>
                                        <td>{message.messageId}</td>
                                        <td>{message.senderEmail}</td>
                                        <td>{message.recipientEmail}</td>
                                        <td>{message.message}</td>
                                        <td>{new Date(message.sendAt).toLocaleString()}</td>
                                        <td>{new Date(message.receivedAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Pagination section */}
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item active>1</Pagination.Item>
                            {/* Repeat Pagination.Item for each page */}
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </Container>
                    <Button
                        variant="primary"
                        className="mr-2"
                        style={{ borderRadius: '15px', width: '190px' }}
                        onClick={handleCreateSendEmailModalShow} // Open new modal
                    >
                        Sending Email Mas Log
                    </Button>
                </Container>
                <CreateMessageModal show={showCreateMessageModal} handleClose={handleCreateMessageModalClose} />
                <CreateSendEmailModal show={showCreateSendEmailModal} handleClose={handleCreateSendEmailModalClose} /> {/* Include new modal */}
            </div>
        </div>
    );
}

export default Message;
