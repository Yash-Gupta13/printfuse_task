# 🛍️ Printfuse Task

This project is a full-stack application with:

- Frontend: React (Vite)
- Backend: Node.js, Express.js
- Database: PostgreSQL (with Prisma)

---

## 📦 Full Project Setup Step

```bash
# Step 1: Navigate into the client directory
cd client

# Step 2: Install frontend dependencies
npm install

# Step 3: Start the frontend development server
npm run dev

# Step 1: Navigate into the server directory
cd server

# Step 2: Rename the example environment file to .env
mv .env.example .env

# Step 3: Open the .env file and replace the value of DATABASE_URL with your PostgreSQL connection string
# Example:
# DATABASE_URL="postgresql://username:password@localhost:5432/your-database-name"

# Step 4: Install backend dependencies
npm install

# Step 5: Run database migrations
npx prisma migrate deploy

# Step 6: Generate Prisma client
npx prisma generate

# This will reset your database (you'll lose all data)
npx prisma migrate reset

# Then generate Prisma client again
npx prisma generate

# Step 7: Start the backend development server
npm run dev

