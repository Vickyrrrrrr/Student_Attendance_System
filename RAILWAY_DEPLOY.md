# Railway CLI Deployment Guide

## Quick Terminal Deployment

### Step 1: Login to Railway
```bash
railway login
```
This will open your browser to authenticate.

### Step 2: Initialize Project
```bash
railway init
```
Choose "Create new project" and give it a name like "attendance-system"

### Step 3: Add MongoDB
```bash
railway add mongodb
```
This creates a free MongoDB database automatically!

### Step 4: Deploy Backend
```bash
cd backend
railway up
```

### Step 5: Get MongoDB URI
```bash
railway variables
```
Look for MONGO_URL - copy it!

### Step 6: Set Environment Variables
```bash
railway variables set MONGODB_URI=[paste mongo url]
railway variables set JWT_SECRET=MySecretKey12345
railway variables set NODE_ENV=production
```

### Step 7: Deploy Frontend (Use Vercel)
Frontend is easier on Vercel:
1. Go to vercel.com
2. Import your GitHub repo
3. Set root directory to `frontend`
4. Add env: REACT_APP_API_URL=https://[your-railway-backend-url]/api
5. Deploy!

---

## Alternative: Simple Browser Setup (Recommended)

Since Railway CLI needs authentication through browser anyway, it's actually **faster to use the web UI**.

**I recommend:**
1. Railway.app for backend + database (5 min setup)
2. Vercel.com for frontend (2 min setup)

Both have **instant GitHub integration** - just click a few buttons!

Want me to walk you through the browser method? It's honestly easier! 😊
