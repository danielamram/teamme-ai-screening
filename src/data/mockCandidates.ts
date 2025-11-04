import type { Candidate, CandidateProfile } from '@/types/candidate';

const excellentCandidate: Candidate = {
  id: 'cand-001',
  name: 'Sarah Chen',
  position: 'Senior Full-Stack Engineer',
  appliedDate: '2025-11-01',
  score: {
    overall: 87,
    skills: 92,
    experience: 85,
    education: 84,
  },
  strengths: [
    {
      id: 's1',
      text: 'Expert in React, TypeScript, and Node.js with 6+ years of production experience',
    },
    {
      id: 's2',
      text: 'Led development of 3 major product launches at Fortune 500 companies',
    },
    {
      id: 's3',
      text: 'Strong system design skills with experience in microservices architecture',
    },
    {
      id: 's4',
      text: 'Active open-source contributor with 2.5K+ GitHub stars across projects',
    },
    {
      id: 's5',
      text: 'Excellent communication skills and proven mentorship track record',
    },
  ],
  weaknesses: [
    {
      id: 'w1',
      text: 'Limited experience with Python backend frameworks',
    },
    {
      id: 'w2',
      text: 'No direct experience with our specific CI/CD toolchain (Jenkins)',
    },
  ],
  recommendation: {
    level: 'strong-hire',
    reasoning:
      'Sarah is an exceptional candidate with outstanding technical skills, proven leadership experience, and a strong cultural fit. Her expertise in modern web technologies directly aligns with our stack, and her track record of delivering complex projects demonstrates reliability and excellence.',
    confidenceScore: 94,
  },
  metrics: {
    skills: {
      label: 'Technical Skills',
      value: 92,
      maxValue: 100,
      description: 'Expert-level proficiency in required technologies',
    },
    experience: {
      label: 'Experience Level',
      value: 85,
      maxValue: 100,
      description: '6+ years in senior engineering roles',
    },
    education: {
      label: 'Education',
      value: 84,
      maxValue: 100,
      description: 'MS Computer Science from top-tier university',
    },
  },
};

const moderateCandidate: Candidate = {
  id: 'cand-002',
  name: 'Marcus Johnson',
  position: 'Mid-Level Software Engineer',
  appliedDate: '2025-10-28',
  score: {
    overall: 66,
    skills: 68,
    experience: 62,
    education: 70,
  },
  strengths: [
    {
      id: 's1',
      text: 'Solid foundation in JavaScript and React with 3 years experience',
    },
    {
      id: 's2',
      text: 'Quick learner with demonstrated ability to pick up new technologies',
    },
    {
      id: 's3',
      text: 'Good problem-solving skills shown in technical assessment',
    },
    {
      id: 's4',
      text: 'Strong eagerness to grow and positive attitude',
    },
  ],
  weaknesses: [
    {
      id: 'w1',
      text: 'Limited experience with TypeScript and testing frameworks',
    },
    {
      id: 'w2',
      text: 'No experience leading projects or mentoring junior developers',
    },
    {
      id: 'w3',
      text: 'Resume shows job-hopping with 3 positions in 3 years',
    },
    {
      id: 'w4',
      text: 'Lacks experience with cloud infrastructure (AWS/GCP/Azure)',
    },
  ],
  recommendation: {
    level: 'consider',
    reasoning:
      'Marcus shows promise with a solid technical foundation and enthusiasm for learning. However, he lacks depth in several key areas we prioritize. Consider for a more junior role or if willing to invest in training. Cultural fit assessment recommended before making final decision.',
    confidenceScore: 68,
  },
  metrics: {
    skills: {
      label: 'Technical Skills',
      value: 68,
      maxValue: 100,
      description: 'Adequate skills but gaps in key areas',
    },
    experience: {
      label: 'Experience Level',
      value: 62,
      maxValue: 100,
      description: '3 years with mixed responsibilities',
    },
    education: {
      label: 'Education',
      value: 70,
      maxValue: 100,
      description: 'BS Computer Science from accredited university',
    },
  },
};

const poorCandidate: Candidate = {
  id: 'cand-003',
  name: 'David Martinez',
  position: 'Software Engineer',
  appliedDate: '2025-10-25',
  score: {
    overall: 43,
    skills: 38,
    experience: 45,
    education: 48,
  },
  strengths: [
    {
      id: 's1',
      text: 'Basic understanding of web development fundamentals',
    },
    {
      id: 's2',
      text: 'Completed bootcamp and shows motivation to enter tech',
    },
  ],
  weaknesses: [
    {
      id: 'w1',
      text: 'Very limited production experience (6 months total)',
    },
    {
      id: 'w2',
      text: 'No experience with React, TypeScript, or modern frameworks',
    },
    {
      id: 'w3',
      text: 'Struggled significantly with technical assessment (32% score)',
    },
    {
      id: 'w4',
      text: 'Resume shows primarily HTML/CSS work with minimal JavaScript',
    },
    {
      id: 'w5',
      text: 'No understanding of version control workflows or CI/CD',
    },
    {
      id: 'w6',
      text: 'Skills gap too large for the senior-level position requirements',
    },
  ],
  recommendation: {
    level: 'pass',
    reasoning:
      'David is in the early stages of his career and lacks the experience and technical depth required for this role. The skills gap is substantial and would require extensive training. Recommend passing and suggesting he gain more experience before reapplying, or consider for an entry-level/internship role if available.',
    confidenceScore: 89,
  },
  metrics: {
    skills: {
      label: 'Technical Skills',
      value: 38,
      maxValue: 100,
      description: 'Significant gaps in required technologies',
    },
    experience: {
      label: 'Experience Level',
      value: 45,
      maxValue: 100,
      description: 'Less than 1 year relevant experience',
    },
    education: {
      label: 'Education',
      value: 48,
      maxValue: 100,
      description: 'Coding bootcamp graduate',
    },
  },
};

export const mockCandidates: Candidate[] = [
  excellentCandidate,
  moderateCandidate,
  poorCandidate,
];

export const mockCandidateProfiles: CandidateProfile[] = mockCandidates.map(
  (candidate) => ({
    candidate,
    analysisDate: new Date().toISOString(),
    version: '1.0.0',
  })
);

export function getCandidateById(id: string): Candidate | undefined {
  return mockCandidates.find((candidate) => candidate.id === id);
}

export function getDefaultCandidate(): Candidate {
  return excellentCandidate;
}
