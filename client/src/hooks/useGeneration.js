import { useCallback, useRef, useState } from 'react';
import { studyResponseSchema } from '../lib/schemas';
import { generateStudySet } from '../services/studyApi';

export function useGeneration() {
  const controller = useRef(null); const requestId = useRef(0);
  const [status, setStatus] = useState('idle'); const [error, setError] = useState(null);
  const generate = useCallback(async (notes, mode) => {
    controller.current?.abort(); const id = ++requestId.current; controller.current = new AbortController();
    setStatus('loading'); setError(null);
    try { const payload = await generateStudySet(notes, mode, controller.current.signal); const data = studyResponseSchema.parse(payload); if (id !== requestId.current) return null; setStatus('success'); return data; }
    catch (err) { if (err.name === 'AbortError') return null; if (id === requestId.current) { setStatus('error'); setError(err.message || 'We could not create a study set. Please try again.'); } return null; }
  }, []);
  return { generate, status, error, clearError: () => setError(null) };
}
