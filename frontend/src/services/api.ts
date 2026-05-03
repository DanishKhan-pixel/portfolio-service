import axios from 'axios';
import type { Profile, Skill, ProjectSummary, ProjectDetail, Experience, Education, Certification } from '../types';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Request / Response Interceptors ────────────────────────────

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(`API Error [${error.response.status}]:`, error.response.data);
        } else if (error.request) {
            console.error('Network Error: No response received');
        } else {
            console.error('Request Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// ─── API Methods ────────────────────────────────────────────────

export const api = {
    getProfile: async (): Promise<Profile> => {
        const { data } = await apiClient.get<Profile>('/profile/');
        return data;
    },

    getSkills: async (): Promise<Skill[]> => {
        const { data } = await apiClient.get<Skill[]>('/skills/');
        return data;
    },

    getProjects: async (): Promise<ProjectSummary[]> => {
        const { data } = await apiClient.get<ProjectSummary[]>('/projects/');
        return data;
    },

    getProjectDetail: async (slug: string): Promise<ProjectDetail> => {
        const { data } = await apiClient.get<ProjectDetail>(`/projects/${slug}/`);
        return data;
    },

    getExperience: async (): Promise<Experience[]> => {
        const { data } = await apiClient.get<Experience[]>('/experience/');
        return data;
    },

    getEducation: async (): Promise<Education[]> => {
        const { data } = await apiClient.get<Education[]>('/education/');
        return data;
    },

    getCertifications: async (): Promise<Certification[]> => {
        const { data } = await apiClient.get<Certification[]>('/certifications/');
        return data;
    },
};

export default api;
