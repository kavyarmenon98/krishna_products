import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to dynamically inject the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUserAPI = async (userData) => {
  try {
    const { data } = await apiClient.post(`/users/register`, userData);
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed');
    throw error;
  }
};

export const loginUserAPI = async (userData) => {
  try {
    const { data } = await apiClient.post(`/users/login`, userData);
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed');
    throw error;
  }
};

export const getAllProductAPI = async () => {
  try {
    const { data } = await apiClient.get(`/product/all`);
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const getAllProductByCategoryAPI = async (id) => {
  try {
    if (id) {
      const { data } = await apiClient.get(`/product/all?category=${id}`);
      return data;
    }
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const addProductAPI = async (productData) => {
  try {
    const { data } = await apiClient.post(`/product/create`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(data?.message || 'Product created successfully');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add product');
    throw error;
  }
};

export const getProductByIdAPI = async (id) => {
  try {
    const { data } = await apiClient.get(`/product/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const deleteProductByIdAPI = async (id) => {
  try {
    const { data } = await apiClient.delete(`/product/delete/${id}`);
    toast.success(data?.message || 'Product deleted');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete product');
    throw error;
  }
};

export const editProductAPI = async ({ id, formData }) => {
  try {
    const { data } = await apiClient.put(`/product/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(data?.message || 'Product updated successfully');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update product');
    throw error;
  }
};

export const getCartAPI = async () => {
  try {
    const { data } = await apiClient.get(`/cart/getcart`);
    return data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCartAPI = async (productData) => {
  try {
    const payload = {
      ...productData,
      name: productData?.pname || productData?.name,
      productId: productData?._id || productData?.productId || productData?.id,
      image: productData?.image || (productData?.images && productData.images[0]),
    };

    const { data } = await apiClient.post(`/cart/addcart`, payload);
    toast.success(data?.message || 'Added to cart');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to add to cart');
    throw error;
  }
};

export const updateCartQtyAPI = async ({ id, action }) => {
  try {
    const { data } = await apiClient.put(`/cart/update/${id}`, {
      action: action,
    });
    toast.success(data?.message || 'Quantity updated');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update quantity');
    throw error;
  }
};

export const deleteCartItemAPI = async (id) => {
  try {
    const { data } = await apiClient.delete(`/cart/remove/${id}`);
    toast.success(data?.message || 'Item removed');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to remove item');
    throw error;
  }
};

export const clearCartAPI = async () => {
  try {
    const { data } = await apiClient.delete(`/cart/clear/`);
    toast.success(data?.message || 'Cart cleared');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to clear cart');
    throw error;
  }
};

export const createOrderAPI = async (productData) => {
  try {
    const { data } = await apiClient.post(`/payment/createorder`, productData);
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create order');
    throw error;
  }
};

export const verifyPaymentAPI = async (productData) => {
  try {
    const { data } = await apiClient.post(`/payment/verify`, productData);
    toast.success(data?.message || 'Payment verified');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Payment verification failed');
    throw error;
  }
};

export const getMyOrderAPI = async () => {
  try {
    const { data } = await apiClient.get(`/order/myorder`);
    return data;
  } catch (error) {
    console.error("Error fetching my orders:", error);
    throw error;
  }
};

export const getAdminOrderListAPI = async () => {
  try {
    const { data } = await apiClient.get(`/admin/fetchadmin`);
    return data;
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    throw error;
  }
};

export const changeOrderStatusAPI = async ({ id, status }) => {
  try {
    const { data } = await apiClient.put(`/admin/update-status/${id}`, {
      status: status,
    });
    toast.success(data?.message || 'Status updated');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to change status');
    throw error;
  }
};

export const getUserInfoAPI = async () => {
  try {
    const { data } = await apiClient.get(`/users/profile`);
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserInfoAPI = async (address) => {
  try {
    const { data } = await apiClient.put(`/users/update-address/`, {
      address: address,
    });
    toast.success(data?.message || 'Address updated');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update address');
    throw error;
  }
};

export const addReviewAPI = async (reviewData) => {
  try {
    const { data } = await apiClient.post(`/rate/add`, reviewData);
    toast.success(data?.message || 'Review submitted successfully');
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit review');
    throw error;
  }
};

export const getProductReviewsAPI = async (productId) => {
  try {
    const { data } = await apiClient.get(`/rate/productreview/${productId}`);
    return data;
  } catch (error) {
    console.error("Error fetching my reviews:", error);
    throw error;
  }
};



export const getAllReviewsAPI = async () => {
  try {
    const { data } = await apiClient.get(`/rate/allreviews`);
    return data;
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    throw error;
  }
};
