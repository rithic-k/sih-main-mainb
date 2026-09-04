// mockHobbies.js - Hobby Hub constructive social feed & Hobby Engagement Monitor
const STORAGE_KEY_HOBBY_POSTS = 'seera_hobby_posts';
const STORAGE_KEY_HOBBY_LOGS = 'seera_hobby_logs';

export const HOBBY_CATEGORIES = [
  { id: 'all', label: 'For You', icon: 'Sparkles' },
  { id: 'art', label: 'Art & Sketching', icon: 'Palette' },
  { id: 'music', label: 'Music', icon: 'Music' },
  { id: 'writing', label: 'Writing', icon: 'PenTool' },
  { id: 'photography', label: 'Photography', icon: 'Camera' },
  { id: 'crafts', label: 'Crafts & DIY', icon: 'Scissors' },
  { id: 'technology', label: 'Creative Tech', icon: 'Cpu' },
  { id: 'fitness', label: 'Movement', icon: 'Activity' }
];

export const INITIAL_HOBBY_POSTS = [
  {
    id: 'post-1',
    author: 'CedarBreeze',
    authorAvatar: 'tree-pine',
    timeAgo: '2 hours ago',
    category: 'art',
    title: 'Botanical ink study: Monsoon ferns',
    description: 'Took a break from circuit design this evening to sketch the small ferns growing outside my balcony. Used a 0.3mm fineliner and watered-down gouache.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    likesCount: 24,
    commentsCount: 3,
    saved: false,
    liked: false,
    comments: [
      { id: 'c1', author: 'AmberSky', text: 'The delicate line-work on the fronds is really soothing to look at!' },
      { id: 'c2', author: 'Moonlight27', text: 'Love how clean the gouache wash looks.' }
    ]
  },
  {
    id: 'post-2',
    author: 'EchoStrings',
    authorAvatar: 'guitar',
    timeAgo: '4 hours ago',
    category: 'music',
    title: 'Acoustic Fingerpicking Loop in D-Major',
    description: 'Spent 15 minutes improvising a peaceful chord progression on the nylon guitar. Just keeping the rhythm gentle and uncluttered.',
    audioNote: 'Acoustic Loop (0:45)',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    likesCount: 38,
    commentsCount: 5,
    saved: true,
    liked: true,
    comments: [
      { id: 'c3', author: 'QuietRiver', text: 'This was exactly what I needed to hear after a long shift.' }
    ]
  },
  {
    id: 'post-3',
    author: 'PixelWeaver',
    authorAvatar: 'terminal',
    timeAgo: 'Yesterday',
    category: 'technology',
    title: 'Generative wave pattern in 50 lines of Canvas JS',
    description: 'Built a tiny generative wave visualizer that undulates based on sine curves. Fun weekend micro-project with zero pressure.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    likesCount: 47,
    commentsCount: 8,
    saved: false,
    liked: false,
    comments: [
      { id: 'c4', author: 'LogicCraft', text: 'The math behind smooth harmonic waves is always so elegant.' }
    ]
  },
  {
    id: 'post-4',
    author: 'SilverQuill',
    authorAvatar: 'feather',
    timeAgo: '2 days ago',
    category: 'writing',
    title: 'Micro-prose: The Rain on Ceramic Tiles',
    description: '"The morning arrived without urgency. Droplets gathered on terracotta rims, lingering just long enough to capture the gray sky before dropping to the soil below."',
    likesCount: 19,
    commentsCount: 2,
    saved: false,
    liked: false,
    comments: []
  },
  {
    id: 'post-5',
    author: 'TerraLens',
    authorAvatar: 'aperture',
    timeAgo: '3 days ago',
    category: 'photography',
    title: 'Golden hour shadows through wicker chairs',
    description: 'No filters, just 5:30 PM natural sunlight creating geometric lattice patterns across the living room floor.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    likesCount: 31,
    commentsCount: 4,
    saved: false,
    liked: false,
    comments: []
  }
];

export const mockHobbiesService = {
  getPosts: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HOBBY_POSTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEY_HOBBY_POSTS, JSON.stringify(INITIAL_HOBBY_POSTS));
    return INITIAL_HOBBY_POSTS;
  },

  createPost: (postData) => {
    const posts = mockHobbiesService.getPosts();
    const newPost = {
      id: `post-${Date.now()}`,
      author: postData.author || 'Moonlight27',
      authorAvatar: 'sparkles',
      timeAgo: 'Just now',
      category: postData.category || 'art',
      title: postData.title,
      description: postData.description,
      imageUrl: postData.imageUrl || null,
      likesCount: 0,
      commentsCount: 0,
      saved: false,
      liked: false,
      comments: []
    };
    const updated = [newPost, ...posts];
    localStorage.setItem(STORAGE_KEY_HOBBY_POSTS, JSON.stringify(updated));
    return newPost;
  },

  toggleLike: (postId) => {
    const posts = mockHobbiesService.getPosts();
    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      const isLiked = !p.liked;
      return {
        ...p,
        liked: isLiked,
        likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
      };
    });
    localStorage.setItem(STORAGE_KEY_HOBBY_POSTS, JSON.stringify(updated));
    return updated;
  },

  toggleSave: (postId) => {
    const posts = mockHobbiesService.getPosts();
    const updated = posts.map(p => p.id === postId ? { ...p, saved: !p.saved } : p);
    localStorage.setItem(STORAGE_KEY_HOBBY_POSTS, JSON.stringify(updated));
    return updated;
  },

  addComment: (postId, text, author = 'Moonlight27') => {
    const posts = mockHobbiesService.getPosts();
    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      const newComment = { id: `c-${Date.now()}`, author, text };
      return {
        ...p,
        comments: [...(p.comments || []), newComment],
        commentsCount: (p.commentsCount || 0) + 1
      };
    });
    localStorage.setItem(STORAGE_KEY_HOBBY_POSTS, JSON.stringify(updated));
    return updated;
  },

  getHobbyMonitorData: () => {
    return {
      lastHobbyDate: '2 days ago',
      consecutiveStudyWorkHours: '4.5 hrs',
      recommendedMinutes: 20,
      headline: "You've worked hard today.",
      subtext: "You haven't spent much time on something you enjoy recently.",
      actionPrompt: "Take 20 minutes for something you enjoy.",
      suggestedActivities: [
        { name: 'Botanical Painting / Sketching', time: '20 min', icon: 'Palette', color: 'text-amber-700 bg-amber-50' },
        { name: 'Acoustic Guitar / Music Listening', time: '15 min', icon: 'Music', color: 'text-emerald-700 bg-emerald-50' },
        { name: 'Reading Fiction / Poetry', time: '20 min', icon: 'BookOpen', color: 'text-blue-700 bg-blue-50' },
        { name: 'Mindful Evening Stroll', time: '20 min', icon: 'Footprints', color: 'text-rose-700 bg-rose-50' },
        { name: 'Photography & Light Exploration', time: '15 min', icon: 'Camera', color: 'text-purple-700 bg-purple-50' }
      ]
    };
  }
};
