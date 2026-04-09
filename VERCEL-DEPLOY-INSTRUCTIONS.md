# 🚀 Vercel Deployment Instructions

## What I've Done:
✅ Build completed successfully
✅ Code pushed to GitHub: `clawopsstudio-web/clawops-studio-web`
✅ Ready to deploy

## Your Deployment Steps:

### Option 1: Deploy via Vercel Dashboard (Easiest)
1. Go to: https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import from: https://github.com/clawopsstudio-web/clawops-studio-web
4. Click "Deploy"
5. Wait for deployment to complete (2-3 minutes)
6. Your site will be live at: `clawops-studio-web.vercel.app`

### Option 2: Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy to production
cd /root/.openclaw/workspaces/clawops-web
vercel --prod --yes

# 4. Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# 5. Run migration and add keys in Dashboard
# (see Supabase instructions below)
```

---

## ⚠️ BEFORE DEPLOYING - DO THESE 2 THINGS:

### 1. Run Supabase Migration
```
Go to: https://supabase.com/dashboard/project/dyzkfmdjusdyjmytgeah/sql/new

Paste: /root/.openclaw/workspaces/dave/supabase/migrations/20260407021800_initial_schema.sql

Click "Run"
Tell me: "Supabase migration done"
```

### 2. Add Environment Variables to Vercel Dashboard
```
1. Go to: https://vercel.com/dashboard/clawops-studio-web/settings/environment-variables

2. Add these 3 variables:
   NEXT_PUBLIC_SUPABASE_URL = https://dyzkfmdjusdyjmytgeah.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = <your anon key>
   SUPABASE_SERVICE_ROLE_KEY = <your service key>

3. Refresh your browser after adding
```

Get your keys from: https://supabase.com/dashboard/project/dyzkfmdjusdyjmytgeah/api

---

## 📝 AFTER DEPLOYMENT:

### Test the Full User Flow:
1. Visit your deployed site
2. Click "Sign Up" → create account
3. Complete onboarding form
4. Login to dashboard
5. Try the new pages:
   - `/dashboard/cli-prebuilder`
   - `/dashboard/mcp-library`
6. Test the APIs work correctly

---

## 🎯 LAUNCH CHECKLIST:

Before you tell me "deployed", verify:

- [ ] Supabase migration run
- [ ] Environment variables added in Vercel
- [ ] Site deployed and accessible
- [ ] Can sign up new user
- [ ] Can complete onboarding form
- [ ] Can access dashboard
- [ ] Can access CLI Prebuilder page
- [ ] Can access MCP Library page

Once all above checked → **LAUNCH DAY!** 🚀