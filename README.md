# PerformanceHub - Gestion de Rendimiento Deportivo

PerformanceHub es una plataforma integral diseñada para el monitoreo y analisis del rendimiento fisico de atletas de alto rendimiento. El sistema esta configurado para la gestion de la planilla oficial del Club Jorge Wilstermann, permitiendo a los usuarios visualizar indicadores clave de desempeño (KPIs) y administrar la base de datos de jugadores.

## Caracteristicas Principales

- Dashboard de Atletas: Visualizacion interactiva de la nomina con indicadores de rendimiento mediante barras de progreso dinamicas.
- Gestion CRUD: Capacidad para registrar nuevos jugadores y dar de baja atletas en tiempo real.
- Monitor Fisico: Sistema de alertas visuales basado en el porcentaje de rendimiento fisico obtenido de la API.
- Arquitectura Contenerizada: Separacion de responsabilidades entre Frontend (React), Backend (.NET API) y Base de Datos (PostgreSQL) mediante Docker.

## Stack Tecnologico

- Frontend: React 18, Vite, Bootstrap 5.
- Backend: .NET Core API (C#), Entity Framework Core.
- Base de Datos: PostgreSQL 15.
- Infraestructura: Docker y Docker Compose.

## Requisitos Previos

Para ejecutar este proyecto es necesario contar con:

1. Docker Desktop instalado y en ejecucion.
2. Git para la gestion del repositorio.
3. Un navegador web actualizado.

## Instalacion y Configuracion

Siga estos pasos para desplegar el entorno local:

### 1. Clonar el repositorio
git clone https://github.com/JhersonRivera/PerformanceHub.git
cd PerformanceHub

### 2. Desplegar servicios con Docker
Ejecute el siguiente comando para construir las imagenes y levantar los contenedores:

docker-compose up -d --build

### 3. Puertos de Acceso
Una vez que los contenedores esten activos (Up), el sistema estara disponible en las siguientes direcciones:

- Frontend (Interfaz de Usuario): http://localhost:3000
- Backend (Documentacion Swagger): http://localhost:5000/swagger
- Administracion de BD (pgAdmin): http://localhost:5050

## Carga de Datos (Seed)

Para cargar la nomina inicial de 14 jugadores del Club Jorge Wilstermann, ejecute el script de automatizacion incluido en la raiz del proyecto:

chmod +x carga_final.sh
./carga_final.sh

## Estructura del Proyecto

- /client: Aplicacion React con Vite (Capa de presentacion).
- /server: Web API en .NET (Logica de negocio y persistencia).
- docker-compose.yml: Archivo de orquestacion de servicios, redes y volumenes.

