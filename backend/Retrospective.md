Sprint 4 Retrospective - Muniru Adam

What Went Well 
Backend Architecture
This sprint was honestly a breakthrough for me. In Sprint 3, I was working on the frontend with repositories and hooks, but this time diving into the backend made everything connect. Building the routes controller database flow helped me understand how the whole stack actually works together. It's not just "frontend talks to backend" anymore - I can see exactly HOW they talk.
Git Workflow Got Better
Last sprint I was confused about branches and commits. This time, I caught myself before committing directly to develop and created a feature branch instead. The whole stash pull pop workflow made sense when I actually needed it. Small win, but it feels more professional.

What Could Have Gone Better
Database Setup Took Me By Surprise
I spent way more time than expected trying to figure out why Prisma couldn't connect to the database. Turns out the issue was the port (5433 vs 5432) and Docker not running on my machine. I should have asked the team about the database setup earlier instead of troubleshooting alone for so long. In hindsight, a database Setup Guide document would have saved me a lot

Testing Blocked by Infrastructure
I built a complete API with six endpoints, validation, error handling - everything. But I couldn't actually test any of it because the database wasn't running on my machine. That was frustrating. I ended up pushing code that I'm confident is correct, but haven't seen working end-to-end yet. Not ideal. And fortunately I was able to figure things out later.

What I Learned 
CORS Isn't Just a Checkbox
Before this sprint, CORS was just that thing that gives errors in the console. Now I actually understand why browsers works and requests and how CORS configuration protects users. The whole preventing malicious sites from stealing data thing makes total sense now. I can explain it to someone else, which is always the real test of understanding something.

Challenges Faced
The Database Connection
This was the main challenge. I must have run npx prisma migrate dev twenty times with different approaches. Changed ports, checked connection strings, tried db push, ran prisma generate multiple times. The error message kept saying can't reach database server at localhost:5432 became my problem. Eventually figured out it should be 5433, but then Docker wasn't running. Still haven't actually run the migration successfully, though the code is ready. But as I said earlier I was able to do it confidently after multiple attempts and with help from teammates.

