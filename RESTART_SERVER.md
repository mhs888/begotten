# How to Restart Your Dev Server

## Quick Steps

1. **Open Terminal** (if not already open)

2. **Navigate to your project**:
   ```bash
   cd /Users/mschepis/Desktop/Begotten
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

4. **Wait for it to start** - you'll see:
   ```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Ready in 2.3s
   ```

5. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## If Server Won't Start

### Check for Errors

Look at the terminal output for error messages. Common issues:

**"Port 3000 already in use"**
- Another process is using port 3000
- Solution: Kill the process or use a different port
  ```bash
  # Kill process on port 3000
  lsof -ti:3000 | xargs kill -9
  
  # Or use different port
  npm run dev -- -p 3001
  ```

**"Cannot find module"**
- Dependencies not installed
- Solution:
  ```bash
  npm install
  npm run dev
  ```

**"Error: EADDRINUSE"**
- Port is already in use
- Solution: Use different port or kill existing process

### Use Different Port

If port 3000 is busy:
```bash
npm run dev -- -p 3001
```
Then visit: `http://localhost:3001`

## Stopping the Server

- Press `Ctrl + C` in the terminal
- Server stops

## Restarting After Changes

After changing `.env.local` or other config files:
1. Stop server (`Ctrl + C`)
2. Start again (`npm run dev`)
3. Refresh browser

## Current Status

I've started the server for you in the background. Try opening:
```
http://localhost:3000
```

If it doesn't work, check the terminal for any error messages and let me know what you see!

