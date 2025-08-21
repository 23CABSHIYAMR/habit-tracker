import api from "./api";
// const API_BASE = "https://habit-tracker-server-bx61.onrender.com/habits";
const API_BASE="http://localhost:5000/habits";


export const fetchHabits = async () => {
  try {
    const res = await api.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error("error while fetching data:", err);
    return [];
  }
};

export const createHabit = async (newHabit) => {
  const res = await api.post(API_BASE, newHabit);
  return res.data;
};

export const updateHabit = (id, updates) => {
  api.put(`${API_BASE}/${id}`, updates);
};

export const deleteHabit = async (id) => {
  return await api.delete(`${API_BASE}/${id}`);
};
