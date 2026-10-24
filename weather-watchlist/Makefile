.PHONY: up down logs test test-backend test-frontend clean

up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f backend frontend

test: test-backend test-frontend

test-backend:
	docker compose --profile test run --rm --build backend-test

test-frontend:
	docker compose --profile test run --rm --build frontend-test

clean:
	docker compose --profile test down -v --remove-orphans
