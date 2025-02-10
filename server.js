const express = require('express');
const mysql = require('mysql2/promise'); // promise based
const cors = require('cors');
const app = express();
app.use(express.json()); // JSON body parsing

// CORS ayarlarını genişletelim (origin ve allowedHeaders'ı dikkatlice kontrol etmeyi unutmayın)
const corsOptions = {
  origin: ['https://enginhafizoglu.com', 'http://localhost:4200'], // Replace with your Angular app's URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Important! For cookies and auth
};

app.use(cors(corsOptions));


// MySQL bağlantı bilgileri
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '9R1&q5$Wa',
    database: 'hfz_wp',
    connectionLimit: 10 // Important: connection pooling
});

// Test endpoint'i
app.get('/test', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});

// Tüm yazıları getirme endpoint'i
app.get('/posts', async (req, res) => {
    try {
        const [results] = await db.execute('SELECT ID, post_date, post_content, post_title FROM wp_posts WHERE post_type = "post" AND post_status = "publish" ORDER BY post_date DESC');
        res.json(results);
    } catch (error) {
        console.error('Veritabanı sorgu hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});

// Tekil yazı detayı endpoint'i
app.get('/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [results] = await db.execute(
            `
            SELECT 
                p.ID,
                p.post_date,
                p.post_content, 
                p.post_title,
                u.display_name as author,
                GROUP_CONCAT(t.name) as categories
            FROM wp_posts p
            LEFT JOIN wp_users u ON p.post_author = u.ID
            LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
            LEFT JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
            LEFT JOIN wp_terms t ON tt.term_id = t.term_id
            WHERE p.ID = ? 
            AND p.post_type = 'post' 
            AND p.post_status = 'publish'
            GROUP BY p.ID
            `,
            [id]
        );
        if (results.length === 0) {
            return res.status(404).json({ error: 'Yazı bulunamadı' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Veritabanı sorgu hatası:', error);
        res.status(500).json({ error: 'Veritabanı hatası' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    db.end();
    process.exit(0);
});