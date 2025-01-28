import { supabase } from '../../lib/supabase';
import { storeTokenInCookie, removeTokenFromCookie } from '../lib/auth';

export default async function handler(req, res) {
  const { event, session } = req.body;

  if (event === 'SIGNED_IN') {
    storeTokenInCookie(session.access_token);
    res.status(200).json({ message: 'Signed in successfully' });
  } else if (event === 'SIGNED_OUT') {
    removeTokenFromCookie();
    res.status(200).json({ message: 'Signed out successfully' });
  } else {
    res.status(400).json({ message: 'Invalid event' });
  }
}