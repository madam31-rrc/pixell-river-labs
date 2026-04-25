import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';

export function clerkRequireAuth(req: Request, res: Response, next: NextFunction) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

export function requireOrgAdmin(req: Request, res: Response, next: NextFunction) {
  const { has } = getAuth(req);
  if (!has({ role: 'org:admin' })) {
    res.status(403).json({ error: 'Admin role required' });
    return;
  }
  next();
}
