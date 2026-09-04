import express from 'express';
import { db } from '../database/db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/hobbies/posts
router.get('/posts', authMiddleware, (req, res) => {
  const posts = db.getTable('hobby_posts');
  res.json({ success: true, posts });
});

// POST /api/hobbies/posts
router.post('/posts', authMiddleware, (req, res) => {
  const { title, category, description, imageUrl, audioNote } = req.body;
  if (!title || !description) return res.status(400).json({ success: false, error: 'Title and description required' });

  const post = db.insert('hobby_posts', {
    author: req.user.displayName || 'Moonlight27',
    authorAvatar: 'sparkles',
    timeAgo: 'Just now',
    category: category || 'art',
    title,
    description,
    imageUrl: imageUrl || null,
    audioNote: audioNote || null,
    likesCount: 0,
    commentsCount: 0,
    saved: false,
    liked: false,
    comments: []
  });

  res.json({ success: true, post });
});

// POST /api/hobbies/posts/:id/like
router.post('/posts/:id/like', authMiddleware, (req, res) => {
  const post = db.findOne('hobby_posts', p => p.id === req.params.id);
  if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

  const nextLiked = !post.liked;
  db.update('hobby_posts', p => p.id === req.params.id, {
    liked: nextLiked,
    likesCount: nextLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1)
  });

  res.json({ success: true, liked: nextLiked });
});

// POST /api/hobbies/posts/:id/comment
router.post('/posts/:id/comment', authMiddleware, (req, res) => {
  const { text } = req.body;
  const post = db.findOne('hobby_posts', p => p.id === req.params.id);
  if (!post) return res.status(404).json({ success: false, error: 'Post not found' });

  const comments = post.comments || [];
  comments.push({
    id: `c-${Date.now()}`,
    author: req.user.displayName || 'Moonlight27',
    text: text.trim()
  });

  db.update('hobby_posts', p => p.id === req.params.id, {
    comments,
    commentsCount: comments.length
  });

  res.json({ success: true, comments });
});

// GET /api/hobbies/monitor
router.get('/monitor', authMiddleware, (req, res) => {
  res.json({
    success: true,
    monitor: {
      lastHobbyDate: '2 days ago',
      consecutiveStudyWorkHours: '4.5 hrs',
      recommendedMinutes: 20,
      headline: "You've worked hard today.",
      subtext: "You haven't spent much time on something you enjoy recently.",
      actionPrompt: "Take 20 minutes for something you enjoy.",
      suggestedActivities: [
        { name: 'Botanical Painting / Sketching', time: '20 min', color: 'text-amber-700 bg-amber-50' },
        { name: 'Acoustic Guitar / Music', time: '15 min', color: 'text-emerald-700 bg-emerald-50' },
        { name: 'Reading Fiction / Poetry', time: '20 min', color: 'text-blue-700 bg-blue-50' },
        { name: 'Mindful Evening Stroll', time: '20 min', color: 'text-rose-700 bg-rose-50' }
      ]
    }
  });
});

export default router;
