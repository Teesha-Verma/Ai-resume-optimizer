/**
 * Service Layer — Improvement
 *
 * All business logic for improvement suggestions lives here.
 * API calls are attempted first; mock fallback ensures the app never breaks.
 */

import { getImprovementSuggestions } from '../api/improvement';

// ── Mock block variants (moved from Improvement.jsx) ────────────
const MOCK_BLOCKS_POOL = [
  [
    {
      id: 1, type: 'summary',
      original: 'Responsible for managing databases and helping the team with deployments.',
      improved: 'Architected and managed distributed PostgreSQL databases, accelerating deployment times by 40%.',
      status: 'pending'
    },
    {
      id: 2, type: 'experience',
      original: 'Used React to build the frontend. It was good.',
      improved: 'Spearheaded frontend development utilizing React and Redux, delivering a scalable UI architecture to 10,000+ DAU.',
      status: 'pending'
    },
    {
      id: 3, type: 'skills',
      original: 'Skills: JS, HTML, CSS, Git, Docker maybe',
      improved: 'Technical Skills: JavaScript (ES6+), HTML5, CSS3, Git Version Control, Docker Containerization',
      status: 'pending'
    }
  ],
  [
    {
      id: 1, type: 'summary',
      original: 'I am a motivated software engineer looking for new opportunities.',
      improved: 'Results-driven full-stack engineer with 4+ years delivering high-throughput APIs and responsive web applications serving 50K+ users.',
      status: 'pending'
    },
    {
      id: 2, type: 'experience',
      original: 'Worked on backend services in my previous company.',
      improved: 'Designed and optimized RESTful microservices handling 2M+ daily requests with 99.9% uptime across AWS infrastructure.',
      status: 'pending'
    },
    {
      id: 3, type: 'skills',
      original: 'Python, SQL, some cloud stuff',
      improved: 'Core: Python 3.x, PostgreSQL, Redis | Cloud: AWS (EC2, Lambda, S3), Terraform | Tools: GitHub Actions, Datadog',
      status: 'pending'
    }
  ],
];

// ── Helpers ─────────────────────────────────────────────────────
function pickRandom(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Mock Block Generator ────────────────────────────────────────
export const generateMockBlocks = () => {
  return pickRandom(MOCK_BLOCKS_POOL).map(b => ({ ...b }));
};

// ── Fetch improvement blocks — API-first with safe fallback ─────
export const fetchImprovementBlocks = async (analysisId, resumeText) => {
  try {
    const data = await getImprovementSuggestions({ analysisId, resumeText });
    if (data.blocks) {
      return data.blocks.map(b => ({ ...b, status: b.status || 'pending' }));
    }
    // API returned but no blocks → fall through to mock
    throw new Error('API returned empty blocks');
  } catch (err) {
    console.warn('API unavailable – using local mock improvement blocks:', err.message);

    try {
      return generateMockBlocks();
    } catch (fallbackErr) {
      console.error('Mock also failed:', fallbackErr);
      throw new Error('Improvement suggestions completely failed');
    }
  }
};

// ── Generate version score (moved from ResumeContext) ───────────
export const generateVersionMeta = (baseScore) => {
  return (baseScore || 0) + Math.floor(Math.random() * 10) + 5;
};

// ── Section type ordering for realistic resume output ───────────
const SECTION_ORDER = ['summary', 'experience', 'skills'];

// ── Merge accepted changes into final content ───────────────────
export const mergeSelectedChanges = (blocks) => {
  // Sort blocks by section type for realistic resume structure
  const sorted = [...blocks].sort((a, b) => {
    const aIdx = SECTION_ORDER.indexOf(a.type);
    const bIdx = SECTION_ORDER.indexOf(b.type);
    return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
  });

  return sorted
    .map(b => {
      if (b.status === 'accepted') return b.improved;
      return b.original;
    })
    .join('\n\n');
};
