const STORAGE_KEY = 'blog-post-app-posts'

export function loadPosts(defaultPosts) {
  try {
    const savedPosts = localStorage.getItem(STORAGE_KEY)
    if (!savedPosts) {
      return defaultPosts
    }

    const parsed = JSON.parse(savedPosts)
    if (!Array.isArray(parsed)) {
      return defaultPosts
    }

    return parsed.map((post) => ({
      ...post,
      category: post.category || 'General',
      liked: post.liked ?? false,
    }))
  } catch {
    return defaultPosts
  }
}

export function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}
