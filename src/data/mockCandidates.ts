import type { Candidate } from '@/types/candidate';

export const candidates: Candidate[] = [
  {
    id: '52483089',
    name: 'Thomas Iqbal',
    position: 'AI Engineer',
    company: 'iStreamSolution',
    location: 'Brooklyn, New York',
    score: 35,
    whyFit: [
      '5+ years of experience designing, developing, and deploying ML/DL models in production with strong technical expertise in NLP pipelines, transformer models (BERT, GPT), LLM fine-tuning, computer vision, and cloud platforms (AWS Sagemaker, Azure ML, GCP). Successfully deployed multiple production systems including real-time chatbots and computer vision models using MLOps tools (Docker, Kubernetes, FastAPI, MLflow).',
    ],
    recommendation: {
      level: 'pass',
    },
    recommendationReasoning:
      'Thomas is a pass for the BDR role because his entire background is in technical AI/ML engineering rather than business development or sales. While he has deep technical expertise, he lacks B2B sales experience, digital outreach skills, CRM platform experience, and knowledge of the security & compliance domain required for this role. His skills are better suited for technical engineering positions.',
    redFlags: [
      'No B2B sales or business development experience - entire career focused on technical engineering roles. Location mismatch - based in Brooklyn, NY rather than required Southwest region (Colorado, Arizona, or Utah). No experience with security & compliance domain or GRC compliance. No demonstrated experience with CRM platforms (Salesforce, Hubspot, etc.) or Sales Engagement tools (Outreach, ZoomInfo). No evidence of client-facing communication, negotiation, or lead generation activities.',
    ],
    gapsToClarify: [
      'Willingness to relocate to Colorado, Arizona, or Utah. Interest in transitioning from technical engineering to sales/business development role. Any informal sales or client engagement experience not captured on resume.',
    ],
  },
  {
    id: '52482601',
    name: 'Josh White',
    position: 'Investor Relations Executive',
    company: 'Prism Ventures LLC',
    location: 'Austin, TX',
    score: 84,
    whyFit: [
      'Extensive B2B sales and business development experience across multiple roles including Financial Advisor at Northwestern Mutual (100+ outbound calls daily, 5-7 client meetings/day), Account Executive at RiCOMA ($4M in sales), and various capital raising positions. Proven track record in client acquisition, relationship management, and stakeholder engagement with high-net-worth individuals and institutional investors. Experience with CRM platforms (Salesforce mentioned in skills), strong negotiation skills, and success in SaaS/technology sectors through capital raising work with multiple tech startups.',
    ],
    recommendation: {
      level: 'strong-hire',
    },
    recommendationReasoning:
      'Josh is a consider hire because he has strong B2B sales experience, proven client engagement skills, and familiarity with SaaS environments through his capital raising work. His high-volume outbound calling experience (100+/day at Northwestern Mutual) and consistent track record of relationship building align well with BDR requirements. However, he lacks specific experience in the security & compliance domain and is based in Austin, TX rather than the required Southwest region.',
    redFlags: [
      'Location mismatch - based in Austin, TX rather than required Colorado, Arizona, or Utah. No direct experience in security & compliance or GRC domain. Most recent roles focused on investor relations and capital raising rather than traditional BDR/SDR lead generation.',
    ],
    gapsToClarify: [
      'Willingness to relocate to Colorado, Arizona, or Utah or work remotely from Austin. Specific hands-on experience with modern Sales Engagement platforms like Outreach, ZoomInfo, or Hubspot. Interest in transitioning from investor relations to BDR role focused on lead generation. Any exposure to security, compliance, or GRC topics through previous work with portfolio companies.',
    ],
  },
  {
    id: '52482701',
    name: 'Lisa Schaufelberger',
    position: 'Outreach Specialist Supervisor, SDR',
    company: 'Hover Networks',
    location: 'Spring, TX',
    score: 73,
    whyFit: [
      'Over 20 years of B2B sales experience with extensive BDR/SDR background including 6+ years as Outreach Specialist Supervisor at Hover Networks (SaaS cloud phone services) where she led inside sales operations, executed cold calling, warm lead generation, appointment setting, and supervised a team of 2-4 SDRs. Proven expertise with multiple CRM platforms including HubSpot, Salesforce, Encompass, and Pipedrive (10+ years experience). Strong communication and negotiation skills demonstrated through consistent high-volume outbound calling, digital engagement via LinkedIn, and award-winning performance (MVP award, top lead producer). Experience spans both B2B SaaS startups and enterprise sales environments with demonstrated ability to articulate value propositions and generate qualified leads.',
    ],
    recommendation: {
      level: 'consider',
    },
    recommendationReasoning:
      'Lisa is a strong hire because she has direct, extensive BDR/SDR experience in B2B SaaS environments with proven success in lead generation, cold calling, appointment setting, and CRM management. Her 6+ years at Hover Networks demonstrates deep expertise in the exact role requirements, and her mastery of HubSpot, Salesforce, and Sales Engagement platforms (LinkedIn, ZoomInfo) aligns perfectly with the position. Her supervisory experience shows leadership capability and process orientation. The main consideration is her location in Spring, TX rather than the Southwest region, though her proven remote work experience mitigates this concern.',
    redFlags: [
      'Location in Spring, TX rather than required Colorado, Arizona, or Utah (though she has extensive remote work experience). No direct experience in security & compliance or GRC domain.',
    ],
    gapsToClarify: [
      'Willingness to relocate to Colorado, Arizona, or Utah or ability to work remotely from Texas. Any familiarity with security, compliance, or GRC concepts through previous clients or self-study. Current employment status and availability (resume shows current role starting March 2025 which may be an error given current date is November 2025).',
    ],
  },
];

export function getCandidateById(id: string): Candidate | undefined {
  return candidates.find((candidate) => candidate.id === id);
}

export function getDefaultCandidate(): Candidate {
  return candidates[0];
}
