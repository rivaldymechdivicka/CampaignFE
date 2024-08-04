import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainMenu from '../MainMenu';
import MainMenuSide from '../MainMenuSide';
import { Container, Row, Col, Button, Table, Pagination, Form, Alert } from 'react-bootstrap';
import CreateCustomerModal from '../Button/CreateCustomerModal';
import DeleteCustomerModal from '../Button/DeleteCustomerModal';
import EditCustomerModal from '../Button/EditCustomerModal';
import './Customer.css';
import { getCustomer, deleteCustomerById } from '../../Service/Service';

function Customer() {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchWarning, setSearchWarning] = useState('');
  const [editCustomer, setEditCustomer] = useState(null);

  // Close modals
  const handleCloseCreate = () => setShowCreate(false);
  const handleCloseEdit = () => {
    setShowEdit(false);
    fetchData(); // Re-fetch data when closing edit modal
  };
  const handleCloseDelete = () => setShowDelete(false);

  // Show modals
  const handleShowCreate = () => setShowCreate(true);
  const handleShowDelete = () => setShowDelete(true);
  const handleEditClick = (customer) => {
    setEditCustomer(customer);
    setShowEdit(true);
  }

  // Handle delete customer
  const handleDelete = async (customerId) => {
    try {
      await deleteCustomerById(customerId);
      setCustomers(customers.filter(customer => customer.customerId !== customerId));
      if (searchResult && searchResult.customerId === customerId) {
        setSearchResult(null);
      }
    } catch (error) {
      console.error(`Error deleting customer with ID ${customerId}:`, error);
    }
    handleCloseDelete();
  };

  // Fetch and sort customers data when component mounts or when modals are closed
  const fetchData = async () => {
    const data = await getCustomer();
    data.sort((a, b) => a.customerId - b.customerId);
    setCustomers(data);
  };

  useEffect(() => {
    fetchData();
  }, [showCreate, showEdit, showDelete]);

  // Calculate visible customers based on current page and perPage
  const startIndex = (currentPage - 1) * perPage;
  const visibleCustomers = customers.slice(startIndex, startIndex + perPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(customers.length / perPage);

  // Handle search customer by ID
  const handleSearch = () => {
    const customer = customers.find(c => c.customerId.toString() === searchId);
    if (customer) {
      setSearchResult(customer);
      setSearchWarning('');
    } else {
      setSearchResult(null);
      setSearchWarning(`Customer with ID ${searchId} not found.`);
    }
  };

  // Handle click on email
  const handleEmailClick = (email) => {
    navigate(`/campaign?email=${email}`);
  };

  return (
    <div className='customer'>
      <MainMenu />
      <div className='customer-content'>
        <MainMenuSide />
        <Container>
          <Col xs={12} md={6} className="d-flex justify-content-start">
            <p className="mb-0">Paragraph 1 / Customers</p>
          </Col>
          <Container>
            <Row className="align-items-center">
              <Col xs={12} md={6} className="d-flex justify-content-start">
                <p className="mb-1">Customer (50)</p>
              </Col>
              <Col xs={12} md={6} className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="mr-2"
                  style={{ borderRadius: '15px', marginRight: '25px', width: '190px' }}
                  onClick={handleShowCreate}
                >
                  Add Customer
                </Button>
                <Button
                  variant="danger"
                  className="mr-2"
                  style={{ borderRadius: '15px', width: '190px' }}
                  onClick={handleShowDelete}
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
                  placeholder="Search Customer by ID"
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
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name/Company</th>
                  <th>Email Company </th>
                  <th>Country Code</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {searchResult ? (
                  <tr key={searchResult.customerId}>
                    <td>{searchResult.customerId}</td>
                    <td>{searchResult.name}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => handleEmailClick(searchResult.email)}
                      >
                        {searchResult.email}
                      </Button>
                    </td>
                    <td>{searchResult.countryCode}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleEditClick(searchResult)}>Edit</Button>
                    </td>
                  </tr>
                ) : (
                  visibleCustomers.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>{customer.customerId}</td>
                      <td>{customer.name}</td>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => handleEmailClick(customer.email)}
                        >
                          {customer.email}
                        </Button>
                      </td>
                      <td>{customer.countryCode}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleEditClick(customer)}>Edit</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>

            {/* Pagination section */}
            {!searchResult && (
              <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            )}
          </Container>
        </Container>
        <CreateCustomerModal show={showCreate} handleClose={handleCloseCreate} />
        <EditCustomerModal show={showEdit} handleClose={handleCloseEdit} customer={editCustomer} />
        <DeleteCustomerModal show={showDelete} handleClose={handleCloseDelete} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Customer;
