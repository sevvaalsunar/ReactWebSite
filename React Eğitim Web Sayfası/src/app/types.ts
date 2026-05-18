export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive?: boolean;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface LessonSection {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  level: number;
  color: string;
}

export type ThemeColor = '#a855f7' | '#10b981' | '#fb7185' | '#60a5fa' | '#fbbf24';

export type ButtonVariant = 'primary' | 'secondary' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';
