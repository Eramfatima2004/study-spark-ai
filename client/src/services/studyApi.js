const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8787';
export async function generateStudySet(notes, mode, signal) {
  const response = await fetch(`${API_URL}/api/generate`, { method: 'POST', signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ notes, mode }) });
  if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || 'We could not create a study set. Please try again.'); } return response.json();
}
