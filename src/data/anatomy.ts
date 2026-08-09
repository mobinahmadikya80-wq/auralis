import { AnatomicalStructure } from '../types';

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  // Outer Ear
  {
    id: 'pinna',
    name: 'Pinna (Auricle)',
    latinName: 'Auricula',
    region: 'outer',
    description: 'The visible external cartilaginous structure of the ear that collects sound waves and channels them into the ear canal.',
    clinicalSignificance: 'Aids in vertical localization and high-frequency spectral filtering (~2-5 kHz resonance peak).',
    pathologyAssociation: ['Microtia', 'Anotia', 'Cauliflower Ear', 'Preauricular Pit'],
    svgCoordinates: { cx: 70, cy: 180, r: 28 },
    position3D: [-3.2, 0.2, 0],
    keyFunctions: [
      'Acoustic sound funneling into external auditory meatus',
      'Spatial localization (front-vs-back discrimination)',
      'Pinna resonance boosts 2000 - 5000 Hz by 5 to 10 dB'
    ]
  },
  {
    id: 'ear_canal',
    name: 'External Auditory Canal',
    latinName: 'Meatus Acusticus Externus',
    region: 'outer',
    description: 'S-shaped canal roughly 2.5 cm long, consisting of outer cartilaginous (ceruminous) and inner osseous portions.',
    clinicalSignificance: 'Quarter-wave resonator with peak acoustic resonance at approximately 2700 - 3000 Hz.',
    pathologyAssociation: ['Otitis Externa (Swimmer Ear)', 'Cerumen Impaction', 'Exostosis (Surfer Ear)', 'Canal Collapse'],
    svgCoordinates: { cx: 140, cy: 180, r: 18 },
    position3D: [-1.8, 0, 0],
    keyFunctions: [
      'Channels sound pressure waves directly to tympanic membrane',
      'Cerumen (earwax) production for antibacterial/fungal protection',
      'Provides ~15 dB acoustic boost around 2.7 kHz'
    ]
  },
  {
    id: 'tympanic_membrane',
    name: 'Tympanic Membrane (Eardrum)',
    latinName: 'Membrana Tympani',
    region: 'outer',
    description: 'A translucent, 3-layered cone-shaped membrane separating the external ear canal from the middle ear cavity.',
    clinicalSignificance: 'Converts acoustic air pressure variations into mechanical vibration of ossicular chain.',
    pathologyAssociation: ['Tympanic Membrane Perforation', 'Bullous Myringitis', 'Tympanosclerosis', 'Retraction Pockets'],
    svgCoordinates: { cx: 200, cy: 180, r: 16 },
    position3D: [-0.6, 0, 0],
    keyFunctions: [
      'Pars tensa (4/5th lower stiff area) vibrates mechanically',
      'Pars flaccida (Shrapnell membrane) upper flexible area',
      'Areal ratio transformation (55 mm² effective area to 3.2 mm² stapes footplate)'
    ]
  },

  // Middle Ear
  {
    id: 'malleus',
    name: 'Malleus (Hammer)',
    latinName: 'Malleus',
    region: 'middle',
    description: 'The largest ossicle, attached directly to the umbo of the tympanic membrane via its manubrium (handle).',
    clinicalSignificance: 'Forms the first mechanical lever link in impedance matching.',
    pathologyAssociation: ['Ossicular Discontinuity', 'Malleus Head Fixation', 'Glomus Tumor Pressure'],
    svgCoordinates: { cx: 240, cy: 155, r: 14 },
    position3D: [-0.2, 0.3, 0.1],
    keyFunctions: [
      'Manubrium moves inward/outward with eardrum displacement',
      'Transfers kinetic energy to the incus via incudomalleolar joint'
    ]
  },
  {
    id: 'incus',
    name: 'Incus (Anvil)',
    latinName: 'Incus',
    region: 'middle',
    description: 'The middle ossicle featuring a body, short process, and long process ending in the lenticular process.',
    clinicalSignificance: 'Lever ratio between malleus manubrium and incus long process provides ~1.3:1 mechanical advantage.',
    pathologyAssociation: ['Incus Necrosis / Erosion (Post-Otitis)', 'Ossicular Disarticulation'],
    svgCoordinates: { cx: 270, cy: 150, r: 14 },
    position3D: [0.2, 0.2, 0],
    keyFunctions: [
      'Acts as a pivotal fulcrum in ossicular movement',
      'Connects malleus to stapes head'
    ]
  },
  {
    id: 'stapes',
    name: 'Stapes (Stirrup)',
    latinName: 'Stapes',
    region: 'middle',
    description: 'The smallest bone in the human body, consisting of a head, anterior/posterior crura, and footplate.',
    clinicalSignificance: 'Footplate sits in the oval window of the cochlea, delivering mechanical fluid displacement.',
    pathologyAssociation: ['Otosclerosis (Footplate Fixation)', 'Stapedial Reflex Absence', 'Stapedectomy/Stapedotomy'],
    svgCoordinates: { cx: 305, cy: 160, r: 12 },
    position3D: [0.6, 0.1, 0],
    keyFunctions: [
      'Piston-like motion into oval window creates perilymph fluid waves',
      'Stapedius muscle contracts during loud noise (>80 dB SL) to protect inner ear'
    ]
  },
  {
    id: 'eustachian_tube',
    name: 'Eustachian Tube',
    latinName: 'Tuba Auditiva',
    region: 'middle',
    description: 'Canal connecting the middle ear cavity to the nasopharynx, opened by Tensor Veli Palatini muscle.',
    clinicalSignificance: 'Equalizes middle ear pressure with atmospheric pressure and drains secretions.',
    pathologyAssociation: ['Eustachian Tube Dysfunction (ETD)', 'Patulous Eustachian Tube', 'Otitis Media with Effusion'],
    svgCoordinates: { cx: 250, cy: 230, r: 16 },
    position3D: [-0.2, -1.2, 0],
    keyFunctions: [
      'Pressure equalization (Type A tympanometry maintained when functional)',
      'Mucociliary clearance into nasopharynx'
    ]
  },

  // Inner Ear
  {
    id: 'cochlea',
    name: 'Cochlea',
    latinName: 'Cochlea',
    region: 'inner',
    description: 'Snail-shell shaped spiral fluid-filled structure making 2.5 to 2.75 turns around the central modiolus.',
    clinicalSignificance: 'Contains the Organ of Corti, sensory transduction apparatus for hearing.',
    pathologyAssociation: ['SensoriNeural Hearing Loss', 'Presbycusis', 'Cochlear Otosclerosis', 'Meniere Disease (Endolymphatic Hydrops)'],
    svgCoordinates: { cx: 370, cy: 185, r: 26 },
    position3D: [1.3, -0.2, 0.2],
    keyFunctions: [
      'Houses 3 compartments: Scala Vestibuli (Perilymph), Scala Media (Endolymph +80mV), Scala Tympani (Perilymph)',
      'Tonotopic organization: Base = High Frequencies (20,000 Hz), Apex = Low Frequencies (20 Hz)'
    ]
  },
  {
    id: 'organ_of_corti',
    name: 'Organ of Corti & Hair Cells',
    latinName: 'Organum Spirale',
    region: 'inner',
    description: 'Sensory epithelial structure sitting on the basilar membrane containing ~3,500 Inner Hair Cells (IHCs) and ~12,000 Outer Hair Cells (OHCs).',
    clinicalSignificance: 'OHCs provide cochlear amplification via electromotility (Prestin protein); IHCs release glutamate to auditory nerve fibers.',
    pathologyAssociation: ['Ototoxicity (Gentamicin, Cisplatin)', 'Noise-Induced Hearing Loss (Hair Cell Loss)', 'OAE Loss'],
    svgCoordinates: { cx: 400, cy: 220, r: 18 },
    position3D: [1.5, -0.6, 0.4],
    keyFunctions: [
      'OHCs tune frequency sharpness and amplify soft sounds by ~40-50 dB',
      'IHC stereocilia deflection opens MET (Mechanically-Gated) channels'
    ]
  },
  {
    id: 'semicircular_canals',
    name: 'Semicircular Canals & Vestibule',
    latinName: 'Canales Semicirculares',
    region: 'inner',
    description: 'Three orthogonal fluid-filled canals (Anterior, Posterior, Horizontal) sensing angular acceleration of the head.',
    clinicalSignificance: 'Core sensory organ of the Vestibulo-Ocular Reflex (VOR) and dynamic balance balance system.',
    pathologyAssociation: ['BPPV (Benign Paroxysmal Positional Vertigo)', 'Vestibular Neuritis', 'Labyrinthitis'],
    svgCoordinates: { cx: 370, cy: 120, r: 22 },
    position3D: [1.2, 1.2, -0.2],
    keyFunctions: [
      'Ampulla crista ampullaris cupula deflection detects head rotation',
      'Drives VOR to stabilize gaze during head movement'
    ]
  },

  // Neural Pathway
  {
    id: 'auditory_nerve',
    name: 'Auditory Nerve (CN VIII)',
    latinName: 'Nervus Vestibulocochlearis',
    region: 'neural',
    description: 'Cranial nerve VIII containing ~30,000 bipolar spiral ganglion neurons projecting through the internal auditory canal.',
    clinicalSignificance: 'Generates Wave I and Wave II of the Auditory Brainstem Response (ABR).',
    pathologyAssociation: ['Acoustic Neuroma / Vestibular Schwannoma', 'Auditory Neuropathy Spectrum Disorder (ANSD)'],
    svgCoordinates: { cx: 460, cy: 185, r: 16 },
    position3D: [2.5, 0.2, -0.2],
    keyFunctions: [
      'Transmits phase-locked neural action potentials to the cochlear nucleus',
      'Wave I (distal nerve) & Wave II (proximal nerve) on ABR'
    ]
  },
  {
    id: 'central_auditory_pathway',
    name: 'Central Auditory Brainstem & Cortex',
    latinName: 'Systema Auditorium Centrale',
    region: 'neural',
    description: 'Ascending auditory pathway: Cochlear Nucleus -> Superior Olivary Complex (Binaural Localization) -> Inferior Colliculus -> Medial Geniculate Body -> Primary Auditory Cortex (A1, Heschl Gyri).',
    clinicalSignificance: 'Processes binaural timing differences (ITD/ILD), speech in noise, and complex auditory cues.',
    pathologyAssociation: ['Central Auditory Processing Disorder (CAPD)', 'Auditory Cortex Infarct', 'ABR Wave Latency Delay'],
    svgCoordinates: { cx: 520, cy: 140, r: 24 },
    position3D: [3.6, 0.6, -0.5],
    keyFunctions: [
      'Superior Olivary Complex (Wave IV) calculates Interaural Time & Intensity Differences',
      'Inferior Colliculus (Wave V) integrates spectral & spatial cues',
      'A1 Temporal Lobe interprets phonemes and language acoustics'
    ]
  }
];

