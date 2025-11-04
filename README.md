# Creador de Libros de Colorear con IA

Bienvenido al Creador de Libros de Colorear con IA! Esta aplicación web te permite generar libros de colorear personalizados y listos para imprimir para niños, utilizando el poder de la inteligencia artificial de Google.

## Descripción

¿Buscas una actividad creativa y única para los más pequeños? Con esta herramienta, puedes transformar cualquier tema que imagines en un libro de colorear completo. Simplemente ingresa un tema (como "Dinosaurios en el espacio" o "Unicornios mágicos") y el nombre de un niño, y la aplicación creará una portada personalizada y cinco páginas de colorear únicas con ilustraciones de líneas gruesas, perfectas para imprimir.

Además, la aplicación incluye un amigable chatbot asistente para responder cualquier pregunta que puedas tener.

## Características Principales

-   **Generación Personalizada:** Crea libros de colorear basados en cualquier tema que elijas.
-   **Portada Única:** Cada libro incluye una portada con el nombre del niño y el tema seleccionado.
-   **5 Páginas de Colorear:** Se generan cinco ilustraciones distintas, listas para ser llenadas de color.
-   **Estilo Optimizado para Niños:** Todas las imágenes se crean con líneas negras, gruesas y claras sobre un fondo blanco, sin sombras ni colores, ideal para que los niños coloreen.
-   **Exportación a PDF:** Descarga el libro completo, incluyendo una página de dedicatoria especial "¡Coloréame!", como un único archivo PDF en formato A4, listo para imprimir.
-   **Soporte Multilingüe:** La interfaz y el contenido generado están disponibles en **Español** e **Inglés**.
-   **Asistente de Chat:** Un chatbot integrado, impulsado por el modelo Gemini de Google, está disponible para ayudarte con ideas o responder preguntas.

## ¿Cómo Usar la Aplicación?

Usar el creador es muy fácil. Sigue estos sencillos pasos:

1.  **Selecciona el Idioma:** Utiliza el botón en la esquina superior derecha para elegir entre español o inglés.
2.  **Elige un Tema:** En el campo "Tema del Libro de Colorear", escribe tu idea. Verás un texto de ejemplo que te servirá de guía. ¡Sé creativo! Por ejemplo: "Animales de la jungla explorando la ciudad".
3.  **Ingresa un Nombre:** Haz lo mismo en el campo "Nombre del Niño/a". El nombre que escribas aparecerá en la portada y en la página de dedicatoria.
4.  **Haz Clic en "Crear Mi Libro!":** Presiona el botón para comenzar el proceso. La IA se tomará un momento para diseñar y dibujar cada página. Verás mensajes de estado que te informarán del progreso.
5.  **Previsualiza tu Creación:** Una vez terminado, aparecerá una vista previa de la portada y las cinco páginas de colorear en la pantalla.
6.  **Descarga el PDF:** Si te gusta el resultado, haz clic en el botón "Descargar PDF". Esto generará un archivo PDF que se guardará en tu dispositivo, listo para imprimir y disfrutar!

## Tecnologías Utilizadas

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **Generación de Imágenes:** Google Gemini API (modelo `imagen-4.0-generate-001`)
-   **Chatbot:** Google Gemini API (modelo `gemini-2.5-flash`)
-   **Generación de PDF:** jsPDF
