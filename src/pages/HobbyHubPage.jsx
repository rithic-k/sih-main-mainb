import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { PageHeader } from '../components/common/PageHeader';
import { Avatar } from '../components/common/Avatar';
import { mockHobbiesService, HOBBY_CATEGORIES } from '../services/mockHobbies';
import {
  Palette, Heart, MessageSquare, Bookmark, Flag, Plus,
  Sparkles, Music, Camera, PenTool, Scissors, Cpu, Activity,
  Clock, Share2, CheckCircle2, ChevronRight, Footprints, BookOpen
} from 'lucide-react';

export const HobbyHubPage = () => {
  const { activeUser, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState(() => mockHobbiesService.getPosts());
  const [hobbyMonitor] = useState(() => mockHobbiesService.getHobbyMonitorData());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  // New post form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('art');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const filteredPosts = posts.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleToggleLike = (postId) => {
    const updated = mockHobbiesService.toggleLike(postId);
    setPosts(updated);
  };

  const handleToggleSave = (postId) => {
    const updated = mockHobbiesService.toggleSave(postId);
    setPosts(updated);
    showToast('Saved to your inspiration board 🌱', 'info');
  };

  const handleReport = (postId) => {
    showToast('Thank you. We review all flagged community posts promptly.', 'info');
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const updated = mockHobbiesService.addComment(postId, text.trim(), activeUser.displayName);
    setPosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
    showToast('Comment shared anonymously 🌱', 'success');
  };

  const handleCreatePostSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const created = mockHobbiesService.createPost({
      author: activeUser.displayName,
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim(),
      imageUrl: newImageUrl.trim() || null
    });

    setPosts(mockHobbiesService.getPosts());
    showToast('Shared to Hobby Hub anonymously!', 'success');
    setIsCreateModalOpen(false);
    // Reset
    setNewTitle('');
    setNewDescription('');
    setNewImageUrl('');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Hobby Hub & Creative Space"
        subtitle="A constructive, non-toxic space to share creative downtime. No follower counts or vanity metrics."
        badge="Positive Creative Community"
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Share an Activity
          </Button>
        }
      />

      {/* Hobby Monitor Card */}
      <Card variant="terracottaSubtle" className="p-6 sm:p-8 space-y-4 border-terracotta-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-terracotta-800 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              <span>Hobby Engagement Rhythm</span>
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-clay-900">
              {hobbyMonitor.headline}
            </h3>
            <p className="text-xs sm:text-sm text-clay-700 max-w-2xl leading-relaxed">
              {hobbyMonitor.subtext} {hobbyMonitor.actionPrompt}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {hobbyMonitor.suggestedActivities.slice(0, 3).map((act, i) => (
              <div key={i} className={`px-3 py-2 rounded-xl text-xs font-semibold border border-cream-200 flex items-center gap-1.5 ${act.color}`}>
                <span>{act.name}</span>
                <span className="opacity-75 font-normal">({act.time})</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {HOBBY_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-sage-600 text-white border-sage-600 shadow-soft'
                : 'bg-white border-cream-200 text-clay-700 hover:bg-cream-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="p-6 bg-white space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Author & Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={post.author} seed={post.authorAvatar} size="sm" />
                  <div>
                    <span className="text-xs font-bold text-clay-900 block">{post.author}</span>
                    <span className="text-[10px] text-clay-700">{post.timeAgo} • #{post.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleReport(post.id)}
                  className="text-clay-700 hover:text-rose-600 p-1"
                  title="Report inappropriate content"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Description */}
              <h4 className="font-serif text-lg font-bold text-clay-900 leading-snug">
                {post.title}
              </h4>
              <p className="text-xs sm:text-sm text-clay-700 leading-relaxed">
                {post.description}
              </p>

              {/* Attached Image if any */}
              {post.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-cream-200 aspect-[16/9] bg-sand-50">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Attached Audio loop if any */}
              {post.audioNote && (
                <div className="p-3 rounded-xl bg-sage-50 border border-sage-200 text-xs font-semibold text-sage-800 flex items-center gap-2">
                  <Music className="w-4 h-4 text-sage-600" />
                  <span>{post.audioNote}</span>
                </div>
              )}
            </div>

            {/* Interaction Bar & Comments */}
            <div className="space-y-3 pt-3 border-t border-cream-100">
              <div className="flex items-center justify-between text-xs text-clay-700">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors font-semibold ${
                      post.liked ? 'text-rose-600' : 'hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{post.likesCount} appreciations</span>
                  </button>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-clay-700" />
                    <span>{post.commentsCount} comments</span>
                  </span>
                </div>

                <button
                  onClick={() => handleToggleSave(post.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    post.saved ? 'text-terracotta-600 bg-terracotta-50' : 'hover:text-terracotta-600'
                  }`}
                  title={post.saved ? 'Saved' : 'Save post'}
                >
                  <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-terracotta-600' : ''}`} />
                </button>
              </div>

              {/* Comments snippet */}
              {post.comments && post.comments.length > 0 && (
                <div className="space-y-1.5 bg-cream-50/70 p-3 rounded-xl text-xs">
                  {post.comments.slice(-2).map((c) => (
                    <div key={c.id} className="text-clay-800">
                      <strong className="text-clay-900">{c.author}:</strong> {c.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Leave a kind, constructive note..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                  className="flex-1 px-3 py-1.5 text-xs bg-cream-50 border border-cream-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-sage-500"
                />
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => handleAddComment(post.id)}
                >
                  Post
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Hobby Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Share Your Creative Downtime"
        subtitle="Post your artwork, poem, music loop or project anonymously."
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreatePostSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
              Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Botanical ink study of balcony ferns"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-clay-900 focus:outline-none focus:ring-2 focus:ring-sage-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs text-clay-900"
            >
              <option value="art">Art & Sketching</option>
              <option value="music">Music & Instruments</option>
              <option value="writing">Creative Writing</option>
              <option value="photography">Photography</option>
              <option value="crafts">Crafts & DIY</option>
              <option value="technology">Creative Tech</option>
              <option value="fitness">Movement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              placeholder="Share what you enjoyed about making or doing this..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-clay-900 focus:outline-none focus:ring-2 focus:ring-sage-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-clay-900 uppercase tracking-wider mb-1">
              Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs text-clay-900"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-cream-100">
            <Button variant="secondary" size="md" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" icon={CheckCircle2}>
              Share Anonymously
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
