# Sweet Shop - Online Chocolate and Cake Store

A full-stack e-commerce application for selling homemade chocolates and cakes, built with React and FastAPI.

## Features

- Responsive product catalog with categories
- Shopping cart functionality
- Admin dashboard for product and category management
- Customer feedback system
- User authentication and authorization
- Mobile-friendly design

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- React Router for navigation
- Axios for API calls

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL database
- JWT authentication
- Alembic for database migrations

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sweet-shop
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Initialize the database:
   ```bash
   # In a new terminal
   docker-compose exec backend python -m app.initial_data
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Development Setup

### Backend

1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up the database:
   ```bash
   alembic upgrade head
   python -m app.initial_data
   ```

4. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Default Admin Account

- Email: admin@sweetshop.com
- Password: admin123

## Project Structure

```
sweet-shop/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── crud/
│   │   ├── db/
│   │   ├── models/
│   │   └── schemas/
│   ├── alembic/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   └── package.json
└── docker-compose.yml
```

## API Documentation

The API documentation is available at `/docs` when the backend server is running. It provides detailed information about all available endpoints and their usage.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.