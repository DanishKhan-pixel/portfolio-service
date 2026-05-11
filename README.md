# Portfolio Service

Full-stack developer portfolio with Django REST API backend and React frontend.

## Project Structure

```
portfolio-service/
├── backend/    # Django REST API
└── frontend/   # React + Vite
```

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Requirements

- Node.js 18+
- Python 3.10+
- PostgreSQL (optional, SQLite for dev)

See individual folder READMEs for detailed setup.