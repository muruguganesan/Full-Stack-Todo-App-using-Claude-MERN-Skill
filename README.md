🚀 **Quick Start**

**Backend**
cd todo-app/backend
npm install
cp .env.example .env        # Set your MONGO_URI and JWT_SECRET
npm run dev         

**Frontend**
cd todo-app/frontend
npm install
cp .env.example .env.local
npm run dev    

**If there is any issue named:**
Problem:
The MONGO_URI env variable is undefined — the .env file isn't being loaded. Fix: make sure you've created the .env file from the example and that it's in the right place.
Solution:
**Step 1 — Create your .env file:**
cd todo-app/backend
cp .env.example .env
**Step 2 — Edit .env and fill in your values:**
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=any_random_secret_string
FRONTEND_URL=http://localhost:3000
**Step 3 — Restart the server:**
npm run dev
