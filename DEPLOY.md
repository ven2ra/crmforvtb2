# Развёртывание ЕРС CRM

Приложение — Node.js (Express + SQLite) сервер, который отдаёт API (`/api/*`)
и собранный фронтенд (Vite). База данных — файл SQLite на диске
(`data/db.sqlite`), создаётся и заполняется начальными данными автоматически
при первом запуске.

## Вариант A — Docker (рекомендуется)

Требуется Docker + Docker Compose на сервере.

```bash
git clone https://github.com/ven2ra/crmforvtb2.git
cd crmforvtb2
docker compose up -d --build
```

Приложение поднимется на порту 3000, данные сохраняются в named volume
`crm_data` (переживают пересборку и рестарт контейнера).

Обновление после изменений в репозитории:

```bash
git pull
docker compose up -d --build
```

Логи: `docker compose logs -f crm`

## Вариант B — напрямую на VPS (systemd + nginx)

Предполагается Ubuntu/Debian, Node.js 22+.

```bash
# 1. Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

# 2. Пользователь и код приложения
sudo useradd -r -m -d /opt/crmforvtb2 -s /usr/sbin/nologin crmapp || true
sudo git clone https://github.com/ven2ra/crmforvtb2.git /opt/crmforvtb2
cd /opt/crmforvtb2

# 3. Зависимости и сборка фронтенда
sudo npm ci
sudo npm run build

# 4. Права на каталог с БД
sudo mkdir -p /opt/crmforvtb2/data
sudo chown -R crmapp:crmapp /opt/crmforvtb2

# 5. systemd-сервис
sudo cp deploy/crmforvtb2.service /etc/systemd/system/crmforvtb2.service
sudo systemctl daemon-reload
sudo systemctl enable --now crmforvtb2
sudo systemctl status crmforvtb2

# 6. nginx как reverse proxy (замените домен в deploy/nginx.conf)
sudo cp deploy/nginx.conf /etc/nginx/sites-available/crmforvtb2
sudo ln -s /etc/nginx/sites-available/crmforvtb2 /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 7. HTTPS (Let's Encrypt)
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.example
```

Обновление после изменений в репозитории:

```bash
cd /opt/crmforvtb2
sudo git pull
sudo npm ci
sudo npm run build
sudo systemctl restart crmforvtb2
```

## Переменные окружения

См. `.env.example`:

- `PORT` — порт, на котором слушает сервер (по умолчанию 3000)
- `NODE_ENV=production` — включает отдачу собранного `dist/` статикой
- `DB_DIR` — каталог для файла SQLite (по умолчанию `./data`)

## Резервное копирование

Вся база — один файл. Регулярный бэкап:

```bash
# Docker
docker compose exec crm sh -c 'cp /app/data/db.sqlite /app/data/db.sqlite.bak'
docker cp $(docker compose ps -q crm):/app/data/db.sqlite ./backup-$(date +%F).sqlite

# systemd/VPS
cp /opt/crmforvtb2/data/db.sqlite ~/backup-$(date +%F).sqlite
```
