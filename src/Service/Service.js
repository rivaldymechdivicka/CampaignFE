import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getCustomer = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
};

const postCustomer = async (newCustomer) => {
    try {
        const response = await axios.post(`${BASE_URL}/customers/add`, newCustomer);
        return response.data;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
};

const putCustomer = async (customerId, updatedCustomer) => {
    try {
        const response = await axios.put(`${BASE_URL}/customers/${customerId}`, updatedCustomer);
        return response.data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

const deleteCustomerById = async (customerId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/customers/${customerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting customer with ID ${customerId}:`, error);
        throw error;
    }
};

const getCampaign = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/campaigns`);
        return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return [];
    }
};

const getMessage = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/message-logs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

const postMessage = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/message-logs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

const postSendMessage = async (emailData) => {
    try {
        const response = await axios.post(`${BASE_URL}/sendEmail`, emailData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

const postCampaign = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/campaigns`);
        return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return [];
    }
};

const getCampaignById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/campaigns/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching campaign with ID ${id}:`, error);
        return null;
    }
};

const deleteCampaignById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/campaigns/${id}`);
        console.log(`Campaign with ID ${id} deleted successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error deleting campaign with ID ${id}:`, error);
        return null;
    }
};

export {
    getCustomer, postCustomer, deleteCustomerById, getCampaign, getCampaignById,
    postCampaign, deleteCampaignById, putCustomer, getMessage, postMessage, postSendMessage
};
