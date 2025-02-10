import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tüm blog yazılarını getir
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.ID,
        p.post_title,
        p.post_content,
        p.post_excerpt,
        p.post_date,
        p.post_modified,
        p.guid as post_url,
        u.display_name as author,
        GROUP_CONCAT(
          DISTINCT t.name
          ORDER BY t.name ASC
          SEPARATOR ','
        ) as categories,
        (
          SELECT pm.meta_value
          FROM wp_postmeta pm
          WHERE pm.post_id = p.ID
          AND pm.meta_key = '_thumbnail_id'
          LIMIT 1
        ) as featured_image_id
      FROM wp_posts p
      LEFT JOIN wp_users u ON p.post_author = u.ID
      LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
      LEFT JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
      LEFT JOIN wp_terms t ON tt.term_id = t.term_id
      WHERE p.post_type = 'post' 
      AND p.post_status = 'publish'
      GROUP BY p.ID
      ORDER BY p.post_date DESC
    `);
    
    // Featured image URL'lerini al
    const postsWithImages = await Promise.all(rows.map(async (post: any) => {
      if (post.featured_image_id) {
        const [imageRows] = await pool.query(`
          SELECT guid
          FROM wp_posts
          WHERE ID = ?
        `, [post.featured_image_id]);
        
        if (imageRows.length > 0) {
          post.featured_image_url = imageRows[0].guid;
        }
      }
      delete post.featured_image_id;
      return post;
    }));

    res.json(postsWithImages);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Kategorileri getir
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        t.term_id as id,
        t.name,
        t.slug,
        tt.description,
        tt.count
      FROM wp_terms t
      JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
      WHERE tt.taxonomy = 'category'
      ORDER BY t.name ASC
    `);
    
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Kategori bazlı yazıları getir
app.get('/api/posts/category/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.ID,
        p.post_title,
        p.post_content,
        p.post_excerpt,
        p.post_date,
        p.post_modified,
        p.guid as post_url,
        u.display_name as author
      FROM wp_posts p
      LEFT JOIN wp_users u ON p.post_author = u.ID
      LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
      LEFT JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
      LEFT JOIN wp_terms t ON tt.term_id = t.term_id
      WHERE p.post_type = 'post' 
      AND p.post_status = 'publish'
      AND t.slug = ?
      ORDER BY p.post_date DESC
    `, [req.params.slug]);
    
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 