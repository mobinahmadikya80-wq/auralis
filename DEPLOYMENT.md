# 🚀 Auralis Pure Static Site Deployment Guide

This guide provides step-by-step instructions for deploying the **Auralis Audiology Platform** as a pure static web application across **GitHub Pages**, **Cloudflare Pages**, **Vercel**, and **Netlify** with **Decap CMS** integration.

---

## 📋 Pre-Deployment Checklist

Before deploying to production, run the build and lint checks locally:

```bash
# 1. Type-check all TypeScript files
npm run lint

# 2. Test static production build execution
npm run build
```

Ensure the build completes with zero errors and generates static output files in the `/dist` directory.

---

## 1. 🐙 Deployment to GitHub Pages

Auralis includes a pre-configured GitHub Actions workflow located at `.github/workflows/ci-cd.yml`.

### Step-by-Step Instructions:

1. **Push Repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial production release"
   git remote add origin https://github.com/YOUR_USERNAME/auralis.git
   git branch -M main
   git push -u origin main
   ```

2. **Configure GitHub Pages Settings**:
   - Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/auralis`
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

3. **Automatic Deployment**:
   - On every push to the `main` branch, the `.github/workflows/ci-cd.yml` pipeline will automatically build the static project and deploy it to GitHub Pages at `https://YOUR_USERNAME.github.io/auralis/`.

---

## 2. ⚡ Deployment to Cloudflare Pages

Cloudflare Pages provides global CDN distribution for static assets with zero cold starts and instant edge deployment.

### Method A: Direct GitHub Integration (Recommended)

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your `auralis` repository.
4. Configure the Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
5. Click **Save and Deploy**.

### Method B: Wrangler CLI Deployment

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build project and publish
npm run build
wrangler pages deploy dist --project-name=auralis
```

---

## 3. 📝 Decap CMS Studio Integration

Auralis includes a static GitHub-based CMS studio available at `/admin/`.

1. Access `/admin/#/` on your deployed domain.
2. Log in using GitHub OAuth or Netlify Identity.
3. Edit courses, research papers, textbooks, or case studies directly, which creates commits to your GitHub repository.

---

## 🔑 Environment Variables (Optional Client-Side Configuration)

Auralis runs 100% client-side without any server requirements. For optional client-side API enhancements:

| Variable Name | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Optional | Client-side API Key for Gemini AI Clinical Partner |
| `VITE_SITE_URL` | Optional | Canonical URL for SEO (e.g., `https://auralis-audiology.org`) |

Add these variables in your host dashboard environment settings if desired.
