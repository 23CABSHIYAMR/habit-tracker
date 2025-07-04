import axios from "axios";

const API_BASE = "http://localhost:5000/habits";

export const fetchHabits = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error("error while fetching data:", err);
    return [];
  }
};

export const createHabit = async (newHabit) => {
  const res = await axios.post(API_BASE, newHabit);
  return res.data;
};

export const updateHabit = (id, updates) => {
  axios.put(`${API_BASE}/${id}`, updates);
};

export const deleteHabit = async (id) => {
  return await axios.delete(`${API_BASE}/${id}`);
};
