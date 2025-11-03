# MiniLiga Express Backend

## Decisiones técnicas
- **Laravel + SQLite:** Laravel es un framework que agiliza el desarrollo gracias a su ORM Eloquent
su sintaxis permite optimizar código y ser más limpio.
- **Estructura estándar:** Se mantuvo la estructura recomendada por Laravel para facilitar el mantenimiento y la extensibilidad.
- **Endpoints RESTful:** Los endpoints siguen convenciones REST para claridad y compatibilidad con frontend y móvil.
- **Validaciones básicas:** Se implementaron validaciones mínimas en los endpoints para cumplir el alcance del MVP.
- **Sin autenticación:** Por requerimiento de la prueba, no se implementó login ni roles.

## Trade-offs
- **SQLite vs MySQL:** Se utilizó SQLite en este caso por ser un proyecto pequeño, si el proyecto llegase a escalar es recomendable usar MySQL.
- **Tests mínimos:** Solo se implementó el test de standings para cumplir el criterio, pero se recomienda ampliar la cobertura en proyectos reales.

## Próximos pasos
- Mejorar la cobertura de tests (más casos y validaciones).
- Implementar paginación y filtros en endpoints si la liga crece.
- Añadir autenticación y roles si el proyecto evoluciona.

---
