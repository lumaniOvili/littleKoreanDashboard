// src/utils/apiService.js
import axios from 'axios';

// Backend API base URL
const API_BASE_URL = "http://localhost:5000/api"; 

// Update reservation status
export const updateReservationStatus = async (reservationId, status) => {
  try {
    const response = await fetch(`${API_URL}/${reservationId}`, {
      method: "PUT", // HTTP method to update the reservation
      headers: {
        "Content-Type": "application/json", // Sending JSON data
      },
      body: JSON.stringify({ status }), // Send the new status in the request body
    });

    if (!response.ok) {
      throw new Error("Failed to update reservation status");
    }

    const updatedReservation = await response.json(); // Get the updated reservation data from the response
    return updatedReservation; // Return the updated reservation
  } catch (error) {
    console.error("Error updating reservation status:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    // Make PUT request to update the order's status
    const response = await fetch(`${API_URL}/${orderId}`, {
      method: "PUT", // HTTP method to update the resource
      headers: {
        "Content-Type": "application/json", // Send JSON data
      },
      body: JSON.stringify({ status }), // Send the new status as the request body
    });
    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error("Failed to update order status");
    }
    // Return the updated order data
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Fetch menu items from the backend
export const fetchMenuItems = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/menu"); 
    if (!response.ok) {
      throw new Error("Failed to fetch menu items");
    }
    const data = await response.json(); // Parse the JSON response
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error; 
  }
};


// Add a new menu item to the backend
export const addMenuItem = async (newItem) => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    if (!response.ok) {
      throw new Error("Failed to add menu item");
    }
    return await response.json(); // Return the added item
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update an existing menu item on the backend
export const updateMenuItem = async (updatedItem) => {
  try {
    const response = await fetch(`${API_URL}/items/${updatedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    if (!response.ok) {
      throw new Error("Failed to update menu item");
    }
    return await response.json(); // Return the updated item
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a menu item from the backend
export const deleteMenuItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete menu item");
    }
    return await response.json(); // Return a success message or the deleted item
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch all orders from the backend API
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data; // Return orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Throw error to handle in the component
  }
};

// Create a new order through the backend API
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data; // Return created order
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Delete an order by ID through the backend API
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
    return response.data; // Return deleted order data
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

// Fetch all reservations from the backend API
export const fetchReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations`);
    return response.data; // Return reservations
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

// Create a new reservation through the backend API
export const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, reservationData);
    return response.data; // Return created reservation
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

// Delete a reservation by ID through the backend API
export const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/reservations/${reservationId}`);
    return response.data; // Return deleted reservation data
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};

// Fetch traffic stats (orders, new vs returning users, etc.) from the backend API
export const fetchTrafficStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/traffic-stats`); // Replace with the correct endpoint for traffic stats
    return response.data; // Return data from the response
  } catch (error) {
    console.error("Error fetching traffic stats:", error);
    throw error; // Throw error to handle in the component
  }
};
