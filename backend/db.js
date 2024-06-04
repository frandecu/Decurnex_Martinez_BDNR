const cassandra = require("cassandra-driver");

const client = new cassandra.Client({
  contactPoints: ["localhost:9042"],
  keyspace: "game_tracking",
  localDataCenter: "datacenter1",
});

client
  .connect()
  .then(() => {
    console.log("Connected to Cassandra database");
  })
  .catch((err) => {
    console.error("Error connecting to Cassandra:", err);
  });

module.exports = client;
