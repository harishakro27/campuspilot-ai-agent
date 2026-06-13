import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "987ppp21",
  database: process.env.DB_NAME || "campuspilot_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected Successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
    return false;
  }
}

export async function query(sql, values) {
  try {
    const [results] = await pool.execute(sql, values);
    return { success: true, data: results };
  } catch (error) {
    console.error("Query Error:", error);
    return { success: false, error: error.message };
  }
}

export default pool;
