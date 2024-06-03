#!/bin/bash

# Run docker compose
docker-compose up -d

# Wait for Cassandra to start
echo "Waiting for Cassandra to start..."
until docker exec cassandra cqlsh -e "DESCRIBE KEYSPACES"; do
  sleep 2
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
