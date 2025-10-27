
import { GoogleGenAI } from '@google/genai';
import type { Language } from '../types';

const API_KEY = process.env.API_KEY as string;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const imageGenerationConfig = {
    numberOfImages: 1,
    outputMimeType: 'image/jpeg',
    aspectRatio: '3:4', // Portrait orientation suitable for pages
};

const prompts = {
    en: {
        suffix: `A coloring book page for a child. Simple, thick, bold black and white outlines. No shading, no color, clean lines, white background.`,
        cover: (theme: string, name: string) => `Coloring book cover with the theme of '${theme}'. The text "'${name}'s Coloring Book'" is prominently displayed in a fun, playful, and easy-to-read font.`,
        pages: (theme: string) => [
            `A friendly character related to '${theme}'.`,
            `A main scene or environment from '${theme}'.`,
            `Multiple small, simple items related to '${theme}'.`,
            `An action scene with characters from '${theme}'.`,
            `A large, detailed character from '${theme}' smiling.`
        ]
    },
    es: {
        suffix: `Una página de libro de colorear para un niño. Contornos en blanco y negro simples, gruesos y audaces. Sin sombreado, sin color, líneas limpias, fondo blanco.`,
        cover: (theme: string, name: string) => `Portada de libro de colorear con el tema de '${theme}'. El texto "El Libro de Colorear de ${name}" se muestra de forma destacada en una fuente divertida, juguetona y fácil de leer.`,
        pages: (theme: string) => [
            `Un personaje amigable relacionado con '${theme}'.`,
            `Una escena o entorno principal de '${theme}'.`,
            `Varios objetos pequeños y simples relacionados con '${theme}'.`,
            `Una escena de acción con personajes de '${theme}'.`,
            `Un personaje grande y detallado de '${theme}' sonriendo.`
        ]
    }
}

async function generateSingleImage(prompt: string): Promise<string> {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt,
        config: imageGenerationConfig,
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error('Image generation failed, no images returned.');
    }
    
    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
}

export async function generateCoverImage(theme: string, name: string, lang: Language): Promise<string> {
  const prompt = `${prompts[lang].cover(theme, name)} ${prompts[lang].suffix}`;
  return generateSingleImage(prompt);
}

export async function generateColoringPages(theme: string, lang: Language): Promise<string[]> {
  const pagePrompts = prompts[lang].pages(theme).map(p => `${p} ${prompts[lang].suffix}`);

  const imagePromises = pagePrompts.map(prompt => generateSingleImage(prompt));
  
  return Promise.all(imagePromises);
}
