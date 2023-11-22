import { atom } from 'recoil';

interface Application {
  id: string;
  // Add more properties based on your application data structure
}

interface ApplicationState {
  isLoading: boolean;
  applications: Application[];
}

export const applicationState = atom<ApplicationState>({
  key: 'applicationState',
  default: {
    isLoading: true,
    applications: [],
  },
});