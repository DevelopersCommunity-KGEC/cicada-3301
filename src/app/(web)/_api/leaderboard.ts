import axios from 'axios';

export async function handleLeaderboard() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${API_URL}/leaderboard`);
    return res.data;
  } catch (error) {}
}
