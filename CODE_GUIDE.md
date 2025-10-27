# Guía del Código Fuente

Este documento proporciona una descripción técnica detallada de la arquitectura y el código de la aplicación "Creador de Libros de Colorear con IA".

## Estructura del Proyecto

El proyecto está organizado en una estructura modular para facilitar la mantenibilidad y escalabilidad.

```
/
├── components/         # Componentes reutilizables de React
│   ├── ChatWidget.tsx
│   ├── ColoringPageDisplay.tsx
│   ├── icons.tsx
│   ├── LoadingIndicator.tsx
│   └── ThemeInputForm.tsx
├── context/            # Contexto de React para manejo de estado global
│   └── LanguageContext.tsx
├── hooks/              # Hooks personalizados de React
│   └── useTranslations.ts
├── locales/            # Archivos de traducción (i18n)
│   ├── en.json
│   └── es.json
├── services/           # Módulos para lógica de negocio y APIs externas
│   ├── geminiService.ts
│   └── pdfService.ts
├── App.tsx             # Componente principal de la aplicación
├── index.html          # Punto de entrada HTML
├── index.tsx           # Punto de entrada de React
├── types.ts            # Definiciones de tipos de TypeScript
└── ...
```

## Archivos Principales

-   **`index.html`**: El esqueleto de la página. Carga las CDNs de Tailwind CSS, jsPDF y los módulos de React/GenAI. Contiene el div `#root` donde se monta la aplicación.
-   **`index.tsx`**: El punto de entrada de la aplicación React. Renderiza el componente `App` en el DOM.
-   **`App.tsx`**: El componente raíz que gestiona el estado principal de la aplicación, como el estado de carga, los datos de las imágenes generadas, el error y la visibilidad del chat. Orquesta la interacción entre los componentes y los servicios.

## Componentes (`/components`)

-   **`ThemeInputForm.tsx`**: Contiene el formulario donde el usuario introduce el tema y el nombre. Realiza una validación básica y llama a la función `onGenerate` pasada por `App.tsx`.
-   **`ColoringPageDisplay.tsx`**: Muestra una vista previa de la portada y las páginas generadas en una cuadrícula. Contiene el botón de descarga que activa la generación del PDF.
-   **`LoadingIndicator.tsx`**: Muestra una animación de carga y un mensaje de estado mientras la IA genera las imágenes.
-   **`ChatWidget.tsx`**: Un componente de chat flotante y autocontenido. Gestiona su propia conversación con la API de Gemini (`gemini-2.5-flash`) para asistir al usuario.
-   **`icons.tsx`**: Exporta componentes SVG para los iconos utilizados en la interfaz, manteniendo el código de otros componentes más limpio.

## Internacionalización (i18n)

El soporte multilingüe se implementa utilizando el Contexto de React para evitar dependencias externas pesadas.

-   **`locales/`**: Las carpetas `en.json` y `es.json` contienen los pares clave-valor para todos los textos de la interfaz en inglés y español, respectivamente.
-   **`context/LanguageContext.tsx`**: Define un `LanguageProvider` que envuelve la aplicación. Mantiene el estado del idioma actual (`'en'` o `'es'`). Proporciona una función `t(key)` que busca y devuelve la cadena de texto correspondiente del archivo JSON del idioma activo.
-   **`hooks/useTranslations.ts`**: Un hook simple (`useContext(LanguageContext)`) que permite a cualquier componente acceder fácilmente al estado del idioma y a la función de traducción `t`.

## Servicios (`/services`)

Aquí reside la lógica de negocio principal y la comunicación con APIs externas.

-   **`geminiService.ts`**:
    -   Maneja todas las llamadas a la API de Google Gemini.
    -   `generateSingleImage`: Una función auxiliar que se comunica con el modelo `imagen-4.0-generate-001` para generar una imagen a partir de un *prompt*.
    -   `generateCoverImage`: Construye un *prompt* específico para la portada, incluyendo el tema y el nombre del niño, y llama a `generateSingleImage`.
    -   `generateColoringPages`: Construye 5 *prompts* diferentes basados en el tema para crear variedad en las páginas y las genera en paralelo usando `Promise.all`.
    -   **Importante:** Las funciones de este servicio ahora aceptan un parámetro `lang` para construir los *prompts* en el idioma correcto, asegurando que el contenido generado sea cultural y lingüísticamente relevante.

-   **`pdfService.ts`**:
    -   Utiliza la librería `jsPDF` (cargada desde una CDN) para crear el archivo PDF.
    -   `createColoringBookPdf`: Orquesta la creación del PDF.
    -   Añade una primera página especial de dedicatoria "¡Coloréame!" con el nombre del niño. El texto de esta página se traduce según el idioma seleccionado.
    -   Añade la imagen de la portada y las cinco páginas de colorear, una por página.
    -   Calcula las dimensiones y márgenes para que las imágenes se ajusten correctamente al formato A4, manteniendo su relación de aspecto.
    -   Genera un nombre de archivo seguro y solicita al navegador que descargue el PDF.

## Flujo de Datos

1.  El usuario interactúa con `ThemeInputForm.tsx` e introduce un tema y un nombre.
2.  Al hacer clic en "Crear", se llama a la función `handleGenerate` en `App.tsx`.
3.  `App.tsx` actualiza su estado a `isLoading = true` y pasa el tema, el nombre y el idioma actual a las funciones en `geminiService.ts`.
4.  `geminiService.ts` realiza las llamadas a la API de Gemini para generar la portada y las 5 páginas. Devuelve las imágenes como strings en formato base64.
5.  Una vez que las promesas se resuelven, `App.tsx` actualiza el estado `generatedImages` con los datos recibidos y establece `isLoading = false`.
6.  `ColoringPageDisplay.tsx` se renderiza, mostrando las imágenes.
7.  El usuario hace clic en "Descargar PDF". Se llama a `handleDownload` en `App.tsx`.
8.  `App.tsx` invoca a `createColoringBookPdf` de `pdfService.ts`, pasándole las imágenes, el tema, el nombre y el idioma.
9.  `pdfService.ts` construye el documento PDF en el navegador y activa la descarga.
