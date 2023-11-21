import axios from 'axios';

const API_KEY = '40715301-5ced10bde0d5b0f1ee785e4c4';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPhotos = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
