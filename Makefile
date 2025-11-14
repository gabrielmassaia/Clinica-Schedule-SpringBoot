.PHONY: help up stop restart logs api web db-reset build-all

help: ## Mostra todos os comandos disponíveis
	@echo ""
	@echo "Comandos disponíveis:"
	@echo "--------------------------------------------"
	@grep -E '^[a-zA-Z_-]+:.*?##' Makefile | sort | awk 'BEGIN {FS = \":.*?## \"}; {printf \"\033[36m%-15s\033[0m %s\n\", $$1, $$2}'
	@echo "--------------------------------------------"
	@echo ""

up: ## Sobe todos os serviços com build
	@echo "🚀 Subindo containers..."
	docker compose up -d --build

up-show: ## Sobe tudo e exibe os endpoints disponíveis
	@echo "🚀 Subindo containers..."
	docker compose up -d --build
	@echo "⏳ Aguardando serviços estabilizarem..."
	sleep 5
	@echo ""
	@echo "======================================="
	@echo "🌐 Endpoints disponíveis:"
	@echo "---------------------------------------"
	@echo "📦 PostgreSQL:     http://localhost:5432"
	@echo "🧩 API (Spring):   http://localhost:8080"
	@echo "📄 API Health:     http://localhost:8080/actuator/health"
	@echo "💻 Frontend (Web): http://localhost:3000"
	@echo "======================================="
	@echo ""

stop: ## Para todos os serviços
	@echo "🛑 Parando containers..."
	docker compose down

restart: ## Reinicia todos os serviços com build
	@echo "🔄 Reiniciando containers..."
	docker compose down && docker compose up -d --build

logs: ## Mostra logs de todos os serviços
	@echo "📜 Logs dos containers..."
	docker compose logs -f

api: ## Builda somente o backend (API)
	@echo "🔧 Build da API..."
	cd backend && mvn clean package

web: ## Builda somente o frontend (Next.js)
	@echo "🌐 Build do frontend..."
	cd frontend && npm install && npm run build

db-reset: ## Reseta o banco removendo volume
	@echo "🗑️ Removendo volumes do banco..."
	docker compose down -v

build-all: ## Builda API + Web sem rodar containers
	@echo "🛠️ Build completo da stack..."
	cd backend && mvn clean package
	cd frontend && npm install && npm run build
	@echo "✔️ Build finalizado!"
