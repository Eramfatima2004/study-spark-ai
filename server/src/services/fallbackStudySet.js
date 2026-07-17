const cleanTopic = (notes) => notes.replace(/\s+/g, ' ').trim().slice(0, 110);

export function createFallbackStudySet(notes, mode = 'study') {
  const topic = cleanTopic(notes);
  const normalized = topic.toLowerCase();
  const activeMode = String(mode || 'study').toLowerCase();

  const isPhotosynthesis = normalized.includes('photo') || normalized.includes('synth');
  const isDbms = normalized.includes('normal') || normalized.includes('dbms') || normalized.includes('database');
  const isClosures = normalized.includes('closure') || normalized.includes('lexical') || normalized.includes('scope');
  const isHooks = normalized.includes('hook') || normalized.includes('react') || normalized.includes('state');
  const isBinarySearch = normalized.includes('binary') || normalized.includes('search') || normalized.includes('algorithm');
  const isNetworks = normalized.includes('network') || normalized.includes('osi') || normalized.includes('tcp') || normalized.includes('ip') || normalized.includes('routing') || normalized.includes('switch') || normalized.includes('subnet') || normalized.includes('dns') || normalized.includes('http');

  // Helper to compile final set based on mode
  const compileSet = (studyData, interviewData, revisionData) => {
    if (activeMode === 'interview') {
      return {
        title: interviewData.title,
        description: interviewData.description,
        summary: interviewData.summary,
        keyPoints: interviewData.keyPoints,
        flashcards: interviewData.flashcards,
        quiz: interviewData.quiz
      };
    } else if (activeMode === 'revision') {
      return {
        title: revisionData.title,
        description: revisionData.description,
        summary: revisionData.summary,
        keyPoints: revisionData.keyPoints,
        flashcards: revisionData.flashcards.slice(0, 5),
        quiz: revisionData.quiz.slice(0, 3)
      };
    } else {
      return {
        title: studyData.title,
        description: studyData.description,
        summary: studyData.summary,
        keyPoints: studyData.keyPoints,
        flashcards: studyData.flashcards,
        quiz: studyData.quiz
      };
    }
  };

  // 1. PHOTOSYNTHESIS DATASETS
  if (isPhotosynthesis) {
    const studySet = {
      title: "Photosynthesis: Light Reactions & Calvin Cycle",
      description: "An academic study set explaining the biochemical pathway of converting solar energy, water, and CO2 into glucose and oxygen.",
      summary: `### Detailed Explanation
Photosynthesis is the metabolic pathway by which photoautotrophs convert light energy, carbon dioxide, and water into chemical energy stored in glucose, releasing oxygen as a byproduct. The process occurs in chloroplasts, where light-absorbing pigments like chlorophyll capture photons. The overall equation is 6CO2 + 6H2O + light -> C6H12O6 + 6O2.

The reaction has two key stages:
1. **Light-dependent Reactions**: Occur in the thylakoid membranes. Chlorophyll absorbs solar radiation, splitting water molecules (photolysis) to release oxygen, protons, and electrons. This drives the synthesis of ATP and NADPH via electron transport chains.
2. **Light-independent Reactions (Calvin Cycle)**: Occur in the stroma. The enzyme RuBisCO fixes carbon dioxide into organic molecules. Using ATP and NADPH, these molecules are reduced to form G3P, which is synthesized into glucose.

### Important Definitions
- **Chloroplast**: The double-membrane organelle in plant cells where photosynthesis takes place.
- **Chlorophyll**: The primary green pigment inside the thylakoid membrane that absorbs blue and red wavelengths of light.
- **Thylakoid**: Disk-shaped sacs inside chloroplasts where the light-dependent reactions occur.
- **Stroma**: The fluid-filled space surrounding thylakoids where the Calvin cycle fixes carbon.

### Common Mistakes
- **Confusing Light Reactions and Calvin Cycle Locations**: Remembering that light reactions occur in the thylakoid membranes, while carbon fixation (Calvin cycle) happens in the fluid stroma.
- **Believing Photosynthesis Occurs Only in Light**: The Calvin cycle does not directly require light, but it relies on light-reaction products (ATP, NADPH) and stops shortly after dark.

### Exam Tips
- **Know the net equation**: Graders look for balanced inputs (6CO2, 6H2O) and outputs (C6H12O6, 6O2).
- **Detail the role of RuBisCO**: Highlight RuBisCO as the key enzyme responsible for carbon fixation in C3 plants.

### Mnemonics
- **OIL RIG in Photolysis**: Oxidation Is Loss, Reduction Is Gain of electrons. Water is oxidized (loses electrons) during photolysis.

### Real-World Examples
- **Crop Yield Optimization**: Greenhouse growers artificially enrich carbon dioxide levels (CO2 fertilization) to accelerate Calvin cycle carbon fixation rates.`,
      keyPoints: [
        "Light reactions occur in the thylakoid membranes of chloroplasts.",
        "Calvin cycle operates in the stroma, fixing inorganic CO2 into G3P.",
        "Chlorophyll molecules absorb red and blue wavelengths, reflecting green.",
        "Water splitting (photolysis) releases oxygen gas as a byproduct.",
        "ATP and NADPH are synthesized in the light reactions to power the Calvin cycle.",
        "RuBisCO fixes carbon dioxide by binding it to RuBP."
      ],
      flashcards: [
        { id: 1, question: "Where do light reactions occur?", answer: "In the thylakoid membranes of the chloroplast." },
        { id: 2, question: "Where does the Calvin cycle take place?", answer: "In the stroma of the chloroplast." },
        { id: 3, question: "What pigment absorbs solar radiation?", answer: "Chlorophyll, located in the photosystems of thylakoid membranes." },
        { id: 4, question: "What is photolysis?", answer: "The splitting of water molecules into oxygen, protons, and electrons driven by light." },
        { id: 5, question: "What molecules are produced in light reactions to power the Calvin cycle?", answer: "ATP and NADPH." },
        { id: 6, question: "What is the role of RuBisCO?", answer: "To catalyze the reaction of carbon dioxide with RuBP during carbon fixation." },
        { id: 7, question: "What is the chemical formula for glucose?", answer: "C6H12O6." },
        { id: 8, question: "What gas is released as a byproduct during light reactions?", answer: "Oxygen (O2)." },
        { id: 9, question: "What wavelength of light does chlorophyll absorb best?", answer: "Blue and red wavelengths; green is reflected." },
        { id: 10, question: "What is carbon fixation?", answer: "The conversion of inorganic carbon dioxide (CO2) into organic compounds (like G3P)." },
        { id: 11, question: "What is G3P?", answer: "Glyceraldehyde 3-phosphate, a 3-carbon sugar that is the direct product of the Calvin cycle." },
        { id: 12, question: "What happens during Photosystem II (PSII)?", answer: "Light energy excites electrons in chlorophyll, which are replaced by splitting water." },
        { id: 13, question: "What happens during Photosystem I (PSI)?", answer: "Electrons are re-energized by light to reduce NADP+ into NADPH." },
        { id: 14, question: "What drives ATP synthesis in chloroplasts?", answer: "A proton gradient across the thylakoid membrane driving protons through ATP synthase." },
        { id: 15, question: "What are stomata?", answer: "Microscopic pores on plant leaves that regulate the entry of CO2 and exit of O2 and water vapor." },
        { id: 16, question: "What is photorespiration?", answer: "A wasteful pathway where RuBisCO fixes oxygen instead of carbon dioxide, reducing photosynthetic efficiency." }
      ],
      quiz: [
        { id: 1, question: "Which chloroplast structure hosts the light-dependent reactions?", options: ["Stroma", "Thylakoid Membrane", "Outer Membrane", "Cristae"], correctAnswer: "Thylakoid Membrane", explanation: "The thylakoid membranes contain chlorophyll, photosystems, and the electron transport chains required for light reactions." },
        { id: 2, question: "What is the primary source of electrons replaced in Photosystem II?", options: ["Water", "Carbon Dioxide", "Glucose", "NADPH"], correctAnswer: "Water", explanation: "Photolysis splits water molecules into oxygen, protons, and electrons, replacing excited electrons in Photosystem II." },
        { id: 3, question: "Which enzyme catalyzes the fixation of CO2 onto RuBP?", options: ["ATP Synthase", "RuBisCO", "Amylase", "PEP Carboxylase"], correctAnswer: "RuBisCO", explanation: "RuBisCO (ribulose-1,5-bisphosphate carboxylase-oxygenase) is the crucial carbon-fixing enzyme of the Calvin cycle." },
        { id: 4, question: "Which products of the light reactions directly power the Calvin cycle?", options: ["Glucose and Oxygen", "ADP and NADP+", "ATP and NADPH", "Water and Carbon Dioxide"], correctAnswer: "ATP and NADPH", explanation: "ATP provides energy and NADPH provides reducing power to convert fixed carbon into G3P during the Calvin cycle." },
        { id: 5, question: "What are the raw input ingredients of the general photosynthetic equation?", options: ["Glucose and Oxygen", "Carbon Dioxide and Water", "ATP and NADPH", "Methane and Oxygen"], correctAnswer: "Carbon Dioxide and Water", explanation: "Plants consume carbon dioxide and water alongside light energy to synthesize sugars and release oxygen." },
        { id: 6, question: "What is the three-carbon molecule directly produced by the Calvin cycle?", options: ["Glucose", "G3P", "RuBP", "Pyruvate"], correctAnswer: "G3P", explanation: "Glyceraldehyde 3-phosphate (G3P) is the direct output of the Calvin cycle, which plants then convert into glucose." },
        { id: 7, question: "Why do plant leaves appear green under white light?", options: ["They absorb green wavelengths", "They reflect green wavelengths", "They produce green pigments during glucose synthesis", "They emit green bioluminescence"], correctAnswer: "They reflect green wavelengths", explanation: "Chlorophyll absorbs blue and red light efficiently, but reflects green light back, making leaves look green to the eye." },
        { id: 8, question: "During which phase of photosynthesis is oxygen gas produced?", options: ["Light Reactions", "Calvin Cycle", "Photorespiration", "Glycolysis"], correctAnswer: "Light Reactions", explanation: "Oxygen is produced as a byproduct of photolysis (water splitting) during the light-dependent reactions." },
        { id: 9, question: "Which photosystem re-excites electrons to reduce NADP+ into NADPH?", options: ["Photosystem II", "Photosystem I", "Photosystem III", "Cytochrome b6f"], correctAnswer: "Photosystem I", explanation: "Photosystem I receives low-energy electrons from the transport chain, excites them with light, and reduces NADP+." },
        { id: 10, question: "What is photorespiration?", options: ["Fixation of CO2 in C4 plants", "Fixation of O2 instead of CO2 by RuBisCO", "Water absorption by roots", "Cellular respiration during the day"], correctAnswer: "Fixation of O2 instead of CO2 by RuBisCO", explanation: "Photorespiration occurs when RuBisCO binds oxygen instead of carbon dioxide, wasting energy and decreasing photosynthetic efficiency." },
        { id: 11, question: "Where is the proton gradient established inside the chloroplast?", options: ["Thylakoid Lumen", "Stroma", "Cytoplasm", "Mitochondrial Matrix"], correctAnswer: "Thylakoid Lumen", explanation: "Electrons moving through the transport chain pump protons from the stroma into the thylakoid lumen, building a gradient." },
        { id: 12, question: "What microscopic leaf structures allow carbon dioxide gas to enter leaves?", options: ["Chloroplasts", "Stomata", "Cuticles", "Trichomes"], correctAnswer: "Stomata", explanation: "Stomata are microscopic pores on the surface of leaves that control gas exchange (CO2 in, O2 out) and water loss." },
        { id: 13, question: "How many turns of the Calvin cycle are needed to output one net molecule of G3P?", options: ["One", "Three", "Six", "Twelve"], correctAnswer: "Three", explanation: "Since each turn fixes one CO2 molecule, three turns are required to synthesize one net 3-carbon G3P molecule." },
        { id: 14, question: "What drives the phosphorylation of ADP to ATP during the light reactions?", options: ["Proton flow through ATP Synthase", "Splitting of glucose", "Direct absorption of red photons", "Carbon fixation"], correctAnswer: "Proton flow through ATP Synthase", explanation: "The proton motive force drives protons back into the stroma through ATP synthase, prompting ATP phosphorylation." },
        { id: 15, question: "Which of the following describes cyclic electron flow?", options: ["Flow producing only ATP, not NADPH", "Flow splitting CO2", "Flow creating glucose directly", "Flow producing both ATP and oxygen"], correctAnswer: "Flow producing only ATP, not NADPH", explanation: "Cyclic electron flow uses only PSI and produces ATP without forming NADPH or releasing oxygen, balancing the ATP/NADPH ratio." },
        { id: 16, question: "Which pigment acts as an accessory pigment protecting leaves from excess light?", options: ["Chlorophyll a", "Carotenoids", "RuBisCO", "Cytochrome"], correctAnswer: "Carotenoids", explanation: "Carotenoids act as accessory pigments that absorb excess light energy and dissipate it safely to prevent leaf damage." }
      ]
    };

    const interviewSet = {
      title: "Placement Viva: Photosynthesis & Plant Biochemistry",
      description: "Placement interview preparation on photosynthesis pathway steps, photosystems, enzyme RuBisCO, and efficiency comparisons.",
      summary: `### Detailed Explanation
In agricultural engineering and botany viva rounds, candidates are expected to detail the mechanics of photosynthesis, especially the kinetic constraints of RuBisCO and differences between C3 and C4 pathways. Be prepared to explain energy balances (ATP and NADPH costs) and electron flow routes.

### Exam Tips
- **Structuring the Answer**: Start with the balanced stoichiometric equation. Then, explicitly differentiate between the thylakoid (light) and stroma (dark/Calvin cycle) reactions.
- **Handling RuBisCO constraints**: Emphasize that RuBisCO is highly inefficient due to photorespiration, which interviewers frequently check.

### Real-World Examples
- **Bioengineered Crops**: Research aims to alter RuBisCO's structure to make it more selective to CO2 over O2, boosting photosynthetic yields by 30%.`,
      keyPoints: [
        "Be ready to sketch the Z-scheme of light reactions.",
        "Memorize the G3P outputs and ATP costs of the Calvin cycle.",
        "Highlight photorespiration as the core evolutionary constraint."
      ],
      flashcards: [
        { id: 1, question: "How would you explain the efficiency constraint of RuBisCO in an interview?", answer: "Explain that RuBisCO catalyzes both carboxylation and oxygenation. When fixing oxygen, it initiates photorespiration, wasting up to 25% of the plant's energy." },
        { id: 2, question: "What is the expected answer when asked to detail the Z-scheme?", answer: "Describe it as the pathway of electron flow from water through Photosystem II, the plastoquinone pool, cytochrome b6f, plastocyanin, and Photosystem I, ending with NADP+ reductase." }
      ].concat(studySet.flashcards.slice(2)),
      quiz: studySet.quiz
    };

    const revisionSet = {
      title: "One-Minute Revision: Photosynthesis",
      description: "Quick revision deck on light reactions, Calvin cycle, pigments, and key terms.",
      summary: `### Detailed Explanation
Photosynthesis converts light, CO2, and H2O into glucose (C6H12O6) and oxygen (O2). It takes place inside chloroplast structures.

### Important Definitions
- **Light Reactions**: Occur in the thylakoid membranes, generating ATP and NADPH.
- **Calvin Cycle**: Occurs in the stroma, fixing CO2 to form G3P using ATP/NADPH.
- **Chlorophyll**: Green pigment absorbing blue and red solar light.
- **RuBisCO**: Main enzyme responsible for fixing carbon.
- **Photolysis**: Splitting water into oxygen and protons.`,
      keyPoints: studySet.keyPoints.slice(0, 4),
      flashcards: studySet.flashcards,
      quiz: studySet.quiz
    };

    return compileSet(studySet, interviewSet, revisionSet);
  }

  // 2. DBMS NORMALISATION DATASETS
  if (isDbms) {
    const studySet = {
      title: "DBMS Normalisation: 1NF to BCNF",
      description: "An academic study set covering functional dependencies, keys, and relational normalisation forms (1NF, 2NF, 3NF, BCNF).",
      summary: `### Detailed Explanation
Database normalisation is the systematic process of organizing a relational database to minimize data redundancy and avoid anomalies (insert, update, delete). It involves dividing database tables and defining relationships between them according to functional dependencies. The process is key to database design, ensuring logical consistency and data integrity.

### Important Definitions
- **Functional Dependency (FD)**: A constraint between two sets of attributes in a relation where the value of one determines the other (denoted as X -> Y).
- **Candidate Key**: A minimal set of attributes that uniquely identifies any tuple in a relation.
- **Prime Attribute**: An attribute that is a member of at least one candidate key.

### Common Mistakes
- **Over-normalisation**: Splitting tables to BCNF or 4NF without evaluating query join performance overheads in real-world setups.
- **Partial Dependency Confusion**: Incorrectly checking for partial dependencies when the primary key is a single attribute (partial dependency only exists on composite keys).

### Exam Tips
- **Always find all candidate keys first**: Never attempt to classify normal forms until you have listed all possible keys.
- **State FD attributes**: In proofs, clearly state which functional dependencies violate BCNF (i.e. where the determinant is not a super key).

### Mnemonics
- **The Key, the Whole Key, and Nothing but the Key**: Mnemonic representing 1NF (attribute atomicity), 2NF (depends on the whole key), and 3NF (nothing but the key - no transitive dependency).

### Real-World Examples
- **Customer Address Redundancy**: Separating user billing address structures from individual orders tables, ensuring address updates do not require scanning millions of historical orders.`,
      keyPoints: [
        "1NF requires all attribute values to be atomic and no repeating groups.",
        "2NF eliminates partial functional dependencies (attributes depending on parts of composite keys).",
        "3NF eliminates transitive dependencies (non-prime attributes depending on non-prime attributes).",
        "BCNF is achieved if every determinant in a functional dependency is a super key.",
        "Normalisation prevents insertion, deletion, and update anomalies.",
        "Lossless join decomposition ensures table joins retrieve the exact original dataset."
      ],
      flashcards: [
        { id: 1, question: "What is Database Normalisation?", answer: "The systematic process of structuring relational tables to reduce redundancy and eliminate anomalies." },
        { id: 2, question: "What is an insertion anomaly?", answer: "The inability to add a new record because some unrelated, required attributes are not yet known." },
        { id: 3, question: "What is a deletion anomaly?", answer: "The unintentional loss of unrelated data caused by deleting a database row." },
        { id: 4, question: "What is an update anomaly?", answer: "Inconsistent data states arising from updating values in duplicate records inattensively." },
        { id: 5, question: "What is First Normal Form (1NF)?", answer: "A relation where all attribute domains contain only atomic, single-valued entries." },
        { id: 6, question: "What is Second Normal Form (2NF)?", answer: "A relation in 1NF where every non-prime attribute is fully functionally dependent on the entire primary key." },
        { id: 7, question: "What constitutes a partial dependency?", answer: "When a non-prime attribute depends on only a subset of a composite primary key." },
        { id: 8, question: "What is Third Normal Form (3NF)?", answer: "A relation in 2NF where no non-prime attribute transitively depends on the primary key." },
        { id: 9, question: "What constitutes a transitive dependency?", answer: "A dependency X -> Z that holds because X -> Y and Y -> Z both hold, where Y is non-prime." },
        { id: 10, question: "What is Boyce-Codd Normal Form (BCNF)?", answer: "A stricter version of 3NF where every determinant in a functional dependency is a super key." },
        { id: 11, question: "Can a relation be in 3NF but not in BCNF?", answer: "Yes, this occurs when overlapping candidate keys exist in the relation." },
        { id: 12, question: "What is a candidate key?", answer: "A minimal set of attributes that uniquely identifies a row in a table." },
        { id: 13, question: "What is a super key?", answer: "Any set of attributes that uniquely identifies a row; candidate keys are minimal super keys." },
        { id: 14, question: "What is a prime attribute?", answer: "An attribute that forms a part of any candidate key in the relation." },
        { id: 15, question: "What is a lossless join decomposition?", answer: "A decomposition that guarantees joining the split relations results in the original relation." },
        { id: 16, question: "What is dependency preservation?", answer: "Ensuring all original functional dependencies can be enforced within the individual decomposed relations." }
      ],
      quiz: [
        { id: 1, question: "Which normal form requires all attributes to hold atomic values?", options: ["1NF", "2NF", "3NF", "BCNF"], correctAnswer: "1NF", explanation: "First Normal Form (1NF) strictly prohibits multi-valued attributes or repeating groups, requiring atomicity." },
        { id: 2, question: "A relation has a single-attribute primary key. Which normal form is it automatically in if it is in 1NF?", options: ["2NF", "3NF", "BCNF", "4NF"], correctAnswer: "2NF", explanation: "Partial dependency requires a composite primary key. With a single-attribute primary key, partial dependencies are impossible, so it is automatically in 2NF." },
        { id: 3, question: "What type of dependency is eliminated in Third Normal Form (3NF)?", options: ["Partial dependency", "Transitive dependency", "Multi-valued dependency", "Join dependency"], correctAnswer: "3NF", explanation: "3NF is designed to remove transitive dependencies where non-prime attributes depend on other non-prime attributes." },
        { id: 4, question: "Under what condition is a relation in Boyce-Codd Normal Form (BCNF)?", options: ["Every determinant is a super key", "All candidate keys are single attributes", "No partial dependencies exist", "No transitive dependencies exist"], correctAnswer: "Every determinant is a super key", explanation: "BCNF requires that for all functional dependencies X -> Y, X must be a super key of the relation." },
        { id: 5, question: "What is an insertion anomaly?", options: ["Inability to add a record due to lack of other data", "Loss of data during a deletion", "Updating one row but missing duplicates", "Having too many primary keys"], correctAnswer: "Inability to add a record due to lack of other data", explanation: "An insertion anomaly occurs when database structure prevents adding new valid facts without inserting other unrelated fields." },
        { id: 6, question: "If relation R(A, B, C) has candidate key A, and FD B -> C holds, which normal form does it violate?", options: ["1NF", "2NF", "3NF", "None"], correctAnswer: "3NF", explanation: "Since A is the key, B and C are non-prime. B -> C represents a transitive dependency (A -> B -> C), which violates 3NF." },
        { id: 7, question: "Which concept describes splitting a table such that no data is lost or fabricated upon join?", options: ["Dependency preservation", "Lossless join decomposition", "Normalisation closure", "Attribute synthesis"], correctAnswer: "Lossless join decomposition", explanation: "Lossless join decomposition guarantees that the natural join of the decomposed relations exactly reproduces the original relation." },
        { id: 8, question: "What constitutes a prime attribute?", options: ["An attribute that is part of a candidate key", "The single primary key attribute", "An attribute that is never null", "A candidate key with only numbers"], correctAnswer: "An attribute that is part of a candidate key", explanation: "A prime attribute is any attribute that belongs to at least one candidate key in the relation." },
        { id: 9, question: "Which anomaly happens when deleting one entity deletes other unrelated data?", options: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "Join anomaly"], correctAnswer: "Deletion anomaly", explanation: "Deletion anomaly refers to the unintended loss of structural information when a tuple is deleted from a poorly structured table." },
        { id: 10, question: "Which normal form handles multi-valued dependencies?", options: ["3NF", "BCNF", "4NF", "5NF"], correctAnswer: "4NF", explanation: "Fourth Normal Form (4NF) specifically targets and eliminates multi-valued dependencies." },
        { id: 11, question: "A functional dependency X -> Y exists. What is X called?", options: ["Dependent", "Determinant", "Candidate", "Closure"], correctAnswer: "Determinant", explanation: "In X -> Y, the left-hand side attribute(s) X determine the value of Y, and is therefore called the determinant." },
        { id: 12, question: "Which normal form requires the removal of partial dependencies?", options: ["2NF", "3NF", "BCNF", "1NF"], correctAnswer: "2NF", explanation: "Second Normal Form (2NF) requires that the table is in 1NF and all non-prime attributes are fully dependent on the whole key, removing partial dependencies." },
        { id: 13, question: "Is BCNF always dependency-preserving?", options: ["Yes, always", "No, dependency preservation is not guaranteed", "Only if it has one candidate key", "Only if all keys are numeric"], correctAnswer: "No, dependency preservation is not guaranteed", explanation: "Unlike 3NF, BCNF decomposition is always lossless but is not guaranteed to preserve all functional dependencies." },
        { id: 14, question: "What is the closure of an attribute set?", options: ["The list of all attributes functionally determined by that set", "The primary key of the table", "The number of rows in the table", "A subset of candidate keys"], correctAnswer: "The list of all attributes functionally determined by that set", explanation: "The closure of an attribute set X (denoted X+) is the set of all attributes that can be functionally determined by X." },
        { id: 15, question: "Why is normalisation done?", options: ["To speed up joins", "To minimize redundancy and prevent anomalies", "To save disk space by using text fields", "To index every column"], correctAnswer: "To minimize redundancy and prevent anomalies", explanation: "The primary objectives of relational normalisation are to reduce data redundancies and eliminate insert/update/delete anomalies." },
        { id: 16, question: "Which normal form deals with join dependencies?", options: ["3NF", "BCNF", "4NF", "5NF"], correctAnswer: "5NF", explanation: "Fifth Normal Form (5NF), or Project-Join Normal Form (PJNF), eliminates join dependencies." }
      ]
    };

    const interviewSet = {
      title: "Placement Interview: DBMS Normalisation & System Design",
      description: "Common placement round questions on database normalisation, BCNF violations, and denormalisation trade-offs.",
      summary: `### Detailed Explanation
System design and database rounds test your ability to explain normal forms clearly, prove anomalies with examples, and discuss BCNF violations. Expect questions on the exact trade-off between write-integrity (normalised) and read-performance (denormalised).

### Exam Tips
- **Explaining BCNF vs 3NF**: Differentiate by explaining that BCNF does not allow dependencies where a determinant is not a super key, even if it determines a prime attribute.
- **Redundancy Cost**: Explain that normalised tables save write overhead and prevent anomalies, but cost query join latency.

### Real-World Examples
- **Denormalised E-Commerce Orders**: Real-world e-commerce systems often duplicate product details inside an orders table (denormalised) to prevent historic invoice modification when products change.`,
      keyPoints: [
        "Be ready to find candidate keys on a whiteboard.",
        "Prepare an anomaly example (Insert/Delete/Update).",
        "Understand why BCNF does not guarantee dependency preservation."
      ],
      flashcards: [
        { id: 1, question: "How would you explain the difference between 3NF and BCNF to an interviewer?", answer: "Explain that a table is in 3NF if for every FD X -> A, either X is a super key or A is a prime attribute. BCNF strictly requires X to be a super key, ignoring the prime attribute exception." },
        { id: 2, question: "What is your answer when asked about database anomalies?", answer: "Give an example: a composite primary key table where deleting a student's enrolled course mistakenly deletes the student's phone number (delete anomaly)." }
      ].concat(studySet.flashcards.slice(2)),
      quiz: studySet.quiz
    };

    const revisionSet = {
      title: "One-Minute Revision: DBMS Normalisation",
      description: "Quick revision notes on 1NF, 2NF, 3NF, BCNF, and keys.",
      summary: `### Detailed Explanation
Database normalisation organizes database tables to prevent anomalies and redundancy using functional dependencies.

### Important Definitions
- **1NF**: Atomic values, no repeating column groups.
- **2NF**: In 1NF and no partial dependencies (composite keys).
- **3NF**: In 2NF and no transitive dependencies.
- **BCNF**: Every determinant must be a super key.
- **Candidate Key**: Minimal attribute set uniquely identifying rows.`,
      keyPoints: studySet.keyPoints.slice(0, 4),
      flashcards: studySet.flashcards,
      quiz: studySet.quiz
    };

    return compileSet(studySet, interviewSet, revisionSet);
  }

  // 3. JAVASCRIPT CLOSURES DATASETS
  if (isClosures) {
    const studySet = {
      title: "JavaScript Closures & Lexical Scope",
      description: "An academic study set explaining lexical scope, closures, function environments, and common interview questions.",
      summary: `### Detailed Explanation
A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time.

Lexical scoping defines how variable names are resolved in nested functions: inner functions contain access to the scope of their parent functions, even if the parent function has finished executing and returned. This is possible because functions in JS maintain an internal reference to their outer environment.

### Important Definitions
- **Closure**: A function that retains access to its outer lexical scope even after that outer scope has closed.
- **Lexical Scope**: The scope of a variable determined by its physical position within the source code.
- **Execution Context**: The environment in which JavaScript code is evaluated and executed.

### Common Mistakes
- **Memory Leaks**: Retaining references to large outer variables inside closures when they are no longer needed, preventing garbage collection.
- **Creating closures in loops**: Using 'var' in a 'for' loop closure leading to all functions referencing the same final loop index value (fixed by using 'let' or IIFEs).

### Exam Tips
- **Trace closure state**: When asked to trace outputs, write down the variables in the outer function's scope to track updates across multiple calls.

### Mnemonics
- **L.E.S.S.**: Lexical Environment Saves State.

### Real-World Examples
- **Data Encapsulation**: Creating private variables by returning inner functions that manipulate a local variable declared in an outer function.`,
      keyPoints: [
        "A closure retains references to its outer scope variables.",
        "Lexical scope is determined at write time (statically), not runtime.",
        "Closures enable private state emulation in object-oriented JavaScript.",
        "Every function in JavaScript forms a closure upon definition.",
        "Stale closures occur when values inside the scope represent outdated state.",
        "Garbage collection is prevented for variables inside active closures."
      ],
      flashcards: [
        { id: 1, question: "What is a closure in JavaScript?", answer: "A function that has access to its outer function's scope even after the outer function has returned." },
        { id: 2, question: "What is lexical scope?", answer: "Variables declared in parent scopes are accessible to inner scopes based on code structure." },
        { id: 3, question: "When are closures created in JavaScript?", answer: "Every time a function is created, at function creation time." },
        { id: 4, question: "What is the execution context?", answer: "The wrapper environment in which the JavaScript engine executes code (evaluating scope chains and this)." },
        { id: 5, question: "How can closures cause memory leaks?", answer: "By holding onto references of large variables in the outer scope, preventing garbage collection." },
        { id: 6, question: "How do you solve the loop closure variable binding problem?", answer: "Use block-scoped variables ('let') or wrap the function call in an IIFE." },
        { id: 7, question: "What is an IIFE?", answer: "Immediately Invoked Function Expression, used to create temporary local scope blocks." },
        { id: 8, question: "Can closures simulate private methods?", answer: "Yes, by restricting direct access to local outer variables and exposing public interface functions." },
        { id: 9, question: "What is the Scope Chain?", answer: "A hierarchy of scopes searched by the JS engine to resolve variable identifiers." },
        { id: 10, question: "What is a closure state value reference?", answer: "A live reference to variables in the outer scope, meaning changing them affects the closure value." },
        { id: 11, question: "What is the global scope in a browser?", answer: "The outermost scope representing the 'window' object, accessible to all code." },
        { id: 12, question: "What is block scope?", answer: "Variables declared inside brackets '{}' using let or const, accessible only inside that block." },
        { id: 13, question: "What is a closure's Lexical Environment?", answer: "The environment consisting of local variables and a reference to the outer environment." },
        { id: 14, question: "What happens to outer variables when a function returns?", answer: "They persist in memory if referenced by any active inner closure." },
        { id: 15, question: "What is nested scoping?", answer: "Function scopes declared inside other function scopes recursively." },
        { id: 16, question: "What is a module pattern?", answer: "A design pattern using closures to bundle private state with public methods." }
      ],
      quiz: [
        { id: 1, question: "What determines lexical scope in JavaScript?", options: ["Where the function is called", "Where the function is declared in code", "How the browser executes the thread", "The value of 'this' binding"], correctAnswer: "Where the function is declared in code", explanation: "Lexical scope is static, determined strictly by the physical position of variables and functions inside the source file." },
        { id: 2, question: "Which keyword creates a block-scoped variable that resolves loop closure issues?", options: ["var", "let", "function", "global"], correctAnswer: "let", explanation: "'let' binds variables to the block scope, creating a new binding for each iteration in loops." },
        { id: 3, question: "What happens to outer variables inside a closure when the parent function exits?", options: ["They are garbage collected immediately", "They are moved to global scope", "They remain in memory as long as the closure exists", "They become read-only constants"], correctAnswer: "They remain in memory as long as the closure exists", explanation: "JavaScript keeps the lexical scope variables alive in memory since the closure function holds a reference to them." },
        { id: 4, question: "What is a closure?", options: ["A function along with its lexical environment", "A method to close browser tabs", "A private JavaScript class object", "A loop termination statement"], correctAnswer: "A function along with its lexical environment", explanation: "A closure is the bundle of a function and its outer scope context, allowing access to outer variables." },
        { id: 5, question: "How does the JS engine search for a variable identifier?", options: ["From outer scope inward", "Along the Scope Chain from inner scope outward", "Only in the global context", "By checking class methods exclusively"], correctAnswer: "Along the Scope Chain from inner scope outward", explanation: "Variable lookup starts at local scope and traverses up parent scopes until the global scope is reached." },
        { id: 6, question: "What pattern emulates object encapsulation and private state using closures?", options: ["Prototype pattern", "Module pattern", "Singleton pattern", "Observer pattern"], correctAnswer: "Module pattern", explanation: "The Module pattern returns object literals exposing public methods that reference private closure variables." },
        { id: 7, question: "Why do closures sometimes cause memory concerns?", options: ["They double memory footprint size", "They prevent referenced variables from being garbage collected", "They compile code repeatedly", "They block the main execution thread"], correctAnswer: "They prevent referenced variables from being garbage collected", explanation: "Unused outer variables held by closures remain in memory, which can lead to leaks if not cleared." },
        { id: 8, question: "Which scope represents variables declared outside of any function block?", options: ["Local scope", "Global scope", "Block scope", "Lexical scope"], correctAnswer: "Global scope", explanation: "Global scope is the top-level scope containing all variables not enclosed in any block or function." },
        { id: 9, question: "What does 'IIFE' stand for?", options: ["Internal Interface Function Execution", "Immediately Invoked Function Expression", "Implicit Instance Functional Entity", "Iterative Index Function Evaluation"], correctAnswer: "Immediately Invoked Function Expression", explanation: "IIFE stands for Immediately Invoked Function Expression, executing a function block immediately after definition." },
        { id: 10, question: "If an inner function uses a variable from its outer parent function, what is created?", options: ["A constructor", "A closure", "A promise", "An array"], correctAnswer: "A closure", explanation: "Accessing outer scope variables from an inner function binds that outer context, creating a closure." },
        { id: 11, question: "What is dynamic scope (unlike JavaScript's lexical scope)?", options: ["Scope resolved at runtime based on call stack", "Scope containing dynamic variables", "Scope resolved within web sockets", "Scope determined by compiler tags"], correctAnswer: "Scope resolved at runtime based on call stack", explanation: "Dynamic scope determines variable access based on the execution call stack path, not lexical placement." },
        { id: 12, question: "What happens if a closure changes a variable in the outer scope?", options: ["It throws a ReferenceError", "The outer scope variable updates (shared reference)", "It modifies a local copy only", "The function stops executing"], correctAnswer: "The outer scope variable updates (shared reference)", explanation: "Closures share access to live references of outer variables, so modifications affect all functions referencing that scope." },
        { id: 13, question: "What is block scoping?", options: ["Scoping within a function body", "Scoping within curly braces using let/const", "Scoping inside class constructor blocks only", "Global window declaration"], correctAnswer: "Scoping within curly braces using let/const", explanation: "Variables declared with 'let' and 'const' inside '{}' are constrained to that block and inaccessible outside." },
        { id: 14, question: "What holds local variable bindings during function execution?", options: ["Call stack", "Activation Record / Lexical Environment", "Heap memory logs", "Event loop queue"], correctAnswer: "Activation Record / Lexical Environment", explanation: "Local scope variables are mapped within lexical environments during function execution contexts." },
        { id: 15, question: "Which keyword creates function-scoped variables that ignore block brackets?", options: ["const", "var", "let", "static"], correctAnswer: "var", explanation: "'var' declarations are function-scoped (or globally scoped) and ignore block brackets '{}'." },
        { id: 16, question: "What happens if a variable is used inside a closure but never declared in scope?", options: ["It returns null", "It throws a ReferenceError", "It creates a global object", "It defaults to undefined"], correctAnswer: "It throws a ReferenceError", explanation: "If an identifier cannot be resolved along the scope chain, JavaScript throws a ReferenceError." }
      ]
    };

    const interviewSet = {
      title: "Senior JS Interview: Closures & Scope Chain",
      description: "Advanced JavaScript placement interview prep covering execution context, scope chains, and data encapsulation patterns.",
      summary: `### Detailed Explanation
In JavaScript/React developer interviews, closures are a primary filter topic. Expect to write code displaying private data encapsulation, explain stale closure bugs in React hooks, and trace lexical scopes in asynchronous callbacks.

### Exam Tips
- **Exposing Private API**: When asked to build private variables, write a function declaring a local variable, and return an object exposing getter/setter closure methods.
- **Handling stale closures**: Highlight that a closure captures values at its creation, meaning it will access outdated state if not recreated when state updates (a classic \`useEffect\` bug).

### Real-World Examples
- **Redux Store Creation**: Redux uses closures inside \`createStore\` to keep the application state private, exposing only \`getState\`, \`dispatch\`, and \`subscribe\` closure methods.`,
      keyPoints: [
        "Expect scoping output tracing questions.",
        "Be ready to write a custom module pattern.",
        "Explain memory costs and garbage collection boundaries."
      ],
      flashcards: [
        { id: 1, question: "What is a live coding closure question?", answer: "Usually: 'Write a function createCounter() that returns an object with increment and getValue methods where counter is private.' Solution uses private closure variable." },
        { id: 2, question: "How does the JS engine handle closure garbage collection?", answer: "If an inner function referencing outer variables is returned, its Lexical Environment is preserved on the heap, preventing garbage collection until the inner function is dereferenced." }
      ].concat(studySet.flashcards.slice(2)),
      quiz: studySet.quiz
    };

    const revisionSet = {
      title: "One-Minute Revision: JS Closures",
      description: "Quick revision notes on lexical scope, closure bindings, and context.",
      summary: `### Detailed Explanation
A closure is a function that retains access to its parent lexical scope even after the parent function has exited.

### Important Definitions
- **Closure**: Function bundled with its outer lexical environment.
- **Lexical Scope**: Scope determined statically at write time.
- **Execution Context**: Internal evaluation container.
- **IIFE**: Immediate function block resolving loop scopes.
- **Scope Chain**: Search path traversed to find variables.`,
      keyPoints: studySet.keyPoints.slice(0, 4),
      flashcards: studySet.flashcards,
      quiz: studySet.quiz
    };

    return compileSet(studySet, interviewSet, revisionSet);
  }

  // 4. REACT HOOKS DATASETS
  if (isHooks) {
    const studySet = {
      title: "React Hooks: State & Side Effects",
      description: "An academic study set covering rules of hooks, useState, useEffect, dependency arrays, and stateful side-effects.",
      summary: `### Detailed Explanation
React Hooks are functions that let developers tap into React state and lifecycle features from function components without writing ES6 classes. Introduced in React 16.8, they promote modularity and state reuse.

The core hooks include:
1. **useState**: Declares local state variables that trigger component re-renders on change.
2. **useEffect**: Performs side effects (fetching data, subscriptions, manual DOM updates). It runs after rendering, and can optionally return a cleanup function.
3. **useMemo** & **useCallback**: Memoize expensive computations and function references to optimize rendering.

### Important Definitions
- **Hook**: A special function that connects custom logic to React fiber nodes.
- **Dependency Array**: An array passed to useEffect/useMemo that triggers re-evaluation only when its values change.
- **Reconciliation**: React's algorithm for diffing virtual DOM trees to update the actual browser DOM.

### Common Mistakes
- **Missing values in Dependency Arrays**: Omitting props or state variables used inside useEffect, leading to stale closures.
- **Calling hooks conditionally**: Placing hooks inside loops, conditions, or nested functions (violating Rules of Hooks).

### Exam Tips
- **Remember the Cleanups**: Always explain that returning a function in useEffect cleans up event listeners or timers to prevent memory leaks.

### Mnemonics
- **U.S.E.**: Update State, Side Effects.

### Real-World Examples
- **Custom Fetch Hook**: Building a 'useFetch' hook to encapsulate loading, data, and error state logic for reuse across multiple pages.`,
      keyPoints: [
        "Hooks allow functional components to maintain state and lifecycle features.",
        "Hooks must only be called at the top level of your React function.",
        "useState returns a state value and a function to update that value.",
        "useEffect runs side-effects and can return a cleanup function.",
        "Empty dependency arrays '[]' trigger useEffect only on mount and unmount.",
        "useMemo memoizes values, while useCallback memoizes functional references."
      ],
      flashcards: [
        { id: 1, question: "What are React Hooks?", answer: "Functions allowing state and lifecycle access from functional React components." },
        { id: 2, question: "What is the primary rule of hooks?", answer: "Hooks must only be called at the top level (not inside loops or conditions)." },
        { id: 3, question: "What does useState return?", answer: "An array containing the current state value and a state updater function." },
        { id: 4, question: "What is the purpose of useEffect?", answer: "To execute side effects (data fetching, subscriptions, DOM writes) in functional components." },
        { id: 5, question: "How do you trigger useEffect only on mount?", answer: "Pass an empty dependency array '[]' as the second argument." },
        { id: 6, question: "What does returning a function inside useEffect do?", answer: "It acts as a cleanup function, running before the component unmounts or re-renders." },
        { id: 7, question: "What is the difference between useMemo and useCallback?", answer: "useMemo returns a memoized value; useCallback returns a memoized function reference." },
        { id: 8, question: "What is a custom hook?", answer: "A JavaScript function prefixing 'use' that extracts reusable hook logic." },
        { id: 9, question: "What is useReducer?", answer: "An alternative hook to useState for managing complex, multi-state reducer logic." },
        { id: 10, question: "What is useRef?", answer: "A hook returning a mutable ref object whose '.current' persists across renders without causing re-renders." },
        { id: 11, question: "What is the Virtual DOM?", answer: "React's lightweight, in-memory representation of the actual DOM." },
        { id: 12, question: "What is useContext?", answer: "A hook enabling direct subscription to React Context values without nesting context consumers." },
        { id: 13, question: "Why should dependency arrays be exhaustive?", answer: "To prevent stale closures and ensure code uses the latest props and state." },
        { id: 14, question: "What hook manages direct DOM element references?", answer: "useRef." },
        { id: 15, question: "When does useEffect execute?", answer: "After React has completed rendering and painted updates to the screen." },
        { id: 16, question: "What is useLayoutEffect?", answer: "A hook triggering synchronously after DOM mutations but before the browser paints." }
      ],
      quiz: [
        { id: 1, question: "In which version of React were hooks introduced?", options: ["React 15.6", "React 16.3", "React 16.8", "React 18.0"], correctAnswer: "React 16.8", explanation: "React Hooks were introduced in version 16.8 to support stateful logic in functional components." },
        { id: 2, question: "Which of the following violates the rules of hooks?", options: ["Calling hooks inside custom hooks", "Calling hooks inside a condition block", "Calling hooks at the top level of a component", "Calling useState multiple times"], correctAnswer: "Calling hooks inside a condition block", explanation: "Hooks must always be executed in the exact same order on every render; conditional calls violate this rule." },
        { id: 3, question: "How does React track hooks state values?", options: ["By using variable names", "By the execution call order", "Using random ID hashes", "Through global window properties"], correctAnswer: "By the execution call order", explanation: "React matches state hooks with internally stored arrays based on their strict order of execution." },
        { id: 4, question: "What is the correct way to handle subscriptions in useEffect?", options: ["Set up subscription and return a cleanup function to unsubscribe", "Unsubscribe in a separate helper function", "Use useState to store the unsubscribe callback", "Do not handle cleanup"], correctAnswer: "Set up subscription and return a cleanup function to unsubscribe", explanation: "Returning a cleanup function ensures subscriptions are closed on unmount, avoiding memory leaks." },
        { id: 5, question: "Which hook should be used to store event listener objects without triggering re-renders?", options: ["useState", "useMemo", "useRef", "useEffect"], correctAnswer: "useRef", explanation: "useRef holds mutable values that persist across renders without causing component updates." },
        { id: 6, question: "What value does useMemo return?", options: ["A memoized function reference", "The memoized result of a calculation function", "A dispatcher function", "A state variable"], correctAnswer: "The memoized result of a calculation function", explanation: "useMemo caches and returns the computed result of an expensive calculation function." },
        { id: 7, question: "What happens if you omit the dependency array in useEffect?", options: ["The hook never runs", "The hook runs only on mount", "The hook runs on every single render", "The hook throws a syntax error"], correctAnswer: "The hook runs on every single render", explanation: "Omitting the dependency array tells React to run the side-effect after every single rendering cycle." },
        { id: 8, question: "Which hook helps prevent unnecessary child renders by caching callback references?", options: ["useMemo", "useCallback", "useDeferredValue", "useTransition"], correctAnswer: "useCallback", explanation: "useCallback caches function references, preventing children receiving them as props from re-rendering." },
        { id: 9, question: "How can you share global state without prop-drilling?", options: ["useRef", "useContext", "useState", "useReducer"], correctAnswer: "useContext", explanation: "useContext fetches global context values directly, bypassing intermediate components." },
        { id: 10, question: "What is the purpose of the cleanup function in useEffect?", options: ["To delete DOM nodes", "To reset local variables", "To cancel subscriptions, event listeners, or timers", "To clear browser history cache"], correctAnswer: "To cancel subscriptions, event listeners, or timers", explanation: "Cleanups prevent resource leaks by removing event listeners, intervals, or socket events." },
        { id: 11, question: "What does useReducer take as arguments?", options: ["State and action", "Reducer function and initial state", "State dispatcher and payload", "Key name and config object"], correctAnswer: "Reducer function and initial state", explanation: "useReducer accepts a reducer function (state, action) => newState and the initial state value." },
        { id: 12, question: "Which hook is called synchronously before screen paint?", options: ["useEffect", "useLayoutEffect", "useMemo", "useId"], correctAnswer: "useLayoutEffect", explanation: "useLayoutEffect fires synchronously right after DOM mutations, blocking screen paint until complete." },
        { id: 13, question: "What does React do when state updates via useState's setter?", options: ["Reloads the page", "Schedules a component re-render", "Updates the actual DOM directly", "Resets the scope chain"], correctAnswer: "Schedules a component re-render", explanation: "State updates prompt React to queue a component render cycle to reflect the new state." },
        { id: 14, question: "Which of the following is true for custom hooks?", options: ["They must start with the word 'use'", "They must return an array", "They must use class state", "They cannot call other hooks"], correctAnswer: "They must start with the word 'use'", explanation: "React uses the 'use' prefix rule to identify and validate hook constraints within custom functions." },
        { id: 15, question: "What happens if a dependency array contains stale data?", options: ["The closure references old state values", "The component crashes", "It renders twice in parallel", "State is reset to initial value"], correctAnswer: "The closure references old state values", explanation: "Missing dependencies cause inner scopes to reference state values from old renders (stale closures)." },
        { id: 16, question: "What hook generates unique IDs for accessibility attributes?", options: ["useRef", "useId", "useContext", "useImperativeHandle"], correctAnswer: "useId", explanation: "useId creates stable, unique ID strings for matching accessibility attributes." }
      ]
    };

    const interviewSet = {
      title: "React placement round: Hooks & Component Lifecycle",
      description: "Placement interview questions on React hooks rules, dependency arrays, custom hooks, and state batching.",
      summary: `### Detailed Explanation
Frontend engineering and React rounds focus on hook execution mechanisms. Be ready to explain how React internally tracks hook lists, why calling hooks conditionally crashes the fiber tree, and how to avoid memory leaks in useEffect.

### Exam Tips
- **Explaining hooks ordering**: React matches hook states using a linked list keyed by execution order. Changing the order (with conditions/loops) offsets hook indexes and results in mismatched states.
- **Handling useEffect stale states**: Explain that passing values to the dependency array forces the hook closure to rebuild with updated variables.

### Real-World Examples
- **useWindowSize Event listener**: Custom hooks listening to window sizes must unsubscribe in their cleanup block; otherwise, multiple component re-mounts attach duplicate event listeners, triggering severe browser memory leaks.`,
      keyPoints: [
        "Explain Fiber node hook storage lists.",
        "Be ready to build a reusable useEventListener hook.",
        "Detail React 18 automatic state batching behavior."
      ],
      flashcards: [
        { id: 1, question: "Why can't React hooks be called inside loops or conditionals?", answer: "React relies on the strict, constant order of hook calls to match state values with internal array nodes. Calling them conditionally changes the execution order, breaking the state mapping." },
        { id: 2, question: "What is the expected explanation of stale closures in React?", answer: "A stale closure occurs when a hook (like useEffect or useCallback) captures variables from a past render. To fix it, list the variable inside the hook's dependency array to trigger updates." }
      ].concat(studySet.flashcards.slice(2)),
      quiz: studySet.quiz
    };

    const revisionSet = {
      title: "One-Minute Revision: React Hooks",
      description: "Quick revision notes on hooks, rules, useState, and useEffect.",
      summary: `### Detailed Explanation
React Hooks allow function components to handle states and side-effects.

### Important Definitions
- **useState**: Declares a local state variable.
- **useEffect**: Manages side effects and cleanups.
- **Rules of Hooks**: Call at top-level only, from React components only.
- **useRef**: Holds mutable references without re-renders.
- **useMemo**: Caches computed values from calculations.`,
      keyPoints: studySet.keyPoints.slice(0, 4),
      flashcards: studySet.flashcards,
      quiz: studySet.quiz
    };

    return compileSet(studySet, interviewSet, revisionSet);
  }

  // 5. BINARY SEARCH DATASETS
  if (isBinarySearch) {
    const studySet = {
      title: "Binary Search: Algorithm & Complexity",
      description: "An academic study set covering divide-and-conquer binary search, array indexing, boundaries, and O(log n) analysis.",
      summary: `### Detailed Explanation
Binary Search is an efficient, divide-and-conquer search algorithm used to find the position of a target value within a sorted array. It operates by comparing the target value to the middle element.

If the target is smaller, the search continues in the lower half; if larger, it continues in the upper half. Each comparison reduces the search space by half, yielding a logarithmic time complexity of O(log n) and a space complexity of O(1) for iterative implementations.

### Important Definitions
- **Sorted Array**: An array arranged in ascending or descending order (a strict requirement for binary search).
- **Logarithmic Time Complexity**: O(log n) time, indicating the number of operations grows proportionally to the logarithm of the input size.
- **Midpoint Calculation**: Finding the middle index, calculated as 'mid = low + Math.floor((high - low) / 2)' to avoid integer overflow.

### Common Mistakes
- **Integer Overflow**: Calculating midpoint as '(low + high) / 2', which can exceed maximum integer bounds in large arrays.
- **Off-by-One Infinite Loops**: Forgetting to update pointers with 'low = mid + 1' or 'high = mid - 1' when the target is not found.

### Exam Tips
- **Show boundaries**: In tracing tables, write down the values of 'low', 'high', and 'mid' for every single step of the search.

### Mnemonics
- **L.H.M.**: Low, High, Midpoint revision.

### Real-World Examples
- **Database Indexes**: Index lookups in database management systems use binary search-like operations on sorted key arrays to locate records instantly.`,
      keyPoints: [
        "Binary search requires the input array to be sorted beforehand.",
        "Dividing search space in half gives a time complexity of O(log n).",
        "Midpoint calculations must prevent integer overflow boundaries.",
        "Iterative binary search uses constant O(1) space complexity.",
        "Recursive binary search requires O(log n) call stack space.",
        "Pointers must adjust strictly past the midpoint index."
      ],
      flashcards: [
        { id: 1, question: "What is Binary Search?", answer: "An efficient search algorithm that finds target values in sorted arrays by repeatedly halving the search range." },
        { id: 2, question: "What is the pre-requisite for binary search?", answer: "The input array must be sorted." },
        { id: 3, question: "What is the time complexity of Binary Search?", answer: "O(log n) for average and worst-case scenarios." },
        { id: 4, question: "What is the best-case time complexity?", answer: "O(1), when the midpoint element matches the target on the first comparison." },
        { id: 5, question: "Why is mid calculated as 'low + Math.floor((high - low) / 2)'?", answer: "To prevent integer overflow errors in languages with fixed-size integers." },
        { id: 6, question: "What is the space complexity of iterative binary search?", answer: "O(1) auxiliary space, as it uses only pointer variables." },
        { id: 7, question: "What is the space complexity of recursive binary search?", answer: "O(log n) due to call stack frame accumulation during recursion." },
        { id: 8, question: "How does binary search compare to linear search?", answer: "Binary search is O(log n) and requires sorted inputs; linear search is O(n) and works on unsorted inputs." },
        { id: 9, question: "What happens if you fail to update low or high pointers past mid?", answer: "The search can enter an infinite loop when pointers stop moving." },
        { id: 10, question: "Can binary search be used on linked lists?", answer: "No, because linked lists do not support random access (O(1) indexing) required to check midpoints." },
        { id: 11, question: "What is lower bound binary search?", answer: "A variation finding the first index where the element is greater than or equal to the target." },
        { id: 12, question: "What is upper bound binary search?", answer: "A variation finding the first index where the element is strictly greater than the target." },
        { id: 13, question: "What search space reduction is done at each step?", options: [], answer: "The search space is divided exactly in half." },
        { id: 14, question: "How do you search if target is greater than mid?", answer: "Update the low pointer to 'mid + 1' to search the upper half." },
        { id: 15, question: "How do you search if target is smaller than mid?", answer: "Update the high pointer to 'mid - 1' to search the lower half." },
        { id: 16, question: "What condition terminates the search loop?", answer: "The loop terminates when 'low > high', indicating the target is not in the array." }
      ],
      quiz: [
        { id: 1, question: "What is the worst-case time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: "O(log n)", explanation: "Each step cuts the array search space in half, resulting in logarithmic time complexity." },
        { id: 2, question: "Which structure does not support binary search efficiently?", options: ["Sorted array", "Sorted Singly Linked List", "Sorted ArrayList", "Dynamic Array"], correctAnswer: "Sorted Singly Linked List", explanation: "Linked lists do not support constant-time random access, making midpoint indexing O(n) instead of O(1)." },
        { id: 3, question: "Why is mid = low + (high - low)/2 preferred over (low + high)/2?", options: ["It computes faster", "It avoids potential integer overflow", "It works on unsorted arrays", "It uses less memory"], correctAnswer: "It avoids potential integer overflow", explanation: "Adding low to high directly can exceed the maximum value of a 32-bit signed integer, causing overflow." },
        { id: 4, question: "What is the best-case time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: "O(1)", explanation: "Best case occurs if the target is found at the first midpoint comparison." },
        { id: 5, question: "What is the space complexity of iterative binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(2^n)"], correctAnswer: "O(1)", explanation: "Iterative implementations do not allocate extra memory relative to input size, using constant space." },
        { id: 6, question: "If low = 0 and high = 9, what is the initial midpoint index?", options: ["4", "5", "4.5", "6"], correctAnswer: "4", explanation: "0 + Math.floor((9-0)/2) = 4." },
        { id: 7, question: "What happens to low when target is greater than the middle element?", options: ["low = mid", "low = mid + 1", "low = mid - 1", "low = high"], correctAnswer: "low = mid + 1", explanation: "Since the array is sorted and target is larger, the target must lie in the upper sub-array starting after mid." },
        { id: 8, question: "Which search algorithm is best for a small unsorted list?", options: ["Binary Search", "Linear Search", "Jump Search", "Exponential Search"], correctAnswer: "Linear Search", explanation: "Linear search operates on unsorted structures; sorting first for binary search would take O(n log n) time." },
        { id: 9, question: "How many comparisons does binary search need in the worst case for an array of size 1024?", options: ["10", "11", "512", "1024"], correctAnswer: "11", explanation: "Log2(1024) = 10, meaning at most 11 comparisons are required to locate or reject the target." },
        { id: 10, question: "What is the space complexity of recursive binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: "O(log n)", explanation: "The recursion stack accumulates one frame per division, scaling logarithmically with input size." },
        { id: 11, question: "What condition is checked to stop the search loop?", options: ["low < high", "low <= high", "low > high", "low == high"], correctAnswer: "low <= high", explanation: "The loop executes as long as low <= high. If low > high, the target does not exist in the array." },
        { id: 12, question: "Which strategy does binary search use?", options: ["Dynamic programming", "Greedy approach", "Divide and conquer", "Backtracking"], correctAnswer: "Divide and conquer", explanation: "Binary search continuously divides the problem size by half, working as a divide-and-conquer process." },
        { id: 13, question: "What happens to high when target is smaller than the middle element?", options: ["high = mid", "high = mid - 1", "high = mid + 1", "high = low"], correctAnswer: "high = mid - 1", explanation: "The target must lie in the lower sub-array, which ends just before the mid index." },
        { id: 14, question: "How does sorting affect binary search?", options: ["It is not required", "It is mandatory", "It only speeds it up slightly", "It makes space complexity O(n)"], correctAnswer: "It is mandatory", explanation: "Without sorted order, halving the range based on comparison values is mathematically impossible." },
        { id: 15, question: "If the target is not in the sorted array, what does binary search return?", options: ["The first element", "A value indicating not found (e.g. -1)", "The closest index", "An infinite loop"], correctAnswer: "A value indicating not found (e.g. -1)", explanation: "Standard implementations return -1 or null when pointers cross without finding the target." },
        { id: 16, question: "Which search is a variation that starts from a small jump step and doubles it?", options: ["Binary Search", "Exponential Search", "Linear Search", "Interpolation Search"], correctAnswer: "Exponential Search", explanation: "Exponential search jumps in powers of 2 to locate a range, then runs binary search within it." }
      ]
    };

    const interviewSet = {
      title: "Coding Round: Binary Search & Divide and Conquer",
      description: "Data Structures and Algorithms placement round questions on binary search boundary bugs, pivots, and complexity proofs.",
      summary: `### Detailed Explanation
In DSA placement rounds, interviewers check boundary conditions. Be ready to write binary search on a whiteboard, explain why calculating midpoint as \`low + (high - low)/2\` prevents overflow, and detail how to run binary search on a rotated sorted array.

### Exam Tips
- **Handling Rotated Arrays**: Differentiate by checking which half of the array is normally sorted at each step, and target binary search checks based on that sorted range.
- **Midpoint Overflow Explanation**: In languages with fixed integer limits, \`low + high\` can exceed $2^{31}-1$, returning a negative index. \`low + (high-low)/2\` avoids this overflow completely.

### Real-World Examples
- **Git Bisect**: Developers use binary search via \`git bisect\` to check git commits history, rapidly identifying which specific commit introduced a regression bug.`,
      keyPoints: [
        "Explain low + (high-low)/2 on a whiteboard.",
        "Solve the rotated sorted array search variant.",
        "Prove O(log n) time complexity using search space divisions."
      ],
      flashcards: [
        { id: 1, question: "How do you explain the binary search integer overflow bug to an interviewer?", answer: "Explain that `(low + high) / 2` can overflow the 32-bit integer limit if the array size is very large (e.g. $2^{30}$ items). To fix it, calculate it as `low + (high - low) / 2`." },
        { id: 2, question: "What is your answer when asked to search in a rotated sorted array?", answer: "Find the pivot index where the rotation occurs, or check if left/right halves are sorted, then conditionally apply binary search logic to the sorted half." }
      ].concat(studySet.flashcards.slice(2)),
      quiz: studySet.quiz
    };

    const revisionSet = {
      title: "One-Minute Revision: Binary Search",
      description: "Quick revision notes on binary search, space/time bounds, and mid calculations.",
      summary: `### Detailed Explanation
Binary search checks midpoints to locate targets in sorted arrays, cutting search space by half recursively.

### Important Definitions
- **Sorted Array**: Prerequisite input array.
- **Logarithmic Time**: O(log n) average/worst complexity.
- **Overflow Prevention**: Calculating mid index as low + (high-low)/2.
- **Pointer Updates**: low = mid + 1 and high = mid - 1 boundaries.
- **Iterative Space**: O(1) constant auxiliary space.`,
      keyPoints: studySet.keyPoints.slice(0, 4),
      flashcards: studySet.flashcards,
      quiz: studySet.quiz
    };

    return compileSet(studySet, interviewSet, revisionSet);
  }

  // 6. COMPUTER NETWORKS DATASETS
  if (isNetworks) {
    const studySet = {
      title: "Computer Networks: OSI Model, TCP/IP & Routing Protocols",
      description: "An academic study set covering network architectures, the 7-layer OSI model, TCP/IP suite, IP addressing, routing vs switching, and common protocols.",
      summary: `### Detailed Explanation
Computer Networks are collections of interconnected nodes that communicate using standard protocols to share resources. The network architecture is conceptually structured using layered models:
1. **OSI Model (7 Layers)**: Physical, Data Link, Network, Transport, Session, Presentation, Application. Each layer serves the layer above it and is served by the layer below.
2. **TCP/IP Model (4/5 Layers)**: Network Access, Internet, Transport, Application.

Key operations include:
- **Routing vs Switching**: Switches operate at the Data Link Layer (Layer 2) to forward packets within a single local network using MAC addresses. Routers operate at the Network Layer (Layer 3) to route packets across multiple networks using IP addresses.
- **IP Addressing & Subnetting**: IP addresses (IPv4/IPv6) uniquely identify host interfaces. Subnetting uses subnet masks to logically divide a single network into smaller, efficient subnets.
- **Reliable Transport (TCP)**: Provides connection-oriented, ordered, flow-controlled, and error-checked byte stream delivery.
- **Application Protocols**: DNS translates human-readable domain names to IP addresses. HTTP/HTTPS transfers structured hypermedia documents.

### Important Definitions
- **OSI Model**: Open Systems Interconnection, a conceptual framework standardizing network communication functions.
- **TCP/IP Suite**: The conceptual model and set of communications protocols used on the Internet.
- **Subnet Mask**: A 32-bit number used to identify the network and host portions of an IP address.
- **Router**: A Layer 3 device that forwards data packets between computer networks.
- **Switch**: A Layer 2 device that connects devices on a computer network and uses packet switching to forward data.
- **DNS**: Domain Name System, the phonebook of the Internet.

### Common Mistakes
- **Confusing Layer 2 and Layer 3**: Remembering that switches use MAC addresses at Layer 2, while routers use IP addresses at Layer 3.
- **Assuming TCP is the only transport protocol**: UDP (User Datagram Protocol) is a key transport layer protocol that provides connectionless, lightweight, but unreliable delivery (e.g. for streaming/DNS).

### Exam Tips
- **List the OSI layers**: Learn the mnemonic: "Please Do Not Throw Sausage Pizza Away" (Physical, Data Link, Network, Transport, Session, Presentation, Application).
- **Understand port numbers**: Know HTTP (80), HTTPS (443), DNS (53), SSH (22), and FTP (20/21).

### Mnemonics
- **OSI Layers (Bottom to Top)**: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way (Physical, Data Link, Network, Transport, Session, Presentation, Application).

### Real-World Examples
- **Web Browsing**: When you access a website, your browser does a DNS lookup over UDP port 53, establishes a TCP connection via the 3-way handshake over port 443, and sends HTTPS requests to retrieve the site's assets.`,
      keyPoints: [
        "The OSI model has 7 layers, whereas the TCP/IP model has 4 or 5 layers.",
        "Switches forward frames using MAC addresses at Layer 2 (Data Link).",
        "Routers route packets using IP addresses at Layer 3 (Network).",
        "Subnetting splits a network to reduce broadcast domains and conserve IP space.",
        "TCP is connection-oriented and reliable; UDP is connectionless and fast.",
        "DNS translates domain names like example.com to numeric IP addresses."
      ],
      flashcards: [
        { id: 1, question: "What are the 7 layers of the OSI model in order from bottom to top?", answer: "Physical, Data Link, Network, Transport, Session, Presentation, Application." },
        { id: 2, question: "At which layer of the OSI model do routers operate?", answer: "The Network Layer (Layer 3)." },
        { id: 3, question: "At which layer of the OSI model do switches operate?", answer: "The Data Link Layer (Layer 2)." },
        { id: 4, question: "What is the primary difference between TCP and UDP?", answer: "TCP is connection-oriented, ordered, and reliable. UDP is connectionless, unordered, and unreliable but faster." },
        { id: 5, question: "What port number does the Domain Name System (DNS) use?", answer: "Port 53 (typically over UDP)." },
        { id: 6, question: "What does the abbreviation DHCP stand for and what is its purpose?", answer: "Dynamic Host Configuration Protocol; it dynamically assigns IP addresses and network parameters to devices." },
        { id: 7, question: "What is a MAC address?", answer: "Media Access Control address, a unique physical identifier assigned to a network interface controller (NIC) at Layer 2." },
        { id: 8, question: "What is the purpose of subnetting?", answer: "To divide a large IP network into smaller, logical sub-networks to control broadcast traffic and improve security/address management." },
        { id: 9, question: "Explain the TCP 3-way handshake process.", answer: "The client sends a SYN packet, the server responds with a SYN-ACK packet, and the client sends an ACK packet to establish a connection." },
        { id: 10, question: "What is the difference between IPv4 and IPv6 address lengths?", answer: "IPv4 addresses are 32 bits long (4 bytes), while IPv6 addresses are 128 bits long (16 bytes)." },
        { id: 11, question: "What layer of the OSI model does encryption/decryption belong to?", answer: "The Presentation Layer (Layer 6)." },
        { id: 12, question: "What is the difference between routing and switching?", answer: "Switching moves data packets within the same local area network (LAN) at Layer 2. Routing moves packets across different networks at Layer 3." },
        { id: 13, question: "What protocol is used to map an IP address to a physical MAC address?", answer: "ARP (Address Resolution Protocol)." },
        { id: 14, question: "What port numbers are assigned to HTTP and HTTPS?", answer: "HTTP uses port 80; HTTPS uses port 443." },
        { id: 15, question: "What is a default gateway?", answer: "The node on a computer network that serves as an access point to another network when no other route matches an IP destination." },
        { id: 16, question: "What is the function of the Transport Layer?", answer: "Providing end-to-end communication services, flow control, error recovery, and multiplexing (ports)." }
      ],
      quiz: [
        {
          id: 1,
          question: "Which of the following layers of the OSI model is responsible for routing packets across networks?",
          options: ["Data Link Layer", "Network Layer", "Transport Layer", "Physical Layer"],
          correctAnswer: "Network Layer",
          explanation: "The Network Layer (Layer 3) handles logical addressing (IP) and routing packets across different networks."
        },
        {
          id: 2,
          question: "Which TCP/IP protocol is used to dynamically assign IP addresses to devices on a network?",
          options: ["DNS", "DHCP", "ARP", "ICMP"],
          correctAnswer: "DHCP",
          explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and configuration parameters to network devices."
        },
        {
          id: 3,
          question: "What is the correct order of the TCP 3-way handshake?",
          options: ["SYN, ACK, SYN-ACK", "SYN, SYN-ACK, ACK", "ACK, SYN, SYN-ACK", "SYN-ACK, SYN, ACK"],
          correctAnswer: "SYN, SYN-ACK, ACK",
          explanation: "The TCP connection starts with client sending SYN, server responding with SYN-ACK, and client concluding with ACK."
        },
        {
          id: 4,
          question: "Which of the following ports is used by secure web traffic (HTTPS)?",
          options: ["80", "22", "53", "443"],
          correctAnswer: "443",
          explanation: "HTTPS uses port 443 by default, whereas standard unencrypted HTTP uses port 80."
        },
        {
          id: 5,
          question: "At which OSI layer does a standard network switch operate?",
          options: ["Physical Layer", "Data Link Layer", "Network Layer", "Session Layer"],
          correctAnswer: "Data Link Layer",
          explanation: "Standard Layer 2 switches operate at the Data Link Layer, forwarding frames using MAC addresses."
        },
        {
          id: 6,
          question: "Which transport protocol is connectionless and does not guarantee packet delivery?",
          options: ["TCP", "UDP", "FTP", "SMTP"],
          correctAnswer: "UDP",
          explanation: "UDP (User Datagram Protocol) is a lightweight, connectionless protocol that does not guarantee delivery or packet order, unlike TCP."
        }
      ]
    };

    const interviewSet = {
      title: "Placement Prep: Computer Networks & Viva Prep",
      description: "Placement interview preparation focusing on technical concepts, viva questions, and production scenarios for Computer Networks.",
      summary: `### Detailed Explanation
Prepare for technical interview questions on Computer Networks by reviewing conceptual foundations, practical design trade-offs, and production implementation details.

### Exam Tips
- **Interview Answers**: When explaining DNS or the TCP handshake, define it clearly in one sentence first. Then provide a real-world example of how a browser uses it.
- **Edge Cases**: Be prepared to discuss differences between TCP and UDP, and how congestion control works in TCP.

### Real-World Examples
- **Production Integration**: Real-world software architectures use HTTP/2 or gRPC over HTTP/TCP to multiplex connection channels and reduce latency.`,
      keyPoints: studySet.keyPoints.slice(0, 3),
      flashcards: studySet.flashcards.map((f, i) => ({
        id: f.id,
        question: `Common interview question: How does Computer Networks relate to concept #${i + 1}?`,
        answer: `Explain that Computer Networks addresses this by defining clear parameters for concept #${i + 1}, ensuring write safety and execution safety.`
      })),
      quiz: studySet.quiz
    };

    const revisionSet = {
      title: "One-Minute Revision: Computer Networks",
      description: "A rapid-fire revision sheet summarizing key points and core concepts for Computer Networks.",
      summary: `### Detailed Explanation
Quick revision notes for Computer Networks to build core retrieval strength.

### Important Definitions
- **OSI Model**: Open Systems Interconnection framework of 7 layers.
- **TCP/IP Model**: The 4/5 layer protocol suite powering the Internet.
- **Subnetting**: Dividing network ranges into smaller, efficient subnets.
- **Switching**: Layer 2 frame forwarding using MAC addresses.
- **Routing**: Layer 3 packet forwarding using IP addresses.`,
      keyPoints: studySet.keyPoints.slice(0, 4),
      flashcards: studySet.flashcards.slice(0, 5),
      quiz: studySet.quiz.slice(0, 3)
    };

    return compileSet(studySet, interviewSet, revisionSet);
  }

  // 7. GENERAL REVISION FALLBACK DATASETS
  const studySet = {
    title: `Study Session: ${topic}`,
    description: `A detailed, academically rigorous study guide on ${topic} designed for comprehensive revision.`,
    summary: `### Detailed Explanation
Active recall and spaced repetition are the most effective cognitive science techniques for mastering any academic topic, including ${topic}. This revision block structures the material into structured cards, revision tips, and quiz questions to ensure active encoding and long-term storage.

### Important Definitions
- **Active Recall**: The practice of actively retrieving information from memory during learning, rather than passively reading notes.
- **Spaced Repetition**: Reviewing material at increasing intervals over time to exploit the spacing effect and strengthen memory pathways.
- **Feynman Technique**: Explaining a concept in simple, plain language to identify gaps in your understanding.

### Common Mistakes
- **Passive Rereading**: Rereading chapters or highlighting lines repeatedly. Research shows this creates an illusion of competence without building recall.
- **Cramming**: Attempting to review all material in a single session before exams, leading to rapid forgetting.

### Exam Tips
- **Self-test repeatedly**: Write summaries and answer practice questions without looking at source materials.
- **Review mistakes**: Focus revision sessions on topics marked for review rather than content you already know well.

### Mnemonics
- **S.P.A.C.E.**: Spaced Practice And Active Cognitive Engagement.

### Real-World Examples
- **Supermemo and Anki**: Flashcard systems using spacing algorithms to help medical and engineering students retain thousands of complex facts.`,
    keyPoints: [
      `Active retrieval yields twice the retention of passive reading.`,
      "Review the flashcard deck until all cards are marked as known.",
      "Use the mistake review screen at the end of the quiz to check errors.",
      "Set aside specific study times over several days to leverage spacing.",
      "Explain the key concepts to a peer in simple terms to check clarity.",
      "Re-quiz yourself periodically to track long-term retrieval."
    ],
    flashcards: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      question: `Define key active recall question #${i + 1} for ${topic}?`,
      answer: `This is explanation #${i + 1} defining the core structural parameters and relationships in ${topic}.`
    })),
    quiz: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      question: `Question #${i + 1}: Which of the following is true regarding ${topic}?`,
      options: [
        `Option A: Primary feature detail #${i + 1}`,
        `Option B: Secondary feature detail #${i + 1}`,
        `Option C: Tertiary feature detail #${i + 1}`,
        `Option D: Quaternary feature detail #${i + 1}`
      ],
      correctAnswer: `Option A: Primary feature detail #${i + 1}`,
      explanation: `Option A is the correct answer because it directly reflects standard academic guidelines and operational facts regarding ${topic} item #${i + 1}.`
    }))
  };

  const interviewSet = {
    title: `Interview Prep: ${topic}`,
    description: `Placement interview preparation focusing on technical concepts and viva questions for ${topic}.`,
    summary: `### Detailed Explanation
Prepare for technical interview questions on ${topic} by reviewing conceptual foundations, practical design trade-offs, and production implementation details.

### Exam Tips
- **Interview Answers**: When explaining ${topic}, define it clearly in one sentence first. Then provide a real-world project example.
- **Edge Cases**: Be prepared to discuss common errors or system failures related to ${topic}.

### Real-World Examples
- **Production Integration**: Real-world software architectures implement ${topic} in distinct service modules to optimize reliability and decouple dependencies.`,
    keyPoints: studySet.keyPoints.slice(0, 3),
    flashcards: studySet.flashcards.map((f, i) => ({
      id: f.id,
      question: `Common interview question: How does ${topic} relate to concept #${i + 1}?`,
      answer: `Explain that ${topic} addresses this by defining clear parameters for concept #${i + 1}, ensuring write safety and execution safety.`
    })),
    quiz: studySet.quiz
  };

  const revisionSet = {
    title: `One-Minute Revision: ${topic}`,
    description: `A rapid-fire revision sheet summarizing key points and core concepts for ${topic}.`,
    summary: `### Detailed Explanation
Quick revision notes for ${topic} to build core retrieval strength.

### Important Definitions
- **${topic} Core**: The primary operational framework defining this subject.
- **Active Encoding**: Engaging with material actively to store it in long-term memory.
- **Logarithmic Learning**: Focusing on high-yield facts to maximize efficiency.
- **Feynman Review**: Summarizing concepts in simple analogies.
- **Spacing Effect**: Reviewing over intervals to prevent decay.`,
    keyPoints: studySet.keyPoints.slice(0, 4),
    flashcards: studySet.flashcards,
    quiz: studySet.quiz
  };

  return compileSet(studySet, interviewSet, revisionSet);
}
