import { Pool } from 'pg';
import server from '../constants/server';

const pool = new Pool({
    connectionString: server.postgresСonnectionString,
});

export default pool;