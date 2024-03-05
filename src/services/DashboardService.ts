import axios from 'axios';

const USER_GENDER_SUMMARIES_URL = `${process.env.REACT_APP_API_URL}/dashboard/users-by-gender`;
const USER_STATE_SUMMARIES_URL = `${process.env.REACT_APP_API_URL}/dashboard/users-by-state`;
const USER_AGE_SUMMARIES_URL = `${process.env.REACT_APP_API_URL}/dashboard/users-by-age`;
const PRODUCT_SUMMARIES_URL = `${process.env.REACT_APP_API_URL}/dashboard/product-summaries`;


export interface GenderChartData {
  name: string;
  y: number;
}

export interface GenderChartSummary {
  success: boolean;
  data: GenderChartData[];
}

export interface AgeChartData {
  categories: string[];
  results: number[];
}

export interface AgeChartSummary {
  success: boolean;
  data: AgeChartData;
}

export interface StateChartData {
  categories: string[];
  results: number[];
}

export interface StateChartSummary {
  success: boolean;
  data: StateChartData;
}

export interface ProductChartData {
  name: string;
  price: number;
  quantity: number;
}

export interface ProductChartSummary {
  success: boolean;
  data: ProductChartData[];
}


export const fetchUsersByGender = async (year:string, month:any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${USER_GENDER_SUMMARIES_URL}?year=${year}&month=${month}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data.success) {
      const result: GenderChartSummary = response.data;
      return result.data;
    } else {
      throw new Error('Failed to get gender summaries');
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred during get gender summaries';
    
    if (axios.isAxiosError(error)) { 
      errorMessage = error.response?.data?.error || errorMessage;
    } else if (error instanceof Error) { 
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};


export const fetchUsersByState =  async (year:string, month:any)  => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${USER_STATE_SUMMARIES_URL}?year=${year}&month=${month}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data.success) {
      const result: StateChartSummary = response.data;
      return result.data;
    } else {
      throw new Error('Failed to get state summaries');
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred during get state summaries';
    
    if (axios.isAxiosError(error)) { 
      errorMessage = error.response?.data?.error || errorMessage;
    } else if (error instanceof Error) { 
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

export const fetchUsersByAge = async (year:string, month:any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${USER_AGE_SUMMARIES_URL}?year=${year}&month=${month}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data.success) {
      const result: AgeChartSummary = response.data;
      return result.data;
    } else {
      throw new Error('Failed to get age summaries');
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred during get age summaries';
    
    if (axios.isAxiosError(error)) { 
      errorMessage = error.response?.data?.error || errorMessage;
    } else if (error instanceof Error) { 
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};


export const fetchProductSummaries = async (year:string, month:any) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${PRODUCT_SUMMARIES_URL}?year=${year}&month=${month}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data.success) {
      const result: ProductChartSummary = response.data;
      return result.data;
    } else {
      throw new Error('Failed to get product summaries');
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred during get product summaries';
    
    if (axios.isAxiosError(error)) { 
      errorMessage = error.response?.data?.error || errorMessage;
    } else if (error instanceof Error) { 
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};


    