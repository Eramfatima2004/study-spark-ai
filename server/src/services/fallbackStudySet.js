const cleanTopic = (notes) => notes.replace(/\s+/g, ' ').trim().slice(0, 110);

export function createFallbackStudySet(notes) {
  const topic = cleanTopic(notes);
  const cardPairs = [
    ['What topic are you revising?', topic],
    [`What is the main idea behind ${topic}?`, `Identify the central definition, purpose, and the problem this topic helps explain.`],
    [`Which key terms should you define for ${topic}?`, 'List the essential vocabulary, then write a one-sentence explanation for each term.'],
    [`How can you explain ${topic} simply?`, 'Use a short definition, one concrete example, and one reason the concept matters.'],
    [`What is a useful way to practise ${topic}?`, 'Create your own example, solve a related problem, or teach the idea aloud without looking at notes.'],
    [`How should you revise ${topic}?`, 'Return to difficult terms first, test yourself with active recall, and revisit the material after a short break.'],
  ];
  return {
    title: topic.length > 56 ? `${topic.slice(0, 56)}…` : topic,
    description: 'A starter study set created from your topic while the AI service is busy.',
    summary: `${topic} is your current revision focus. Use this starter set to identify the core ideas, define the vocabulary, and practise explaining the topic in your own words.`,
    flashcards: cardPairs.map(([question, answer], index) => ({ id: index + 1, question, answer })),
    quiz: [
      { id: 1, question: `What is the best first step when studying ${topic}?`, options: ['Memorize every sentence', 'Identify the central definition and purpose', 'Skip the key terms', 'Only reread the notes'], correctAnswer: 'Identify the central definition and purpose', explanation: 'Starting with the core meaning helps you connect the remaining details.' },
      { id: 2, question: 'Which strategy is active recall?', options: ['Highlighting every line', 'Testing yourself without notes', 'Reading once quickly', 'Copying the chapter'], correctAnswer: 'Testing yourself without notes', explanation: 'Active recall strengthens memory by retrieving information rather than only recognising it.' },
      { id: 3, question: 'What makes an explanation easier to remember?', options: ['No examples', 'More unrelated details', 'A definition and a concrete example', 'Only technical words'], correctAnswer: 'A definition and a concrete example', explanation: 'Examples make abstract ideas easier to understand and retrieve later.' },
      { id: 4, question: 'When should you revisit difficult material?', options: ['Never', 'Only after an exam', 'After a short break and again later', 'Only when someone reminds you'], correctAnswer: 'After a short break and again later', explanation: 'Spaced review is more effective than attempting to learn everything in one sitting.' },
      { id: 5, question: 'Which is a useful self-check?', options: ['Can I explain it in my own words?', 'Can I avoid all practice?', 'Can I ignore unfamiliar terms?', 'Can I reread without thinking?'], correctAnswer: 'Can I explain it in my own words?', explanation: 'Explaining a concept clearly is a strong indicator of understanding.' },
    ],
    keyPoints: ['Start with the central definition and purpose.', 'Define important terms in simple language.', 'Use a concrete example to test your understanding.', 'Practise active recall and spaced revision.'],
  };
}
