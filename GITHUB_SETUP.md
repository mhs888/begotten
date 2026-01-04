# How to Push Code to GitHub (First Time)

This guide will walk you through pushing your code to GitHub step by step.

## Step 1: Create a GitHub Account

1. Go to [github.com](https://github.com)
2. Click **"Sign up"** (top right)
3. Enter your email, create a password, and choose a username
4. Verify your email address

## Step 2: Create a New Repository on GitHub

1. **Log in to GitHub**
2. Click the **"+"** icon (top right) → **"New repository"**
3. **Repository name:** `begotten` (or any name you like)
4. **Description:** "Begotten clothing brand website" (optional)
5. **Visibility:** Choose **Public** (free) or **Private** (if you want it private)
6. **DO NOT** check "Add a README file" (we already have code)
7. **DO NOT** add .gitignore or license (we already have these)
8. Click **"Create repository"**

## Step 3: Copy Your Repository URL

After creating the repository, GitHub will show you a page with setup instructions.

**Copy the repository URL** - it will look like:
- `https://github.com/YOUR_USERNAME/begotten.git`

**Keep this page open** - you'll need it in a moment!

## Step 4: Open Terminal on Your Mac

1. Press `Cmd + Space` (opens Spotlight)
2. Type "Terminal" and press Enter
3. Terminal will open

## Step 5: Navigate to Your Project Folder

In Terminal, type:
```bash
cd /Users/mschepis/Desktop/Begotten
```

Press Enter. You should see your project path in the terminal.

## Step 6: Initialize Git (First Time Only)

Type this command:
```bash
git init
```

Press Enter. You should see: "Initialized empty Git repository..."

## Step 7: Add All Your Files

Type:
```bash
git add .
```

Press Enter. (The `.` means "add everything")

## Step 8: Create Your First Commit

Type:
```bash
git commit -m "Initial commit"
```

Press Enter. You might see a message about configuring your name/email first. If so, follow Step 9.

## Step 9: Configure Git (If Needed)

If you see a message about setting your name and email, run these commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email, then press Enter after each command.

Then run the commit command again:
```bash
git commit -m "Initial commit"
```

## Step 10: Connect to GitHub

Type this (replace `YOUR_USERNAME` with your GitHub username):
```bash
git remote add origin https://github.com/YOUR_USERNAME/begotten.git
```

**Example:** If your username is `mschepis` and repo is `begotten`:
```bash
git remote add origin https://github.com/mschepis/begotten.git
```

Press Enter.

## Step 11: Push Your Code to GitHub

Type:
```bash
git push -u origin main
```

Press Enter.

**If this is your first time**, GitHub might ask you to:
1. **Authenticate** - it will open a browser window
2. **Sign in to GitHub** in the browser
3. **Authorize** the connection
4. Go back to Terminal and try the push command again

## Step 12: Verify It Worked

1. Go back to your GitHub repository page in your browser
2. **Refresh the page**
3. You should see all your files! 🎉

## Troubleshooting

### "Permission denied" or "Authentication failed"
- Make sure you're signed in to GitHub in your browser
- Try the push command again after authenticating

### "Repository not found"
- Check that you copied the correct repository URL
- Make sure the repository name matches

### "Branch 'main' does not exist"
- Try: `git push -u origin master` instead
- Or: `git branch -M main` then `git push -u origin main`

### "fatal: remote origin already exists"
- Run: `git remote remove origin`
- Then run Step 10 again

## What's Next?

Once your code is on GitHub, you can:
1. ✅ Deploy to Vercel (see DEPLOY_NOW.md)
2. ✅ Share your code
3. ✅ Keep it backed up
4. ✅ Make changes and push updates

## Quick Reference Commands

For future updates, you'll use these three commands:
```bash
git add .
git commit -m "Description of changes"
git push
```

That's it! Your code is now on GitHub! 🚀

