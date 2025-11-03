# Backend (Laravel 12) — MiniLiga Express

## Descripción
API RESTful para gestionar equipos, partidos y clasificación de una mini liga. Desarrollado con Laravel y SQLite.

## Endpoints principales
- `GET /api/teams` — Listar equipos
- `POST /api/teams` — Crear equipo `{ name }`
- `POST /api/matches/{id}/result` — Registrar resultado `{ home_score, away_score }`
- `GET /api/standings` — Obtener clasificación

## Instalación rápida
```bash
# Desde la raíz del repositorio
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configura la base de datos en .env (por defecto SQLite)
php artisan migrate --seed
php artisan serve
```

## Requisitos
- PHP >= 8.2 (Esto fue desarrollado en laravel 12)
- Composer
- SQLite (o MySQL es una opción)

## Estructura
- `app/Models` — Modelos Eloquent
- `app/Http/Controllers/Api` — Controladores de la API
- `routes/api.php` — Rutas de la API
- `database/seeders` — Seeders de ejemplo
- `tests/Feature` — Tests de endpoints y lógica

## Seed de ejemplo
Los seeds de ejemplo son los siguientes.
```php
 public function run(): void
    {
        // Crea equipos
        $teams = collect(['Dragons','Sharks','Tigers','Wolves'])
            ->map(fn($name) => \App\Models\Team::create(['name' => $name]));

        // Crea partidos sin resultado
        \App\Models\Matches::create([
            'home_team_id' => $teams[0]->id,
            'away_team_id' => $teams[1]->id,
        ]);
        \App\Models\Matches::create([
            'home_team_id' => $teams[2]->id,
            'away_team_id' => $teams[3]->id,
        ]);
        \App\Models\Matches::create([
            'home_team_id' => $teams[0]->id,
            'away_team_id' => $teams[2]->id,
        ]);
    }
```

## Test
Los test pueden ser en PHPUnit o Pest, en este caso se hicieron en PHPUnit
Ejecuta:
```bash
php artisan test
```
Verifica el cálculo de standings (puntos y partidos jugados).

## Colección Postman
Incluida en `MiniLigaExpress.postman_collection.json` para probar los endpoints fácilmente.

## Notas
- Sin autenticación.
- Validaciones básicas en endpoints.
- Setup reproducible y documentado.

---
¿Dudas o problemas? Consulta el archivo DECISIONES.md para trade-offs y próximos pasos.
