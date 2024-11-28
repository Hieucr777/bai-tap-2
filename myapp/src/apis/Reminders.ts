import axios from "axios";
import { TReminder } from "../component/ReminderManagement/Reminder";

export const ReminderApi = {
  getAllReminders: async (params: any = {}) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/Reminders`,
      {
        params: params,
      }
    );
    return response.data;
  },
  deleteReminderById: async (id: string | number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/Reminders/${id}`);
  },

  saveReminder: async (reminder: TReminder) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/Reminders`, reminder);
  },
};
