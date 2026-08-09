import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const root = path.resolve(new URL('.', import.meta.url).pathname, '..');

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);
}

function writeMd(dir: string, slug: string, data: Record<string, any>) {
  const fm = yaml.dump(data, { lineWidth: 1000 });
  const content = `---\n${fm}---\n`;
  fs.writeFileSync(path.join(root, 'src/content', dir, `${slug}.md`), content, 'utf-8');
}

// ---- Courses (from CoursesPage.tsx) ----
const courses = [
  { id: 'c1', title: 'Foundations of Clinical Pure-Tone Audiometry & Calibration', code: 'AUD-501', category: 'Diagnostic Audiology', level: 'Beginner', instructor: 'Dr. Sarah Jenkins, Au.D., CCC-A', modulesCount: 8, duration: '12 Hours', description: 'Comprehensive mastery of ANSI S3.6 pure-tone calibration, air and bone conduction masking, bone-conduction occlusion effects, and soundfield testing.', syllabus: ['Acoustic Calibration & Transducer Types (TDH-39 vs ER-3A)', 'The Hughson-Westlake Threshold Search Protocol', 'Effective Masking & Hood Plateau Method', 'Air-Bone Gap Patterns & Conductive Pathologies'], enrolled: 1420 },
  { id: 'c2', title: 'Auditory Evoked Potentials: ABR Waveform Latency Analysis', code: 'AUD-610', category: 'Electrophysiology', level: 'Advanced', instructor: 'Prof. Marcus Vance, Ph.D.', modulesCount: 12, duration: '18 Hours', description: 'In-depth clinical electrophysiology covering click/tone-burst Auditory Brainstem Response (ABR), Wave I-V identification, interaural latency differences, and retrocochlear lesion detection.', syllabus: ['Neuroanatomy of Evoked Response Generators', 'Electrode Montage & Differential Amplifier Settings', 'Click ABR vs Chirp ABR Threshold Estimation', 'Vestibular Schwannoma Diagnostic Indicators'], enrolled: 980 },
  { id: 'c3', title: 'Pediatric Audiology & Visual Reinforcement Audiometry (VRA)', code: 'AUD-540', category: 'Pediatric Audiology', level: 'Intermediate', instructor: 'Dr. Elena Rostova, Au.D.', modulesCount: 10, duration: '14 Hours', description: 'Behavioral and objective hearing assessment protocols for infants and young children, including Behavioral Observation (BOA), VRA, CPA, and high-frequency tympanometry (1000 Hz tone).', syllabus: ['Developmental Auditory Milestones (0-36 months)', 'VRA Conditioning Mechanics & Habituation Avoidance', 'High-Frequency 1000 Hz Tympanometry in Neonates', 'Newborn Hearing Screening (OAE vs AABR) Follow-Up Protocols'], enrolled: 1150 },
  { id: 'c4', title: 'Hearing Aid Verification & Real Ear Measurement (REM)', code: 'AUD-630', category: 'Amplification', level: 'Intermediate', instructor: 'Dr. David Chen, Au.D.', modulesCount: 9, duration: '15 Hours', description: 'Practical probe-microphone measurement techniques, NAL-NL2 and DSL v5 prescribing targets, maximum power output (MPO) ceiling limits, and speech mapping.', syllabus: ['Probe Tube Insertion Depth & Real-Ear Unaided Gain (REUG)', 'Matching REAR to Prescriptive Targets (NAL-NL2 / DSL v5)', 'Feedback Management & Directional Microphone Calibration', 'Acoustic Coupling: Domes, Venting, and Earmold Mechanics'], enrolled: 1310 },
];
for (const c of courses) { const { id, ...rest } = c; writeMd('courses', id, rest); }

