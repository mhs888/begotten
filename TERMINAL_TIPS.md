# Terminal Tips for GitHub

## Important: Press Enter After Each Command!

When you paste commands into Terminal:
1. **Paste the command**
2. **Press Enter** (this runs the command)
3. **Wait for output** (you'll see results or a new prompt)

## How to Use Terminal

### Step-by-Step Process:

1. **Open Terminal** (Cmd + Space, type "Terminal")

2. **Type or paste ONE command at a time:**
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   ```
   **Press Enter** - you should see the prompt change

3. **Type the next command:**
   ```bash
   git init
   ```
   **Press Enter** - you should see: "Initialized empty Git repository..."

4. **Continue with each command, pressing Enter after each one**

## What You Should See

After `git init`, you should see:
```
Initialized empty Git repository in /Users/mschepis/Desktop/Begotten/.git
```

After `git add .`, you might not see output (that's normal!)

After `git commit -m "Initial commit"`, you should see:
```
[main (root-commit) abc1234] Initial commit
 X files changed, Y insertions(+)
```

## If Nothing Happens

1. **Make sure you're pressing Enter** after pasting
2. **Check that Terminal is active** (click in the Terminal window)
3. **Try typing a simple command first:**
   ```bash
   pwd
   ```
   (This shows your current directory - should show `/Users/mschepis/Desktop/Begotten`)

## Common Issues

**"Command not found"**
- Make sure you typed the command correctly
- Check for typos

**Nothing happens when you press Enter**
- Terminal might be waiting for input
- Try pressing Ctrl+C to cancel, then try again

**"Permission denied"**
- You might need to configure git first (see below)

## First Time Git Setup

If git asks for your name/email, run these (replace with your info):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Press Enter after each command!

## Quick Test

Try this to make sure Terminal is working:
```bash
echo "Hello, Terminal!"
```

Press Enter - you should see "Hello, Terminal!" printed back.

If that works, Terminal is working fine! 🎉

