import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ListGroup, Pagination, Form, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import MainMenu from '../MainMenu';
import MainMenuSide from '../MainMenuSide';
import CreateCampaignModal from '../Button/CreateCampaignModal';
import DeleteCampaignModal from '../Button/DeleteCampaignModal'; // Import DeleteCampaignModal
import axios from 'axios';
import './Campaign.css';

const BASE_URL = 'http://localhost:8080/api';

const getCampaign = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/campaigns`);
        return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return [];
    }
};

const Campaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Tambahkan state untuk mengontrol visibilitas modal penghapusan
    const [campaignIdToDelete, setCampaignIdToDelete] = useState(null); // Tambahkan state untuk menyimpan ID kampanye yang akan dihapus
    const [perPage] = useState(2);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchWarning, setSearchWarning] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCampaigns = async () => {
            const data = await getCampaign();
            setCampaigns(data);
        };

        fetchCampaigns();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        if (email) {
            const fetchCampaignByEmail = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/campaigns?email=${email}`);
                    setSearchResult(response.data);
                } catch (error) {
                    console.error('Error fetching campaign by email:', error);
                }
            };

            fetchCampaignByEmail();
        }
    }, [location.search]);

    const startIndex = (currentPage - 1) * perPage;
    const visibleCampaigns = campaigns.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(campaigns.length / perPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleShowDeleteModal = (campaignId) => { // Fungsi untuk menampilkan modal penghapusan
        setCampaignIdToDelete(campaignId);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false); // Fungsi untuk menyembunyikan modal penghapusan

    const handleDelete = async (campaignId) => { // Fungsi untuk memperbarui state setelah penghapusan
        try {
            await axios.delete(`${BASE_URL}/campaigns/${campaignId}`);
            setCampaigns(campaigns.filter(campaign => campaign.campaignId !== campaignId));
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error deleting campaign:', error);
        }
    };

    // Handle search campaign by ID
    const handleSearch = () => {
        const campaign = campaigns.find(c => c.campaignId.toString() === searchId);
        if (campaign) {
            setSearchResult(campaign);
            setSearchWarning('');
        } else {
            setSearchResult(null);
            setSearchWarning(`Campaign with ID ${searchId} not found.`);
        }
    };

    const handleEmailClick = (email) => {
        navigate(`/campaign?email=${email}`);
    };

    return (
        <div className='campaign'>
            <MainMenu />
            <div className='campaign-content'>
                <MainMenuSide />
                <Container>
                    <Col xs={12} md={6} className="d-flex justify-content-start">
                        <p className="mb-0">Paragraph 2 / Campaigns</p>
                    </Col>
                    <Container>
                        <Row className="align-items-center">
                            <Col xs={12} md={6} className="d-flex justify-content-start">
                                <p className="mb-1">Campaign (50)</p>
                            </Col>
                            <Col xs={12} md={6} className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    className="mr-2"
                                    style={{ borderRadius: '15px', marginRight: '25px', width: '190px' }}
                                    onClick={handleShowModal}
                                >
                                    Add Campaign
                                </Button>
                                <Button
                                    variant="danger"
                                    className="mr-2"
                                    style={{ borderRadius: '15px', width: '190px' }}
                                    onClick={() => handleShowDeleteModal(null)} // Menghubungkan tombol dengan fungsi untuk menampilkan modal penghapusan
                                >
                                    Delete Campaign
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row className="mt-3">
                            <Col xs={12} md={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search Campaign by ID"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button
                                    variant="secondary"
                                    style={{ borderRadius: '15px', width: '100%' }}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                        {searchWarning && (
                            <Row className="mt-3">
                                <Col>
                                    <Alert variant="warning">{searchWarning}</Alert>
                                </Col>
                            </Row>
                        )}
                    </Container>
                    <Container>
                        <Row>
                            {searchResult ? (
                                <React.Fragment key={searchResult.campaignId}>
                                    <Col xs={12} className="mb-4">
                                        <Row>
                                            <Col md={6}>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item><strong>Campaign ID :</strong> {searchResult.campaignId}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Campaign Name :</strong> {searchResult.campaignName}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Campaign Code :</strong> {searchResult.campaignCode}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Address :</strong> {searchResult.campaignAddress}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Email :</strong> <a href="#" onClick={() => handleEmailClick(searchResult.campaignEmail)}>{searchResult.campaignEmail}</a></ListGroup.Item>
                                                    <ListGroup.Item><strong>Phone :</strong> {searchResult.campaignPhone}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Fax :</strong> {searchResult.campaignFax}</ListGroup.Item>
                                                    <ListGroup.Item><strong>NPWP :</strong> {searchResult.campaignNpwp}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Website :</strong> <a href={searchResult.campaignSite} target="_blank" rel="noopener noreferrer">{searchResult.campaignSite}</a></ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                            <Col md={6}>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item><strong>Development Board:</strong> {searchResult.developmentBoard}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Business Field:</strong> {searchResult.businessField}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Sector:</strong> {searchResult.sector}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Subsector:</strong> {searchResult.subSector}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Industry:</strong> {searchResult.industry}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Subindustry:</strong> {searchResult.subIndustry}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Securities Administration Bureau:</strong> {searchResult.securitiesAdministrationBureau}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Recording Date:</strong> {searchResult.campaignRecording}</ListGroup.Item>
                                                    <ListGroup.Item><strong>Active:</strong> {searchResult.isActive ? 'Yes' : 'No'}</ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </React.Fragment>
                            ) : (
                                visibleCampaigns.map((campaign) => (
                                    <React.Fragment key={campaign.campaignId}>
                                        <Col xs={12} className="mb-4">
                                            <Row>
                                                <Col md={6}>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item><strong>Campaign ID :</strong> {campaign.campaignId}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Campaign Name :</strong> {campaign.campaignName}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Campaign Code :</strong> {campaign.campaignCode}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Address :</strong> {campaign.campaignAddress}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Email :</strong> <a href="#" onClick={() => handleEmailClick(campaign.campaignEmail)}>{campaign.campaignEmail}</a></ListGroup.Item>
                                                        <ListGroup.Item><strong>Phone :</strong> {campaign.campaignPhone}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Fax :</strong> {campaign.campaignFax}</ListGroup.Item>
                                                        <ListGroup.Item><strong>NPWP :</strong> {campaign.campaignNpwp}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Website :</strong> <a href={campaign.campaignSite} target="_blank" rel="noopener noreferrer">{campaign.campaignSite}</a></ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item><strong>Development Board:</strong> {campaign.developmentBoard}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Business Field:</strong> {campaign.businessField}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Sector:</strong> {campaign.sector}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Subsector:</strong> {campaign.subSector}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Industry:</strong> {campaign.industry}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Subindustry:</strong> {campaign.subIndustry}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Securities Administration Bureau:</strong> {campaign.securitiesAdministrationBureau}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Recording Date:</strong> {campaign.campaignRecording}</ListGroup.Item>
                                                        <ListGroup.Item><strong>Active:</strong> {campaign.isActive ? 'Yes' : 'No'}</ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </React.Fragment>
                                ))
                            )}
                        </Row>
                    </Container>
                    <Container className="my-3">
                        <Pagination>
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </Container>
                </Container>
            </div>
            <CreateCampaignModal show={showModal} handleClose={handleCloseModal} />
            {campaignIdToDelete && (
                <DeleteCampaignModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    campaignId={campaignIdToDelete}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Campaign;
