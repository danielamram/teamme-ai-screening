import {
  Briefcase,
  CheckCircle2,
  ThumbsUp,
  TriangleAlert,
  User,
} from 'lucide-react';
import { JSX } from 'react';

import { useCandidateData } from '@/hooks/useCandidateData';

import {
  ANALYSIS_COLORS,
  AnalysisListSection,
  CandidateDetailEmpty,
  CandidateDetailHeader,
  CandidateDetailLoading,
  CandidateProfileCard,
  CandidateStatsGrid,
  EXTENDED_COLORS,
  getAvatarGradient,
  getScoreColor,
  RecommendationBanner,
  SectionContainer,
  SkillsSection,
} from './detail';
import { CHAT_COLORS } from './types';

interface CandidateDetailViewProps {
  candidateId: string;
  onBack: () => void;
}

export default function CandidateDetailView({
  candidateId,
  onBack,
}: CandidateDetailViewProps): JSX.Element {
  const { candidate, loading } = useCandidateData({ candidateId });

  if (loading) {
    return <CandidateDetailLoading onBack={onBack} />;
  }

  if (!candidate) {
    return <CandidateDetailEmpty onBack={onBack} />;
  }

  const candidateName = candidate.name;
  const [gradientStart, gradientEnd] = getAvatarGradient(candidateName);
  const scoreColor = getScoreColor(candidate.detailed_summary.score);

  return (
    <div
      className='flex h-full flex-col'
      style={{ backgroundColor: CHAT_COLORS.surface }}
    >
      {/* Sticky Header */}
      <CandidateDetailHeader
        candidateName={candidateName}
        score={candidate.detailed_summary.score}
        scoreColor={scoreColor}
        onBack={onBack}
      />

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto overflow-x-hidden px-4 py-6'>
        <div className='mx-auto max-w-2xl space-y-6'>
          {/* Profile Header Card */}
          <CandidateProfileCard
            candidateName={candidateName}
            location={candidate.location ?? undefined}
            applicationDate={candidate.application_date ?? undefined}
            email={candidate.email ?? undefined}
            phone={candidate.phone ?? undefined}
            linkedinUrl={candidate.linkedin_url ?? undefined}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
          />

          {/* Quick Stats Grid */}
          <CandidateStatsGrid
            yearsOfExperience={candidate.detailed_summary.yearsOfExperience}
            educationSummary={candidate.detailed_summary.educationSummary}
          />

          {/* Recommendation Banner */}
          {candidate.detailed_summary.recommendation && (
            <RecommendationBanner
              recommendation={candidate.detailed_summary.recommendation}
            />
          )}

          {/* Overview Section */}
          {candidate.detailed_summary.overview && (
            <SectionContainer
              icon={<User size={14} />}
              title='Professional Overview'
            >
              <p
                className='text-sm leading-relaxed'
                style={{ color: EXTENDED_COLORS.slate[700] }}
              >
                {candidate.detailed_summary.overview}
              </p>
            </SectionContainer>
          )}

          {/* Skills Section */}
          {candidate.detailed_summary.keySkills &&
            candidate.detailed_summary.keySkills.length > 0 && (
              <SkillsSection skills={candidate.detailed_summary.keySkills} />
            )}

          {/* Detailed Experience */}
          {candidate.detailed_summary.experienceSummary && (
            <SectionContainer
              icon={<Briefcase size={14} />}
              title='Work History'
            >
              <p
                className='text-sm leading-relaxed'
                style={{ color: EXTENDED_COLORS.slate[700] }}
              >
                {candidate.detailed_summary.experienceSummary}
              </p>
            </SectionContainer>
          )}

          {/* Analysis Grid */}
          <div className='grid grid-cols-1 gap-5'>
            {/* Strengths */}
            {candidate.detailed_summary.strengths &&
              candidate.detailed_summary.strengths.length > 0 && (
                <AnalysisListSection
                  title='Key Strengths'
                  items={candidate.detailed_summary.strengths}
                  icon={<CheckCircle2 size={14} strokeWidth={2.5} />}
                  iconColor={ANALYSIS_COLORS.strengths.icon}
                  iconBgColor={ANALYSIS_COLORS.strengths.iconBg}
                  titleColor={ANALYSIS_COLORS.strengths.title}
                  borderColor={ANALYSIS_COLORS.strengths.border}
                  backgroundColor={ANALYSIS_COLORS.strengths.background}
                />
              )}

            {/* Concerns */}
            {candidate.detailed_summary.potentialConcerns &&
              candidate.detailed_summary.potentialConcerns.length > 0 && (
                <AnalysisListSection
                  title='Potential Concerns'
                  items={candidate.detailed_summary.potentialConcerns}
                  icon={<TriangleAlert size={14} strokeWidth={2.5} />}
                  iconColor={ANALYSIS_COLORS.concerns.icon}
                  iconBgColor={ANALYSIS_COLORS.concerns.iconBg}
                  titleColor={ANALYSIS_COLORS.concerns.title}
                  borderColor={ANALYSIS_COLORS.concerns.border}
                  backgroundColor={ANALYSIS_COLORS.concerns.background}
                />
              )}

            {/* Culture Fit */}
            {candidate.detailed_summary.cultureFitIndicators &&
              candidate.detailed_summary.cultureFitIndicators.length > 0 && (
                <AnalysisListSection
                  title='Culture Alignment'
                  items={candidate.detailed_summary.cultureFitIndicators}
                  icon={<ThumbsUp size={14} strokeWidth={2.5} />}
                  iconColor={ANALYSIS_COLORS.cultureFit.icon}
                  iconBgColor={ANALYSIS_COLORS.cultureFit.iconBg}
                  titleColor={ANALYSIS_COLORS.cultureFit.title}
                  borderColor={ANALYSIS_COLORS.cultureFit.border}
                  backgroundColor={ANALYSIS_COLORS.cultureFit.background}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
