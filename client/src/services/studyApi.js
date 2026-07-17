
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
const API_URL = rawApiUrl.replace(/\/$/, '');
export async function generateStudySet(notes, mode, signal) {
  const response = await fetch(`${API_URL}/api/generate`, { method: 'POST', signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ notes, mode }) });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const errorMsg = body.message || body.error || 'We could not create a study set. Please try again.';
    const err = new Error(errorMsg);
    err.details = body.details;
    err.status = response.status;
    throw err;
  }
  return response.json();
}
