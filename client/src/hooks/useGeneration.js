import { useCallback, useRef, useState } from 'react';
import { studyResponseSchema } from '../lib/schemas';
import { generateStudySet } from '../services/studyApi';

function classifyError(err) {
  if (err.name === 'AbortError') return null;

  const status = err.status;
  const message = err.message || '';
  const details = err.details || '';
  const name = err.name || '';

  // 1. Gemini API key missing
  if (status === 503 || message.includes('API key') || message.includes('CONFIGURATION') || details.includes('API key') || details.includes('CONFIGURATION')) {
    return {
      title: 'Gemini API key missing',
      message: 'The study assistant is not configured yet. Please configure the GEMINI_API_KEY environment variable on the server.'
    };
  }

  // 2. Rate limit exceeded
  if (status === 429 || message.includes('quota') || message.includes('Rate limit') || message.includes('RESOURCE_EXHAUSTED') || message.includes('429') || details.includes('quota') || details.includes('429')) {
    return {
      title: 'Rate limit exceeded',
      message: 'You have exceeded the Gemini API rate limit or daily quota. Please try again later.'
    };
  }

  // 3. Invalid JSON returned
  if (message.includes('Invalid JSON') || details.includes('JSON') || message.includes('Unexpected token') || message.includes('JSON.parse')) {
    return {
      title: 'Invalid JSON returned',
      message: 'The AI service returned a response that could not be parsed as valid JSON.'
    };
  }

  // 4. Schema validation failed
  if (name === 'ZodError' || message.includes('Schema validation') || details.includes('ZodError') || details.includes('"code":') || details.includes('validation')) {
    return {
      title: 'Schema validation failed',
      message: 'The generated response did not match the required format for study sets.'
    };
  }

  // 5. Network request failed
  if (name === 'TypeError' && (message.toLowerCase().includes('fetch') || message.toLowerCase().includes('network') || message.toLowerCase().includes('connect'))) {
    return {
      title: 'Network request failed',
      message: 'Could not connect to the backend server. Please verify your internet connection and that the backend is running.'
    };
  }

  // 6. Backend unavailable
  if (status === 502 || status === 504 || status === 500) {
    return {
      title: 'Backend unavailable',
      message: `The server encountered an error (Status ${status}). Please try again shortly.`
    };
  }

  // Default fallback
  return {
    title: 'That didn’t work this time.',
    message: message || 'We could not create a study set. Please try again.'
  };
}

export function useGeneration() {
  const controller = useRef(null);
  const requestId = useRef(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const generate = useCallback(async (notes, mode) => {
    controller.current?.abort();
    const id = ++requestId.current;
    controller.current = new AbortController();
    setStatus('loading');
    setError(null);

    try {
      const payload = await generateStudySet(notes, mode, controller.current.signal);
      const data = studyResponseSchema.parse(payload);
      if (id !== requestId.current) return null;
      setStatus('success');
      return data;
    } catch (err) {
      if (err.name === 'AbortError') return null;
      if (id === requestId.current) {
        setStatus('error');
        setError(classifyError(err));
      }
      return null;
    }
  }, []);

  return { generate, status, error, clearError: () => setError(null) };
}

