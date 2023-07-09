import axios from 'axios';

const callApi = async ({ method, url, data, params }) => {
  try {
    const jwtToken = localStorage.getItem('jwt');
    const config = {
      baseURL: 'https://api.realworld.io/api',
      headers: {
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
      },
      params: { ...params },
    };

    let response;

    switch (method) {
      case 'GET':
        response = await axios.get(url, config);
        break;
      case 'POST':
        response = await axios.post(url, data, config);
        break;
      case 'PUT':
        response = await axios.put(url, data, config);
        break;
      case 'DELETE':
        response = await axios.delete(url, config);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GET = (url, params = {}) => callApi({ method: 'GET', url, params });

export const POST = (url, data = {}) => callApi({ method: 'POST', url, data });

export const PUT = (url, data = {}) => callApi({ method: 'PUT', url, data });

export const DELETE = (url) => callApi({ method: 'DELETE', url });
