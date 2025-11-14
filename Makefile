.PHONY: help up stop restart logs api-build web-build db-reset

help: ## Mostra os comandos disponíveis
	@grep -E '^[a-zA-Z_-]+:.*?##' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\\033[36m%-15s\\033[0m %s\\n", $$1, $$2}'

up: ## Sobe todos os serviços com docker-compose
	docker compose up -d --build

stop: ## Para todos os serviços
	docker compose down

restart: ## Reinicia todos os serviços
	docker compose down && docker compose up -d --build

logs: ## Mostra os logs dos serviços
	docker compose logs -f

api-build: ## Executa build do backend
	cd backend && mvn clean package

web-build: ## Executa build do frontend
	cd frontend && npm install && npm run build

db-reset: ## Remove volume de dados do banco
	docker compose down -v

.help: help
