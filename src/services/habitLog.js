import axios from "axios";

const BASE = "http://localhost:5000/habitLog";
const initializedMonths = new Set();

export const getLogForDate = async (date) => {
  try {
    const res = await axios.get(`${BASE}/date/${date}`);
    return res.data;
  } catch (err) {
    console.log("Error while retrieving data", err);
    return [];
  }
}; 

export const updateDayLog = async (id, date, status, streak ) => {
  try {
    const response = await axios.post(BASE, {
      habitId: id,
      date,
      status,
      streak,
    });
    return response.data;
  } catch (err) {
    console.error("Error while adding log:", err);
    return {};
  }
};


export const getLogsForMonth = async (monthKey) => {
  try {
    const res = await axios.get(`${BASE}/month/${monthKey}`);
    return res.data;
  } catch (err) {
    console.error("Error while fetching month data:", err);
    return [];
  }
};

export const getMonthInit = async (monthKey) => {
  if (initializedMonths.has(monthKey)) return;
  try {
    const res = await axios.get(`${BASE}/monthInit/${monthKey}`);
    initializedMonths.add(monthKey);
    return res.data;
  } catch (err) {
    console.error("Error while initializing month data:", err);
    return [];
  }
};
export const initAndFetchMonthLogs = async (monthKey) => {
  try {
    await getMonthInit(monthKey);
    return await getLogsForMonth(monthKey);
  } catch (err) {
    console.error("error in initAndFetchMonthLogs=>", err);
    return [];
  }
};

export const getLogsForWeek = async (weekKey) => {
  try {
    console.log("request recieved for week")
    const res = await axios.get(`${BASE}/week/${weekKey}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching weekly logs:", err);
    return [];
  }
};
