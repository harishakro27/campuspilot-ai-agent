import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const assistantAPI = {
  ask: (message, context = '') =>
    api.post('/assistant', { message, context }),
  explain: (concept, proficiency = 'beginner') =>
    api.post('/assistant/explain', { concept, proficiency }),
};

export const agentAPI = {
  chat: (message, userId = null, context = '') =>
    api.post('/agent/chat', { message, userId, context }),
  generateStudyPlan: (subject, deadline, proficiency = 'beginner', userId = null) =>
    api.post('/agent/study-plan', {
      subject,
      deadline,
      proficiency,
      userId,
    }),
};

export const userAPI = {
  register: (name, email, roll_no = '', branch = '', sem = null) =>
    api.post('/user/register', { name, email, roll_no, branch, sem }),
  getProfile: (userId) =>
    api.get(`/user/${userId}`),
};

export const quizAPI = {
  schedule: (userId, subject, quizDate, quizTime = null) =>
    api.post('/quiz/schedule', { userId, subject, quizDate, quizTime }),
  getSchedule: (userId) =>
    api.get(`/quiz/user/${userId}`),
};

export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
