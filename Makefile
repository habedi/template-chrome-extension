# ################################################################################
# # Configuration and Variables
# ################################################################################
SRC_DIR       := src
DIST_DIR      := dist
PACKAGE_NAME  := extension.zip
JUNK_DIRS     := node_modules $(DIST_DIR)

SHELL         := /usr/bin/env bash
.SHELLFLAGS   := -eu -o pipefail -c

################################################################################
# Targets
################################################################################

.PHONY: all help build rebuild release clean lint format test install-deps setup-hooks test-hooks
.DEFAULT_GOAL := help

help: ## Show the help messages for all targets
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*## .*$$' Makefile | \
	awk 'BEGIN {FS = ":.*## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

all: install-deps lint test build  ## Install deps, lint, test, and build the project

install-deps: ## Install project dependencies from `package.json`
	@echo "--> Installing npm dependencies..."
	@npm install

lint: ## Check code style with ESLint
	@echo "--> Running code style checks..."
	@npm run lint

format: ## Format code with Prettier
	@echo "--> Formatting source files..."
	@npm run format

test: ## Run the tests
	@echo "--> Running tests..."
	@npm run test

build: ## Compile TypeScript, copy static assets, and package the extension into $(PACKAGE_NAME)
	@echo "--> Building the extension into $(DIST_DIR)/ ..."
	@npm run build
	@echo "--> Packaging the extension into $(PACKAGE_NAME)..."
	@cd $(DIST_DIR) && zip -r ../$(PACKAGE_NAME) .

rebuild: clean build  ## Clean the project then build it again

release: build ## Create a release package
	@echo "--> Release package created: $(PACKAGE_NAME)"

clean: ## Remove build artifacts and dependencies
	@echo "--> Removing build artifacts and installed dependencies..."
	@rm -rf $(JUNK_DIRS) $(PACKAGE_NAME)

setup-hooks: ## Install Git hooks using pre-commit
	@echo "--> Setting up Git hooks..."
	@pre-commit install --hook-type pre-commit --hook-type pre-push

test-hooks: ## Test Git hooks on all files
	@echo "--> Testing Git hooks..."
	@pre-commit run --all-files --show-diff-on-failure
