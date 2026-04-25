# Checklist de indexación · obradorweb.com
**Fecha:** 2026-04-25
**Problema detectado:** Solo la home está indexada en Google. Las otras 6 URLs públicas aparecen como "Google no reconoce esta URL" porque el sitemap nunca se procesó.

---

## Paso 1 · Submitir el sitemap (lo más importante)

GSC > barra lateral izquierda > **Indexación > Sitemaps**

Arriba pone "Añadir un sitemap nuevo". En el campo escribe **solo**:

```
sitemap.xml
```

(no pongas la URL completa, solo el nombre del archivo)

Dale a **Enviar**. Tras unos segundos debe poner "Correcto" y detectar 7 URLs.

> Si dice "No se ha podido obtener" o "Error", abre `https://obradorweb.com/sitemap.xml` en otra pestaña primero para confirmar que el XML carga. Si carga pero GSC sigue dando error, espera 5 minutos y reintenta.

---

## Paso 2 · Solicitar indexación URL por URL (límite ~10/día)

En GSC, arriba del todo hay una barra de búsqueda que pone "Inspeccionar cualquier URL...". Pega cada URL una a una. Cuando cargue el resultado, dale al botón **"SOLICITAR INDEXACIÓN"** (arriba a la derecha del banner gris).

Espera ~30 segundos entre cada una para que se procese.

### Hoy (7 URLs prioritarias)

```
https://obradorweb.com/
https://obradorweb.com/compara/
https://obradorweb.com/proyectos/
https://obradorweb.com/blog/
https://obradorweb.com/blog/cuanto-cuesta-web-cafeteria-madrid/
https://obradorweb.com/blog/seo-vs-sem-cafes/
https://obradorweb.com/blog/como-elegir-web-cafeteria/
```

### Mañana (las 4 demos · opcional pero recomendado)

```
https://obradorweb.com/demos/cierzo-presencia/
https://obradorweb.com/demos/cierzo-carta/
https://obradorweb.com/demos/cierzo-marca/
https://obradorweb.com/demos/cierzo-tienda/
```

> Las demos están enlazadas desde `/compara/` pero **no están en el sitemap** todavía. La auditoría que hice antes (punto HIGH #2) recomendaba añadirlas. Mientras decides, solicitar indexación manual les empuja a indexarse igual.

---

## Paso 3 · Esperar 24-72h y verificar

A las 24-48h, vuelve a inspeccionar cada URL. Tienen que pasar de "La URL no está en Google" a "La URL está en Google". Si alguna sigue sin estarlo a las 72h, avisa y miramos el motivo concreto.

**Señales de éxito:**
- Indexación > Páginas pasa de **1 indexada** a **7-11 indexadas**
- Rendimiento empieza a mostrar consultas reales (más allá de búsquedas de marca)
- Inspección de URL muestra "Último rastreo" con fecha reciente y "Sitemaps: sitemap.xml"

---

## Sobre los sitelinks tipo YouTube (Inicio · Iniciar sesión · etc)

**No se pueden configurar manualmente.** Google los genera automáticamente cuando:
- El sitio tiene autoridad suficiente para la búsqueda de marca
- Las páginas internas están indexadas y enlazadas desde la home
- Hay volumen de búsqueda real para "obrador web" o "obradorweb.com"

**Plazo realista:** varios meses mínimo. El sitio tiene 3 semanas en vivo (lanzado ~2026-04-04) y 4 clics totales. Los sitelinks llegan cuando hay autoridad real, no por edad calendarica sola.

**Qué acelera el día en que aparezcan:**
1. Indexar todas las páginas (lo que estás haciendo ahora)
2. Añadir el schema `WebSite` en la home (auditoría técnica, punto 14)
3. Conseguir que más gente busque "obrador web" directamente en Google (DMs, IG, firma de email, perfil LinkedIn cuando esté)
4. Mantener la estructura de navegación clara (ya está bien)

---

## Por qué pasó esto

Cuando subes un sitio nuevo a Google, hay tres formas de que descubra las URLs:
1. **Sitemap submitido manualmente en GSC** (instantáneo)
2. **Sitemap referenciado en robots.txt** (Google lo encuentra en 1-4 semanas, depende del crawl budget)
3. **Crawleo natural siguiendo enlaces internos** (lento para sitios nuevos sin autoridad)

El 20/04 pediste re-indexación de la home (por eso esa sí está) pero no submitiste el sitemap. Como obradorweb.com es un sitio nuevo (3 semanas en vivo, lanzado ~2026-04-04) sin autoridad acumulada, el descubrimiento automático no había arrancado todavía. Resultado: 3 semanas con solo la home conocida por Google.

Submitir el sitemap hoy resuelve esto definitivamente. Los próximos posts del blog que publiques se descubrirán solos en 1-3 días sin necesidad de pedir indexación manual.
