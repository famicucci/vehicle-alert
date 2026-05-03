import mysql from "mysql2/promise";

const globalForPool = globalThis as unknown as { mysqlPool: mysql.Pool | undefined };

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name} (set it in .env.local)`);
  return v;
}

export function getPool(): mysql.Pool {
  if (!globalForPool.mysqlPool) {
    globalForPool.mysqlPool = mysql.createPool({
      host: requiredEnv("DB_HOST"),
      port: Number(requiredEnv("DB_PORT")),
      user: requiredEnv("DB_USERNAME"),
      password: requiredEnv("DB_PASSWORD"),
      database: requiredEnv("DB_NAME"),
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return globalForPool.mysqlPool;
}
