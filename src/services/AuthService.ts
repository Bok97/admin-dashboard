import axios from 'axios';

const LOGIN_URL = `${process.env.REACT_APP_API_URL}/login`;
const LOGOUT_URL = `${process.env.REACT_APP_API_URL}/logout`;

interface LoginSuccessResponse {
    success: true;
    data: {
        username: string;
        token: string;
    };
}

interface LoginFailureResponse {
    success: false;
    error: string;
}

export const login = async (username: string, password: string): Promise<string> => {
    try {
        const response = await axios.post(LOGIN_URL, { username, password });
        
        if (response.data.success) {
            const result: LoginSuccessResponse = response.data;
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('username', result.data.username);
            return 'Login successful';
        } else {
            const errorData: LoginFailureResponse = response.data;
            throw new Error(errorData.error);
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
        throw new Error(errorMessage);
    }
};

export const logout = async (): Promise<string> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post(LOGOUT_URL, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.success) {
            localStorage.removeItem('token');
            return 'Logout successful';
        } else {
            throw new Error('Failed to logout');
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'An unexpected error occurred during logout';
        throw new Error(errorMessage);
    }
};