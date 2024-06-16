#!/bin/bash

# Timeout settings
MAX_RETRIES=30
RETRY_INTERVAL=2

# Run docker compose
echo "Starting docker-compose..."
docker-compose up -d

# Wait for MongoDB to start
echo "Waiting for MongoDB to start..."
RETRIES=0
until docker exec mongodb mongosh --eval "db.adminCommand('ping')" &> /dev/null; do
    if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
        echo "MongoDB did not start within the timeout period. Aborting."
        exit 1
    fi
    sleep $RETRY_INTERVAL
    ((RETRIES++))
    echo "Waiting for MongoDB to start... Attempt $RETRIES/$MAX_RETRIES"
done

echo "MongoDB started successfully."

# Create database and collection
docker exec -i mongodb mongosh <<EOF
use user_profiles;

db.createCollection("User");

db.User.createIndex({ email: 1 }, { unique: true });
db.User.createIndex({ username: 1 }, { unique: true });

db.User.insertOne({
  email: "example@example.com",
  password: "hashed_password",
  username: "example_user",
  profileImage: "path/to/image",
  bio: "This is an example bio",
  friends: [],
  wishlist: [],
  privacySettings: {
    profileVisibility: "public",
    activityVisibility: "public",
    messagePermissions: "everyone"
  },
  securitySettings: {
    twoFactorAuthEnabled: false,
    backupCodes: []
  },
  gameLibrary: [],
  badges: [],
  inventory: [],
  screenshots: [],
  videos: [],
  workshopItems: [],
  reviews: [],
  guides: [],
  artwork: []
});
EOF

echo "Database and collection created successfully."
