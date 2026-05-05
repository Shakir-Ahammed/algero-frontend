#!/bin/sh
set -e

echo "==> Waiting for PostgreSQL..."
while ! nc -z ${DB_HOST:-postgres} ${DB_PORT:-5432} 2>/dev/null; do
    sleep 1
done
echo "==> PostgreSQL is ready!"

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Seeding database..."
php artisan db:seed --force

echo "==> Creating storage link..."
rm -rf /var/www/html/public/storage
ln -sf /var/www/html/storage/app/public /var/www/html/public/storage
chown -R www-data:www-data /var/www/html/storage/app/public

echo "==> Clearing caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Starting application..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
