# Blog Post Application (React + Redux + Context API)

## Objective
Develop a Blog Post Application using React with Redux and Context API for state management, and deploy it using Azure Static Web App.

## Features Implemented
1. Display list of blog posts
2. View blog post details
3. Add a new blog post
4. Edit an existing blog post
5. Delete a blog post
6. Like a blog post
7. Validate post creation content length (minimum 30 words)

## Tech Stack
- React (Vite)
- Redux Toolkit + React Redux
- React Context API
- React Router DOM
- CSS (custom)

## Project Structure
```text
src/
  components/
    Footer.jsx
    Layout.jsx
    Navbar.jsx
  context/
    NotificationContext.jsx
  hooks/
    usePost.js
  pages/
    BlogEditorPage.jsx
    BlogHomePage.jsx
    BlogPostPage.jsx
  store/
    store.js
    postsSlice.js
  utils/
    formatDate.js
    storage.js
  App.jsx
  main.jsx
```

## Form Validation
- All fields are required when creating or editing a post.
- For creating a new post, content must include at least 30 words.
- If validation fails, an error notification is shown and the post is not saved.

## Redux vs Context Usage
### Redux (Global Domain State)
Redux is used for **blog post data** and core business actions:
- posts list storage
- add post
- edit post
- delete post
- like post
- selectors for list/detail reads

Files:
- `src/store/postsSlice.js`
- `src/store/store.js`

### Context API (Cross-Cutting Concerns)
Context is used for lightweight cross-app concerns that are not core domain entities:
- `NotificationContext`: success/error toast-like notifications

Files:
- `src/context/NotificationContext.jsx`

## Local Data Handling
No backend is used.
Blog posts are persisted in browser `localStorage` and rehydrated on app load.

## Local Setup Steps
1. Open terminal in project folder:
   ```powershell
   cd "c:\Users\anujyadav02\OneDrive - Nagarro\Desktop\blog assignment\blog-post-app"
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Run development server:
   ```powershell
   npm run dev
   ```
4. Open the URL shown in terminal (usually `http://localhost:5173`).

## Build Command
```powershell
npm run build
```

## Deployment (Azure Static Web App)
Deploy the application to Azure Static Web App service for production hosting.

### Prerequisites
- Azure account with an active subscription
- GitHub repository with the project code

### Deployment Steps
1. Push your repository to GitHub.
2. In Azure Portal:
   - Create a new **Static Web App** resource
   - Select GitHub as source
   - Authorize and select your repository and branch
3. Build configuration:
   - App location: `/`
   - API location: (leave empty if not needed)
   - Output location: `dist`
4. Azure automatically creates a GitHub Actions workflow
5. On every push to your branch, the app is built and deployed

### Configuration
Azure Static Web Apps automatically handles SPA routing redirects, so no additional configuration files (like `netlify.toml`) are required.

## Public URL
- Azure Static Web App URL: `ADD_YOUR_AZURE_STATIC_WEB_APP_URL_HERE`

## Assumptions Made
1. No backend/database required; localStorage persistence is acceptable.
2. Single-user local browser data is sufficient for assignment scope.
3. Authentication/authorization is out of scope.
4. Advanced SEO/SSR is out of scope.

## Deliverables Checklist
- [x] Public code repository (to be shared)
- [x] `node_modules` excluded from repository
- [x] Complete `README.md`
- [ ] Deployed application public URL (replace placeholder above after deployment)
