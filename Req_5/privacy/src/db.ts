import cassandra from 'cassandra-driver';

const createCassandraClient = () => {
  let client = null;
  const getInstance = async () => {
    if (!client) {
      client = new cassandra.Client({
        contactPoints: ['localhost:9043'],
        keyspace: 'game_tracking',
        localDataCenter: 'datacenter1',
      });

      try {
        await client.connect();
        console.log('Connected to Cassandra database');
      } catch (err) {
        console.error('Error connecting to Cassandra:', err);
        client = null;
      }
    }
    return client;
  };

  return { getInstance };
};

export const dbInstance = createCassandraClient();
