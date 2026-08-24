/**
 * Serializa datos estructurados para meterlos en un
 * `<script type="application/ld+json">` sin abrir un agujero.
 *
 * `JSON.stringify` NO escapa `<` ni `>`, así que un texto que contenga
 * `</script>` cierra la etiqueta antes de tiempo y lo que sigue lo
 * ejecuta el navegador. En La noticIA los titulares vienen de feeds RSS
 * de terceros: basta con que a un medio le comprometan el feed —o que
 * publique un titular con esa cadena— para romper el HTML, o peor.
 *
 * Escapar los tres caracteres deja el JSON idénticamente válido (`<` y
 * `<` son la misma cadena para cualquier parser) y cierra la puerta.
 *
 * No hace falta tocar U+2028/U+2029: son ilegales dentro de un literal
 * de JavaScript, pero esto es un bloque JSON y ahí son válidos.
 */
export function jsonLd(datos: unknown): string {
  return JSON.stringify(datos)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
