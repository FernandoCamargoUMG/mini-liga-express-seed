# App Móvil Ionic - MiniLiga Express

Aplicación móvil nativa para iOS/Android que permite visualizar partidos pendientes y reportar resultados directamente al backend Laravel.

## ✅ Funcionalidades Implementadas
- **Página Matches**: Lista de próximos partidos (sin resultado) desde API real
- **Página Report Result**: Formulario para reportar marcadores con validación
- **Integración Real**: Consume endpoints del backend Laravel en tiempo real
- **UI Nativa**: Componentes Ionic optimizados para dispositivos móviles
- **Navegación**: Router con parámetros entre páginas

## Setup

### Prerrequisitos
- **Node.js 18+** con npm
- **Ionic CLI**: `npm install -g @ionic/cli` 
- **Backend Laravel** ejecutándose en puerto 8000

### Instalación Automática
```bash
# Desde la raíz del proyecto
bash ../scripts/init_mobile.sh

# Ejecutar la app
cd mobile
ionic serve  # Puerto 8100
```

### Instalación Manual
```bash
cd mobile

# Instalar dependencias
npm install

# Ejecutar en desarrollo
ionic serve        # Navegador web
ionic serve --lab  # Vista multiplataforma
```

## Arquitectura de la Aplicación

### Estructura de Archivos
```
mobile/src/app/
├── pages/
│   ├── matches/              # Lista de partidos
│   │   ├── matches.page.ts
│   │   ├── matches.page.html
│   │   └── matches.page.scss
│   └── report-result/        # Formulario de resultado
│       ├── report-result.page.ts
│       ├── report-result.page.html
│       └── report-result.page.scss
├── services/
│   └── api.service.ts        # Comunicación con backend
├── app.routes.ts            # Navegación entre páginas
└── main.ts                  # Configuración HTTP client
```

### Configuración de API
`src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  API_URL: 'http://127.0.0.1:8000'  // Backend Laravel
};
```


## Páginas de la Aplicación

### 1. Matches Page - Lista de Partidos
**Archivo**: `src/app/pages/matches/matches.page.ts`
- **URL**: `/matches` (página principal)
- **Función**: Muestra lista de partidos pendientes desde la API
- **Características**:
  - Pull-to-refresh para recargar datos
  - Loading spinner durante carga
  - Navegación a página de reportar resultado

### 2. Report Result Page - Formulario de Resultado
**Archivo**: `src/app/pages/report-result/report-result.page.ts`
- **URL**: `/report-result/:id`
- **Función**: Formulario para reportar marcadores de un partido específico
- **Características**:
  - Formularios reactivos con validación
  - Confirmación antes de envío
  - Navegación de regreso automática


## Comandos de Desarrollo

### Desarrollo Local
```bash
ionic serve                 # Navegador web (Puerto 8100)
ionic serve --lab          # Vista iOS + Android + Web
ionic serve --port=8200     # Puerto personalizado
```

### Build y Deployment
```bash
ionic build                 # Build para producción
ionic capacitor add ios     # Agregar plataforma iOS
ionic capacitor add android # Agregar plataforma Android
ionic capacitor sync        # Sincronizar código con plataformas
ionic capacitor run ios     # Ejecutar en iOS (requiere Xcode)
ionic capacitor run android # Ejecutar en Android (requiere Android Studio)
```

### Testing y Debug
```bash
npm test                    # Unit tests con Jest
npm run lint               # ESLint para código limpio
ionic capacitor open ios   # Abrir proyecto en Xcode
ionic capacitor open android # Abrir proyecto en Android Studio
```

## Troubleshooting

### Error de CORS
Si la app móvil no puede conectar con el backend:
```bash
# En el backend Laravel, agregar en config/cors.php
'allowed_origins' => ['http://localhost:8100', 'http://127.0.0.1:8100']
```

### Error de compilación TypeScript
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```