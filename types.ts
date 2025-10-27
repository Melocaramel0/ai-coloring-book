
export interface GeneratedImages {
  cover: string;
  pages: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type Language = 'en' | 'es';