// ---- Teachers (from TeachersPage.tsx) ----
const teachers = [
  { name: 'Dr. Sarah Jenkins, Au.D., CCC-A', role: 'Director of Clinical Audiology Education', institution: 'Johns Hopkins University School of Medicine', specialties: ['Diagnostic Pure-Tone Audiometry', 'Tympanometry & Reflexes', 'Sound Level Calibration'], bio: 'Dr. Jenkins has over 18 years of clinical instruction experience specializing in ANSI audiometric standard compliance, masking protocols, and otosclerosis diagnosis.', publications: 24, email: 'sjenkins@auralis-edu.org', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop' },
  { name: 'Prof. Marcus Vance, Ph.D.', role: 'Chair of Auditory Electrophysiology', institution: 'Northwestern University Center for Hearing Research', specialties: ['Click & Tone-Burst ABR', 'Otoacoustic Emissions (DPOAE)', 'Electrodermal Responses'], bio: 'Pioneer in Auditory Brainstem Response (ABR) wave latency analysis, stack ABR techniques, and early retrocochlear lesion detection in acoustic neuroma patients.', publications: 58, email: 'mvance@auralis-edu.org', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop' },
  { name: 'Dr. Elena Rostova, Au.D.', role: 'Associate Professor of Pediatric Audiology', institution: 'Boston Children’s Hospital & Harvard Medical School', specialties: ['Visual Reinforcement Audiometry (VRA)', 'Conditioned Play Audiometry', 'Infant Hearing Screening'], bio: 'Expert in pediatric behavioral assessment, 1000 Hz high-frequency tympanometry in newborns, and early intervention pathways for congenital hearing loss.', publications: 31, email: 'erostova@auralis-edu.org', image: 'https://images.unsplash.com/photo-1594824813566-88855ce78c4c?q=80&w=300&auto=format&fit=crop' },
  { name: 'Dr. David Chen, Au.D.', role: 'Clinical Professor of Amplification & Vestibular Science', institution: 'Vanderbilt University Medical Center', specialties: ['Real Ear Measurement (REM)', 'NAL-NL2 Targets', 'VNG & Caloric Testing'], bio: 'Focused on objective probe-microphone verification, directional microphone directivity index evaluation, and benign paroxysmal positional vertigo (BPPV) canalith repositioning.', publications: 42, email: 'dchen@auralis-edu.org', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop' },
];
teachers.forEach((t, i) => writeMd('teachers', slugify(t.name) || `teacher-${i + 1}`, t));

// ---- Videos ----
const videos = [
  { id: 'v1', title: 'Video Otoscopy Masterclass: Tympanic Membrane Landmarks & Pathologies', duration: '22:15', author: 'Dr. Sarah Jenkins', category: 'Diagnostic', views: '4,820', description: 'Step-by-step video guide demonstrating proper otoscope bracing technique, identification of the malleus handle, cone of light, pars tensa, and fluid level meniscus in otitis media.', youtubeId: 'L_LUpnjgPso' },
  { id: 'v2', title: 'Auditory Brainstem Response (ABR) Electrode Placement & Wave Calibration', duration: '35:40', author: 'Prof. Marcus Vance', category: 'Electrophysiology', views: '3,210', description: 'Clinical demonstration of skin preparation using NuPrep, Cz vertex and mastoid electrode impedance checking (<3k Ohms), and click ABR Wave I, III, V identification.', youtubeId: 'f2fS4Q0w-nE' },
  { id: 'v3', title: 'Real Ear Measurement (REM) Probe Tube Insertion Depth Demonstration', duration: '18:50', author: 'Dr. David Chen', category: 'Amplification', views: '2,940', description: 'Ensuring 28mm insertion depth from the tragus, avoiding standing wave errors, and running REUG vs REAR curves against NAL-NL2 prescriptive targets.', youtubeId: '3G_L6O9-q4E' },
  { id: 'v4', title: 'Visual Reinforcement Audiometry (VRA) Infant Conditioning Techniques', duration: '26:10', author: 'Dr. Elena Rostova', category: 'Pediatric', views: '2,150', description: 'Clinical video showing 2-assistant VRA testing in soundfield with animated puppet reinforcers, habituation management, and minimum response level (MRL) recording.', youtubeId: '9G_M3K1w1Yk' },
];
for (const v of videos) { const { id, ...rest } = v; writeMd('videos', id, rest); }

// ---- Books ----
const books = [
  { title: 'Handbook of Clinical Audiology (7th Edition)', authors: 'Jack Katz, Ph.D. & Laura Medwetsky', publisher: 'Lippincott Williams & Wilkins', edition: '7th Revised Edition', rating: 4.9, chapters: 48, desc: 'The definitive gold-standard reference text for diagnostic audiology, electrophysiology, acoustic immittance, auditory processing disorders, and hearing aid technology.', topics: ['Diagnostic Audiology', 'Electrophysiology', 'Immittance', 'Amplification'] },
  { title: 'e-ABR Clinical Manual: Auditory Evoked Potentials in Practice', authors: 'James W. Hall III, Ph.D.', publisher: 'Allyn & Bacon Press', edition: '3rd Edition', rating: 4.8, chapters: 28, desc: 'Essential practical handbook for conducting click, tone-burst, and chirp ABRs, bone-conduction ABRs in infants, ASSR, and ECochG.', topics: ['ABR Waveforms', 'ASSR', 'ECochG', 'Retrocochlear'] },
  { title: 'Fundamentals of Hearing: An Introduction to Auditory Perception', authors: 'William A. Yost, Ph.D.', publisher: 'Academic Press / Elsevier', edition: '5th Edition', rating: 4.7, chapters: 22, desc: 'Comprehensive introduction to physical acoustics, middle ear mechanics, basilar membrane travelling waves, neural pitch coding, and binaural sound localization.', topics: ['Acoustics', 'Cochlear Mechanics', 'Pitch Perception', 'Binaural'] },
  { title: 'Pediatric Audiology: Diagnosis, Technology, and Management', authors: 'Jane R. Madell & Carol Flexer', publisher: 'Thieme Medical Publishers', edition: '3rd Edition', rating: 4.9, chapters: 36, desc: 'Complete guide for evaluating hearing loss in infants, children, and teens, featuring early intervention guidelines, educational audiology, and cochlear implants.', topics: ['Pediatric', 'Early Intervention', 'Cochlear Implants', 'Classroom FM'] },
];
books.forEach((b, i) => writeMd('books', slugify(b.title) || `book-${i + 1}`, b));

// ---- Research ----
const research = [
  { title: 'Validation of Speech Intelligent Index (SII) Count-the-Dots Method for Hearing Aid Fitting Outcomes in Noise', journal: 'Journal of the American Academy of Audiology (JAAA)', doi: '10.3766/jaaa.2023.18.4', date: 'May 2024', authors: 'Jenkins S., Chen D., Vance M.', citations: 42, abstract: 'Clinical trial evaluating 180 hearing-impaired adults comparing calculated 1/3 octave SII against aided word recognition in background noise (+5 dB SNR). High correlation (r = 0.89) confirmed for NAL-NL2 verification target matches.' },
  { title: 'Neural Generators of ABR Wave I-V Latencies in Acoustic Neuroma Patients: A Stacked ABR Investigation', journal: 'Ear and Hearing (Official Journal of the AAA)', doi: '10.1097/AUD.0000000000001290', date: 'November 2023', authors: 'Vance M., Miller K.', citations: 89, abstract: 'Investigating small (<1 cm) vestibular schwannomas using derived-band ABR wave alignment. Stacked ABR amplitude reduction below 500 nV exhibited 94% sensitivity compared to gadolinium-enhanced MRI gold standard.' },
  { title: 'Distortion Product Otoacoustic Emissions (DPOAE) High-Frequency Fine-Structure Analysis in Cisplatin Ototoxicity', journal: 'Auditory Neuroscience & Otology International', doi: '10.1159/000528410', date: 'February 2024', authors: 'Rostova E., Jenkins S.', citations: 31, abstract: 'Longitudinal monitoring of pediatric oncology patients undergoing cisplatin therapy using ultra-high frequency DPOAEs (8–16 kHz). OAE amplitude drops preceded pure-tone threshold shifts by an average of 14 days.' },
  { title: 'Cochlear Implant Electrocardiographic Telemetry and ECAP Threshold Mapping for Automated Fitting', journal: 'IEEE Transactions on Biomedical Engineering', doi: '10.1109/TBME.2023.3289011', date: 'August 2023', authors: 'Vance M., Chen D.', citations: 64, abstract: 'Proposing an automated electrically evoked compound action potential (ECAP) neural response telemetry fitting algorithm, reducing clinical programming time by 45% while preserving speech clarity.' },
];
research.forEach((r, i) => writeMd('research', slugify(r.title) || `paper-${i + 1}`, r));

// ---- Announcements ----
const announcements = [
  { date: 'August 12, 2026', badge: 'Conference', title: 'Auralis Annual Global Audiology Virtual Symposium 2026 Announced', summary: 'Join over 4,000 audiologists, ENT surgeons, and hearing scientists for a 3-day virtual summit covering AI in hearing aid fittings, vestibular diagnostic updates, and pediatric genetics.', readTime: '3 min read' },
  { date: 'July 28, 2026', badge: 'Platform Release', title: 'Auralis 3D Cochlear Tonotopic Frequency Map Updated to High Resolution', summary: 'Version 2.4 release introduces interactive basilar membrane mechanical wave simulations from 20 Hz to 20,000 Hz with real-time traveling wave animations.', readTime: '2 min read' },
  { date: 'June 15, 2026', badge: 'Clinical Standards', title: 'Updated AAA Guidelines for Over-The-Counter (OTC) Hearing Aid Verification', summary: 'American Academy of Audiology releases new standard operating procedures regarding self-fitting OTC amplification devices, gain limits, and medical referral red flags.', readTime: '4 min read' },
  { date: 'May 04, 2026', badge: 'Education', title: 'New Clinical Case Batteries Added: Conductive Otosclerosis & Carhart Notch', summary: 'Explore 6 new interactive patient case files with real audiograms, tympanograms, acoustic reflex decay results, and postoperative air-bone gap closure evaluations.', readTime: '2 min read' },
];
announcements.forEach((a, i) => writeMd('announcements', slugify(a.title) || `announcement-${i + 1}`, a));

// ---- Downloads (icon -> iconName string) ----
const downloads = [
  { name: 'ANSI Count-the-Dots Speech Intelligibility Index (SII) Excel Calculator', type: 'Spreadsheet', extension: '.XLSX', size: '1.4 MB', desc: 'Interactive Excel tool for plotting speech spectra against 1/3 octave band audibility dots. Calculates overall SII index (0.00 to 1.00) and predicts speech recognition performance.', iconName: 'FileSpreadsheet' },
  { name: 'Calibrated Pure-Tone Audio Signal Files (125 Hz to 12,000 Hz WAV Tracks)', type: 'Audio Archive', extension: '.ZIP (WAV)', size: '42.8 MB', desc: 'Uncompressed 24-bit 96kHz pure tones, pulsed tones, narrow-band noise, and speech-spectrum noise for soundcard calibration and acoustic experiments.', iconName: 'Music' },
  { name: 'Clinical Patient Intake & Otoscopy Findings Checklist Template', type: 'Document', extension: '.PDF / .DOCX', size: '850 KB', desc: 'Printable medical intake forms including chief complaint history, tinnitus handicap inventory (THI) scoring, and otoscopic red-flag documentation.', iconName: 'FileText' },
  { name: 'RETSPL Sound Pressure Reference Tables (TDH-39, ER-3A, B71 Bone Oscillator)', type: 'Reference Chart', extension: '.PDF', size: '620 KB', desc: 'Reference equivalent threshold sound pressure level charts across couplers (NBS 9-A, IEC 711, 2cc coupler) for converting dB HL to dB SPL.', iconName: 'FileText' },
];
downloads.forEach((d, i) => writeMd('downloads', slugify(d.name) || `download-${i + 1}`, d));

console.log('Migrated', courses.length, 'courses,', teachers.length, 'teachers,', videos.length, 'videos,', books.length, 'books,', research.length, 'research,', announcements.length, 'announcements,', downloads.length, 'downloads.');
