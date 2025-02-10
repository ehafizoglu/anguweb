const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// CORS ayarlarını genişletelim
app.use(cors({
    origin: ['https://enginhafizoglu.com', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// MySQL bağlantı bilgileri
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9R1&q5$Wa',
    database: 'hfz_wp'
});

// Veritabanına bağlanma
db.connect((err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err);
        return;
    }
    console.log('Veritabanına başarıyla bağlandı.');
});

// Test endpoint'i
app.get('/test', (req, res) => {
    res.json({ message: 'API çalışıyor!' });
});

// Tüm yazıları getirme endpoint'i
app.get('/posts', async (req, res) => {  // /api/posts yerine /posts
    console.log('GET /posts endpoint çağrıldı');
    const query = `
        SELECT 
            ID,
            post_date,
            post_content, 
            post_title 
        FROM wp_posts 
        WHERE post_type = 'post' 
        AND post_status = 'publish' 
        ORDER BY post_date DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veritabanı sorgu hatası:', err);
            return res.status(500).json({ error: 'Veritabanı hatası' });
        }
        console.log(`${results.length} adet yazı bulundu`);
        res.json(results);
    });
});

// Tekil yazı detayı endpoint'i
app.get('/posts/:id', async (req, res) => {  // /api/posts/:id yerine /posts/:id
    console.log('GET /posts/:id endpoint çağrıldı, ID:', req.params.id);
    const query = `
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
    `;
    
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Veritabanı sorgu hatası:', err);
            return res.status(500).json({ error: 'Veritabanı hatası' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Yazı bulunamadı' });
        }
        
        console.log('Yazı bulundu:', results[0].post_title);
        res.json(results[0]);
    });
});

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
    console.error('Sunucu hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    db.end();
    process.exit(0);
});