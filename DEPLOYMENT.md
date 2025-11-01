# Deployment Guide - Student Attendance System

## 🚀 Deploy to Render.com (Recommended)

### Step 1: Create MongoDB Database (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free account
3. Create a **FREE** M0 cluster
4. Create a database user and password
5. Add `0.0.0.0/0` to IP whitelist (allow from anywhere)
6. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/attendance`)

### Step 2: Deploy Backend to Render

1. Push this code to GitHub
2. Go to [Render.com](https://render.com) and sign up (free)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `attendance-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Add Environment Variables**:
     - `MONGODB_URI` = Your MongoDB Atlas connection string
     - `JWT_SECRET` = Any random secure string (e.g., `mySecretKey12345!@#`)
     - `NODE_ENV` = `production`
6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://attendance-backend.onrender.com`)

### Step 3: Deploy Frontend to Render

1. Go to Render dashboard → **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `attendance-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Add Environment Variable**:
     - `REACT_APP_API_URL` = Your backend URL + `/api` (e.g., `https://attendance-backend.onrender.com/api`)
4. Click **"Create Static Site"**
5. Wait for deployment

### Step 4: Access Your Live Website! 🎉

Your frontend URL will be like: `https://attendance-frontend.onrender.com`

---

## 🌟 Alternative: Deploy to Railway.app

### For Backend + Database:

1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway will auto-detect Node.js
6. Add MongoDB from Railway templates
7. Set environment variables in Railway dashboard

### For Frontend:

Deploy to [Vercel](https://vercel.com):
1. Sign in with GitHub
2. Import your repository
3. Set root directory to `frontend`
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy!

---

## 📋 Free Tier Limits

**Render.com Free:**
- ✅ 750 hours/month (enough for 1 app 24/7)
- ⚠️ App sleeps after 15 min of inactivity (wakes in 30s)
- ✅ 100 GB bandwidth/month

**Railway.app Free:**
- ✅ $5 free credits/month
- ✅ Always running (no sleep)

**MongoDB Atlas Free:**
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Good for 1000+ students

---

## 🔒 Security Notes

1. Never commit `config.env` to GitHub (it's in `.gitignore`)
2. Use strong JWT_SECRET in production
3. Use MongoDB Atlas IP whitelist in production
4. Enable CORS only for your frontend domain

---

## 📞 Support

After deployment, test your APIs:
- Backend health: `https://your-backend-url.onrender.com/api/health`
- Login: `https://your-frontend-url.onrender.com/login`

If you face issues, check Render logs in the dashboard.
