#!/bin/bash

# Instalar dependencias de Composer
composer install --no-dev --optimize-autoloader

# Generar clave de aplicación si no existe
php artisan key:generate --force

# Optimizar la aplicación
php artisan optimize

# Construir assets con Vite
npm run build