export const COCHLEAR_TONOTOPIC_MAP = [
  { freq: 16000, regionName: 'Cochlear Base (High Freq)', description: 'Stiff, light basilar membrane vibrating to high pitch sounds. First damaged by aminoglycosides & aging.', color: '#ef4444' },
  { freq: 8000, regionName: 'Upper Base (8,000 Hz)', description: 'Crucial for high-frequency consonant acoustics (/s/, /th/, /f/). Primary region for noise notches.', color: '#f97316' },
  { freq: 4000, regionName: 'Mid-Base (4,000 Hz)', description: 'Peak acoustic vulnerability region for acoustic trauma (industrial noise, gunshots).', color: '#f59e0b' },
  { freq: 2000, regionName: 'Mid-Turn (2,000 Hz)', description: 'Essential speech clarity zone for formant transitions and vowel recognition.', color: '#10b981' },
  { freq: 1000, regionName: 'Mid-Apex (1,000 Hz)', description: 'Vowel fundamental and lower formant resonance zone.', color: '#06b6d4' },
  { freq: 500, regionName: 'Upper Apex (500 Hz)', description: 'Low frequency bass tone zone. Affected in early Meniere disease (endolymphatic hydrops).', color: '#3b82f6' },
  { freq: 250, regionName: 'Helicotrema Apex (250 Hz)', description: 'Apex tip where basilar membrane is widest and most flexible. Resonates to deep bass frequencies.', color: '#8b5cf6' }
];
