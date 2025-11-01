# Web (Angular) — MiniLiga Express

Mini frontend en Angular con dos pestañas:
- Equipos: listado + alta (`GET /api/teams` y `POST /api/teams`)
- Clasificación: tabla desde `GET /api/standings`

La app consume la API del backend Laravel (Se encuentra en el mismo repo`).

## Requisitos
- Node.js 18+ (recomendado LTS)
- npm 9+
- Backend ejecutándose en `http://127.0.0.1:8000` (Laravel)

## Instalación y arranque

```bash
# Desde la raíz del repo
cd web
npm install

# Arrancar en dev (con proxy al backend)
npm start
```

Por defecto la app abre en `http://localhost:4200`. El archivo `proxy.conf.json` redirige cualquier `/api` al backend en `http://127.0.0.1:8000` esto para evitar CORS durante el desarrollo.

Configura el endpoint base en `src/environments/environment.ts`:

```ts
export const environment = {
	production: false,
	API_URL: 'http://127.0.0.1:8000'
};
```

## Estructura relevante

```
src/
	main.ts                 # Bootstrap de la app
	styles.scss             # Estilos globales (tema, layout, componentes básicos)
	app/
		app.component.ts      # Componente raíz (standalone) con navbar y router-outlet
		app.html              # Plantilla del root con pestañas
		app.scss              # Estilos del root
		app.config.ts         # Providers globales (router + HttpClient)
		app-routing.module.ts # Rutas (NgModule) → /teams y /standings
		services/
			api.service.ts      # Servicio HTTP centralizado (teams, standings)
		features/
			teams/
				teams.component.ts / .html / .scss     # Listado + alta de equipos
			standings/
				standings.component.ts / .html / .scss # Tabla de clasificación
```

Routing:
- Usamos `AppRoutingModule` (NgModule clásico) para definir rutas.
- En `app.config.ts` se integra con la app standalone vía `importProvidersFrom(AppRoutingModule)` y se provee `HttpClient`.

## API Service

`src/app/services/api.service.ts` encapsula todas las llamadas a la API:

```ts
getTeams(): Observable<Team[]>;
createTeam(payload: { name: string }): Observable<Team>;
getStandings(): Observable<Standing[]>;
```

Endpoints backend implementados:
- `GET /api/teams`
- `POST /api/teams`  Body: `{ name: string }`
- `GET /api/standings`
- `POST /api/matches/{id}/result` (usado por la app móvil; no se consume desde esta web)

## Cómo añadir una página nueva
1. Crea un componente standalone en `src/app/features/nueva/`.
2. Declara la ruta en `app-routing.module.ts`:
	 ```ts
	 { path: 'nueva', component: NuevaComponent }
	 ```
3. Añade el enlace en `app.html`:
	 ```html
	 <a routerLink="/nueva" routerLinkActive="active" class="navlink">Nueva</a>
	 ```

## Estilos y diseño
- Tema oscuro en `styles.scss` (variables CSS, navbar, cards, inputs, botones, tablas).
- Componentes visuales sin dependencias de UI externas.
- Estados “loading” y “vacío” en tablas.

## Comandos útiles

```bash
# Compilar producción
npm run build

# Ejecutar tests (si existieran)
npm test
```

La salida de build se genera en `dist/web`.

## Resolución de problemas
- 404 o CORS en `/api/*`: confirma que el backend corre en `127.0.0.1:8000` y el proxy `proxy.conf.json` está activo (se usa con `npm start`).
- `Cannot match any routes`: revisa `app-routing.module.ts`.
- `HttpClient` no disponible: asegúrate de que `provideHttpClient()` está en `app.config.ts`.
- La UI no actualiza: revisa la consola del navegador por errores.

## Criterios de arquitectura (resumen)
- Separación de responsabilidades:
	- Componentes: solo UI y eventos.
	- `ApiService`: todas las llamadas HTTP.
	- Routing centralizado en `AppRoutingModule`.
- Formularios reactivos en Equipos (alta de equipo con validación).

---

