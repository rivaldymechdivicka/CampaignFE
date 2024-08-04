import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postSendMessage } from '../../Service/Service';

const CreateSendEmailModal = ({ show, handleClose }) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const handleSendEmail = async () => {
        const emailData = {
            to: to.split(',').map(email => email.trim()),
            subject,
            text,
        };

        try {
            await postSendMessage(emailData);
            alert('Email sent successfully');
            handleClose();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Send Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formEmailTo">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Recipient email(s)"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmailSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmailText">
                        <Form.Label>Message</Form.Label>
                        <ReactQuill
                            value={text}
                            onChange={(value) => setText(value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSendEmail}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSendEmailModal;
