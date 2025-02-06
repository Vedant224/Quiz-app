import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
