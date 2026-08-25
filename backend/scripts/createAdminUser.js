#!/usr/bin/env node

require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../api/config/database');

const EMAIL = process.argv[2];
const PASSWORD = process.argv[3];

if (!EMAIL || !PASSWORD) {
    console.error('Usage: node scripts/createAdminUser.js <email> <password>');
    process.exit(1);
}

async function main() {
    const existing = await db.query('SELECT user_id, email, role FROM login WHERE email = $1', [EMAIL]);
    if (existing.rows.length > 0) {
        console.log('Account already exists:', existing.rows[0]);
        process.exit(0);
    }

    const adminIdRes = await db.query(`
        SELECT COALESCE(MAX(CAST(NULLIF(SUBSTRING(user_id FROM 3), '') AS INTEGER)), 0) + 1 AS next_num
        FROM login
        WHERE role = 'admin' AND user_id LIKE 'A_%'
    `);
    const userId = `A_${String(adminIdRes.rows[0].next_num).padStart(3, '0')}`;
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    const insertRes = await db.query(
        `INSERT INTO login (user_id, email, password, role, is_approved, status)
         VALUES ($1, $2, $3, 'admin', TRUE, 'approved')
         RETURNING user_id, email, role, is_approved, status`,
        [userId, EMAIL, hashedPassword]
    );

    console.log('Admin created successfully:', insertRes.rows[0]);
    process.exit(0);
}

main().catch((err) => {
    console.error('Failed:', err.message);
    process.exit(1);
});
