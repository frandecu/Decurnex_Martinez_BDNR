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
until docker exec cassandra cqlsh -e "DESCRIBE KEYSPACES"; do
    if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
        echo "Cassandra did not start within the timeout period. Aborting."
        exit 1
    fi
    sleep $RETRY_INTERVAL
    ((RETRIES++))
    echo "Waiting for Cassandra to start... Attempt $RETRIES/$MAX_RETRIES"
done

# Create Keyspace
docker exec -i cassandra cqlsh <<EOF
CREATE KEYSPACE IF NOT EXISTS game_tracking WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};
EOF

# Create Tables
docker exec -i cassandra cqlsh -k game_tracking <<EOF
CREATE TABLE IF NOT EXISTS user_activity (
    user_id UUID,
    game_id UUID,
    timestamp TIMESTAMP,
    activity_type TEXT,
    activity_data MAP<TEXT, TEXT>,
    PRIMARY KEY ((user_id), game_id, timestamp)
) WITH CLUSTERING ORDER BY (game_id ASC, timestamp DESC);
EOF

echo "Tables created successfully."
