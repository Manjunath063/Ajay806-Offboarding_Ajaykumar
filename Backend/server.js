const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3044;

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'new_employee_db',
  password: 'admin123',
  port: 5432,
});

// Middleware
app.use(cors({
  origin: ['http://51.20.115.251:8079', 'http://51.20.115.251:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    await client.query(`
      DROP TABLE IF EXISTS offboarding;
      CREATE TABLE IF NOT EXISTS offboarding (
        id SERIAL PRIMARY KEY,
        emp_id VARCHAR(7) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        department VARCHAR(50) NOT NULL,
        role VARCHAR(50) NOT NULL,
        laptop_returned VARCHAR(3) NOT NULL,
        phone_returned VARCHAR(3) NOT NULL,
        access_cards_returned VARCHAR(3) NOT NULL,
        final_paycheck INTEGER NOT NULL,
        benefits_cleared VARCHAR(3) NOT NULL,
        exit_interview TEXT NOT NULL,
        reason_for_leaving VARCHAR(50) NOT NULL
      );
    `);
    console.log("Database initialized.");
    client.release();
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  initializeDatabase();
});

<<<<<<< HEAD
// Get all offboarding records
app.get('/api/offboarding/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT emp_id, name, email, department, role, laptop_returned, phone_returned,
             access_cards_returned, final_paycheck, benefits_cleared, exit_interview,
             reason_for_leaving, submission_date
      FROM offboarding
      ORDER BY submission_date DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Fetch error:', err.message);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Start server
pool.connect()
  .then(() => {
    console.log('✅ Connected to database');
    initializeDatabase().then(() => {
      app.listen(port, () => {
        console.log(`🚀 Server running on http://51.20.115.251:${port}`);
        console.log(`📄 Offboarding Form: http://51.20.115.251:${port}/offboarding.html`);
        console.log(`📊 HR Offboarding Dashboard: http://51.20.115.251:${port}/hrOffboarding.html`);
      });
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });
=======
>>>>>>> e15ec7eb84db53f5f3f494bb3b7df910ce7c1030
