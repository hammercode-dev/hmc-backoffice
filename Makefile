.PHONY: build deploy clean

# Include environment variables from .env file if it exists
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Variables with defaults from .env
SERVER_USER ?= $(DEPLOY_SERVER_USER)
SERVER_IP ?= $(DEPLOY_SERVER_IP)
SSH_KEY ?= $(DEPLOY_SSH_KEY)
DEPLOY_PATH ?= $(DEPLOY_PATH)
LOCAL_DIST ?= $(DEPLOY_LOCAL_DIST)
LOCAL_CONFIG ?= $(DEPLOY_LOCAL_CONFIG)

# Build the project
build:
	npm run build

# Deploy to server | Need to run manual script to restart service
deploy: build
	@echo "Deploying to server..."
	scp -r -i $(SSH_KEY) $(LOCAL_DIST)/ $(SERVER_USER)@$(SERVER_IP):$(DEPLOY_PATH)
	scp -i $(SSH_KEY) $(LOCAL_CONFIG) $(SERVER_USER)@$(SERVER_IP):$(DEPLOY_PATH)
	@echo "Deployment complete!"

# Clean build artifacts
clean:
	rm -rf $(LOCAL_DIST)
