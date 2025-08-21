import {
  getLogForDate,
  getLogsForWeek,
  initAndFetchMonthLogs,
  updateDayLog,
} from "../services/habitLog";
import { IsoDate, getMonthKey, getWeekKey } from "./dateFormat";
import { createdDate } from "../UserData/userData";

class LogFetcher {
  constructor() {
    this.monthDataCache = {};
    this.weekDataCache = {};
    this.completedCache = {};
    this.prefetchedMonths = new Set();
  }
  resetAllData(){
    this.monthDataCache = {};
    this.weekDataCache = {};
    this.completedCache = {};
    this.prefetchedMonths = new Set();
  }

  async updateDayLog(habitId, date, oldStatus, status, streak) {
    const dateObj = new Date(date);



    // Step 3: Update the current log
    const updatedLog = await updateDayLog(habitId, date, status, streak);

    // Step 4: Update month & week cache for current date
    const monthKey = getMonthKey(dateObj);
    const weekKey = getWeekKey(dateObj);

    if (this.monthDataCache[monthKey]) {
      this.monthDataCache[monthKey] = this.monthDataCache[monthKey].map((log) =>
        log?.habitId?._id === habitId && log?.date === date
          ? { ...log, status, streak }
          : log
      );
    }

    if (this.weekDataCache[weekKey]) {
      this.weekDataCache[weekKey] = this.weekDataCache[weekKey].map((habit) => {
        if (habit[0].habitId._id === habitId) {
          const updatedHabit = habit.map((eachLog) =>
            eachLog.date === date ? { ...eachLog, status, streak } : eachLog
          );
          return updatedHabit;
        }
        return habit;
      });
    }
    return updatedLog;
  }

  async getLogsByDate(date) {
    const dateKey = IsoDate(date);
    const monthKey = getMonthKey(new Date(date));
    const logs = this.monthDataCache[monthKey] || [];
    const match = logs.filter((log) => IsoDate(log.date) === dateKey);
    const res = match.length > 0 ? match : await getLogForDate(dateKey);
    return res;
  }

  async getCachedWeekData(weekRange, retry = 0) {
    const weekKey = getWeekKey(weekRange[0]);
    if (!this.weekDataCache[weekKey]) {
      const weekLogs = await this.getWeeklyLogs(weekRange);
      this.weekDataCache[weekKey] = weekLogs;
    }
    const isEmpty = !(this.weekDataCache[weekKey].length > 0);
    if (isEmpty && retry <= 1) {
      await this?.prefetchMonthSurroundings(weekRange[0]);
      const weekLogs = await this.getWeeklyLogs(weekRange);
      this.weekDataCache[weekKey] = weekLogs;
    }

    return structuredClone(this.weekDataCache[weekKey]);
  }
  async getWeeklyLogs(dateArray) {
    const weekStart = new Date(dateArray[0]);
    const weekEnd = new Date(dateArray[6]);
    const isBoundaryWeek = weekStart.getDate() > 21 || weekEnd.getDate() < 7;

    if (isBoundaryWeek) {
      await this?.prefetchMonthSurroundings(weekStart);
      const { raw = [] } = await getLogsForWeek(getWeekKey(weekStart));
      const grouped = this.groupLogsByHabit(raw);
      console.log(grouped);
      return grouped;
    }
    
    const dateSet = new Set(dateArray.map((d) => IsoDate(d)));
    const monthKey = getMonthKey(weekStart);
    const logs = this.monthDataCache[monthKey] || [];
    
    const weekLog = logs.filter((log) => dateSet.has(IsoDate(log.date)));
    const grouped = this.groupLogsByHabit(weekLog);
    console.log(grouped);
    return grouped;
  }

  async getCachedMonthData(monthKey) {
    const monthLog = await this.fetchMonthIfNeeded(monthKey);
    return [this.groupLogsByHabit(monthLog), this.groupLogsByDate(monthLog)];
  }

  async fetchMonthIfNeeded(monthKey) {
    if (!this.monthDataCache[monthKey]) {
      const logs = await initAndFetchMonthLogs(monthKey);
      this.monthDataCache[monthKey] = logs;
      this.prefetchedMonths.add(monthKey);
    }
    return this.monthDataCache[monthKey];
  }

  async prefetchMonthSurroundings(startDate) {
    const date = new Date(startDate);
    const thisMonth = getMonthKey(date);
    const prevMonth = getMonthKey(
      new Date(date.getFullYear(), date.getMonth() - 1)
    );
    const nextMonth = getMonthKey(
      new Date(date.getFullYear(), date.getMonth() + 1)
    );
    const monthsToFetch = [prevMonth, thisMonth, nextMonth].filter(
      (key) => !this.prefetchedMonths.has(key)
    );

    monthsToFetch.forEach((key) => this.prefetchedMonths.add(key));
    await Promise.all(monthsToFetch.map((key) => this.fetchMonthIfNeeded(key)));
  }

  ///grouping methods
  groupLogsByHabit(logs) {
    const grouped = new Map();
    for (const log of logs) {
      const habitId = log.habitId._id?.toString?.() || log.habitId;
      if (!grouped.has(habitId)) grouped.set(habitId, []);
      grouped.get(habitId).push(log);
    }
    return Array.from(grouped.values());
  }

  groupLogsByDate(logs) {
    const grouped = new Map();
    for (const log of logs) {
      const logDate = IsoDate(log.date);
      if (!grouped.has(logDate)) grouped.set(logDate, []);
      grouped.get(logDate).push(log);
    }
    return Array.from(grouped.values());
  }

  //allTime and Year Data
  getCompletedCount(habit, startDate = createdDate, endDate = new Date()) {
    const progress = habit.yearlyProgress;
    let completed = 0;
    for (const yearKey in progress) {
      completed += progress[yearKey].totalCompleted;
    }
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const totalFrequency = this.getTotalFreqOfHabit(habit, startDate, endDate);
    return { count: completed, totalFreq: totalFrequency };
  }
  getTotalFreqOfHabit(habit, start, end) {
    const weekFreq = habit.weekFrequency;
    const endDate = new Date(end);
    let totalOccurrence = 0;

    for (let d = new Date(start); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayIndex = d.getDay();
      if (weekFreq[dayIndex]) {
        totalOccurrence += 1;
      }
    }

    return totalOccurrence;
  }
}

export default LogFetcher;
