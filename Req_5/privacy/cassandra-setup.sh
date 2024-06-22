#!/bin/bash

# Timeout settings
MAX_RETRIES=30
RETRY_INTERVAL=2

# Run docker compose
echo "Starting docker-compose..."
docker-compose up -d

# Wait for Cassandra to start
echo "Waiting for Cassandra to start..."
RETRIES=0
until docker exec privacy-container cqlsh -e "DESCRIBE KEYSPACES"; do
    if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
        echo "Cassandra did not start within the timeout period. Aborting."
        exit 1
    fi
    sleep $RETRY_INTERVAL
    ((RETRIES++))
    echo "Waiting for Cassandra to start... Attempt $RETRIES/$MAX_RETRIES"
done

# Create Keyspace
docker exec -i privacy-container cqlsh <<EOF
CREATE KEYSPACE IF NOT EXISTS game_tracking WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};
EOF

# Create Tables
docker exec -i privacy-container cqlsh -k game_tracking <<EOF
CREATE TABLE IF NOT EXISTS user_permissions (
    user_id UUID,
    item_type TEXT,
    item_id UUID,
    permission_type TEXT,
    allowed_users SET<UUID>,
    PRIMARY KEY (user_id, item_type, item_id, permission_type)
);
EOF

echo "Tables created successfully."
