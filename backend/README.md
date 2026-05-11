# Backend - Django REST API

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Run

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Production

```bash
export DJANGO_ENV=production
python manage.py collectstatic --noinput
gunicorn -c gunicorn.conf.py config.wsgi:application
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/profile/` | Developer profile |
| `/api/skills/` | Skills by category |
| `/api/projects/` | Project list |
| `/api/projects/<slug>/` | Project detail |
| `/api/experience/` | Work experience |
| `/api/education/` | Education history |

**Admin:** `/admin/` (use superuser credentials)