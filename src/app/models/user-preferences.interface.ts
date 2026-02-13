import { Theme } from './theme.enum';

export interface UserPreferences {
  theme: Theme;
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
}
