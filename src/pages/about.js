import React from 'react'
import {Link} from 'gatsby'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import Layout from 'components/layout'
import SEO from 'components/seo'
import Container from 'components/container'
import theme from '../../config/theme'
import {bpMaxSM, bpMaxMD} from '../lib/breakpoints'

/* ── Icons ──────────────────────────────────────────────────────────────── */
const IconGithub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const IconMapPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconBriefcase = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
)

/* ── Styled components ──────────────────────────────────────────────────── */
const Hero = styled.section`
  background: ${theme.colors.dark};
  padding: 64px 0 56px;
  ${bpMaxSM} { padding: 48px 0 40px; }
`

const HeroInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  ${bpMaxMD} { flex-direction: column; gap: 28px; }
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${theme.radii.lg};
  background: ${theme.colors.orangeDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  letter-spacing: -0.02em;
  ${bpMaxSM} { width: 72px; height: 72px; font-size: 1.75rem; }
`

const HeroText = styled.div`
  flex: 1;
`

const HeroName = styled.h1`
  color: ${theme.colors.white};
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 6px;
  ${bpMaxSM} { font-size: 1.75rem; }
`

const HeroTitle = styled.p`
  color: ${theme.colors.orange};
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 16px;
`

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8125rem;
  color: ${theme.colors.textSubtle};
`

const HeroBio = styled.p`
  color: rgba(148, 163, 184, 0.85);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 0 24px;
  max-width: 560px;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const SocialBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${theme.radii.default};
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${theme.colors.textSubtle};
  background: rgba(255, 255, 255, 0.05);
  transition: all 120ms ease;
  text-decoration: none;
  &:hover {
    border-color: ${theme.colors.orange};
    color: ${theme.colors.orange};
    background: rgba(253, 186, 116, 0.08);
  }
`

const PageBody = styled.div`
  background: ${theme.colors.bg};
  padding: 64px 0 80px;
  ${bpMaxSM} { padding: 48px 0 60px; }
`

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  ${bpMaxMD} { grid-template-columns: 1fr; }
`

const Section = styled.section`
  margin-bottom: 56px;
`

const SectionTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.textSubtle};
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${theme.colors.border};
`

const Card = styled.div`
  background: ${theme.colors.white};
  border: 1.5px solid ${theme.colors.border};
  border-radius: ${theme.radii.lg};
  padding: 24px;
`

/* Skills grid */
const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Skill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: ${theme.radii.full};
  font-size: 0.8125rem;
  font-weight: 500;
  background: ${p => p.primary ? 'rgba(234, 88, 12, 0.1)' : theme.colors.surfaceAlt};
  color: ${p => p.primary ? theme.colors.orangeDark : theme.colors.textMuted};
  border: 1px solid ${p => p.primary ? 'rgba(234, 88, 12, 0.2)' : 'transparent'};
`

/* Timeline */
const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const TimelineItem = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 28px;
  position: relative;
  &:last-child { padding-bottom: 0; }
  &:last-child .line { display: none; }
`

const TimelineDot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.current ? theme.colors.orangeDark : theme.colors.border};
  border: 2px solid ${p => p.current ? theme.colors.orangeDark : theme.colors.border};
  margin-top: 4px;
  flex-shrink: 0;
`

const Line = styled.div`
  width: 1px;
  flex: 1;
  background: ${theme.colors.border};
  margin-top: 6px;
  min-height: 20px;
`

const TimelineContent = styled.div`
  flex: 1;
  padding-bottom: 4px;
`

const TimelineRole = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0 0 2px;
`

const TimelineCompany = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.orangeDark};
  font-weight: 500;
  margin: 0 0 4px;
`

const TimelinePeriod = styled.p`
  font-size: 0.75rem;
  color: ${theme.colors.textSubtle};
  font-family: ${theme.fonts.mono};
  margin: 0 0 6px;
`

const TimelineDesc = styled.p`
  font-size: 0.8125rem;
  color: ${theme.colors.textMuted};
  line-height: 1.55;
  margin: 0;
`

/* OSS contributions */
const OSSItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid ${theme.colors.border};
  text-decoration: none;
  &:last-child { border-bottom: none; }
  &:hover .oss-name { color: ${theme.colors.orangeDark}; }
`

const OSSName = styled.span`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${theme.colors.text};
  transition: color 100ms;
`

const OSSDesc = styled.span`
  font-size: 0.8125rem;
  color: ${theme.colors.textMuted};
`

const OSSArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#94a3b8', flexShrink: 0}}>
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
)

/* Contact */
const ContactCard = styled.div`
  background: ${theme.colors.dark};
  border-radius: ${theme.radii.lg};
  padding: 40px;
  text-align: center;
  ${bpMaxSM} { padding: 28px 20px; }
`

const ContactTitle = styled.h3`
  color: ${theme.colors.white};
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
`

const ContactSub = styled.p`
  color: ${theme.colors.textSubtle};
  font-size: 0.875rem;
  margin: 0 0 24px;
  line-height: 1.6;
`

const ContactBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: ${theme.colors.orangeDark};
  color: white;
  border-radius: ${theme.radii.default};
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 120ms ease;
  &:hover { background: #c2410c; color: white; }
`

/* ── Data ───────────────────────────────────────────────────────────────── */
const SKILLS_PRIMARY = ['PHP', 'Laravel', 'Magento', 'WordPress', 'Vue.js']
const SKILLS_SECONDARY = ['TailwindCSS', 'React', 'MySQL', 'Redis', 'Docker', 'AWS', 'Ansible', 'Kubernetes', 'Nginx', 'Linux']

const EXPERIENCE = [
  {
    role: 'Engineering Manager',
    company: 'Japanese Company (ORO)',
    period: '2019 – Present',
    current: true,
    desc: 'Lead a team of ~15 developers across 6 branches in Asia. Focus on digital transformation, PHP/Laravel/Magento projects, and growing developer careers.',
  },
  {
    role: 'Senior Developer',
    company: 'Gianty',
    period: '2016 – 2019',
    current: false,
    desc: 'Full-stack development with PHP and frontend technologies. Delivered multiple client projects and ecommerce solutions.',
  },
  {
    role: 'Software Developer',
    company: 'VietNamWorks',
    period: '2013 – 2016',
    current: false,
    desc: 'Developed and maintained job portal features serving millions of users.',
  },
  {
    role: 'Developer',
    company: 'ICare Benefits · PRECITA',
    period: '2009 – 2013',
    current: false,
    desc: 'Started professional career in software development. Built web applications and business systems.',
  },
]

const OSS_CONTRIBUTIONS = [
  {
    name: 'Mattermost',
    desc: 'Open-source messaging platform',
    url: 'https://mattermost.org/',
  },
  {
    name: 'Magento PWA Studio',
    desc: 'Progressive Web App toolkit for Magento',
    url: 'https://magento.github.io/pwa-studio/',
  },
]

/* ── Component ──────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <Layout>
      <SEO
        frontmatter={{
          title: 'About Khoa Le',
          description: 'Engineering Manager, software developer, and technology enthusiast based in Vietnam.',
        }}
      />

      {/* Hero */}
      <Hero>
        <Container maxWidth={800}>
          <HeroInner>
            <Avatar>KL</Avatar>
            <HeroText>
              <HeroName>Khoa Le</HeroName>
              <HeroTitle>Engineering Manager · Software Developer</HeroTitle>

              <HeroMeta>
                <MetaItem>
                  <IconMapPin />
                  Vietnam
                </MetaItem>
                <MetaItem>
                  <IconBriefcase />
                  15+ years experience
                </MetaItem>
              </HeroMeta>

              <HeroBio>
                I build software and lead engineering teams. Currently managing
                ~15 developers across 6 branches in Asia, focusing on digital
                transformation with PHP, Laravel, Magento, and modern frontend
                stacks. I love working on cutting-edge tech and building products
                that help people.
              </HeroBio>

              <SocialLinks>
                <SocialBtn href="https://github.com/khoa-le/" target="_blank" rel="noopener noreferrer">
                  <IconGithub /> GitHub
                </SocialBtn>
                <SocialBtn href="https://www.linkedin.com/in/khoaln/" target="_blank" rel="noopener noreferrer">
                  <IconLinkedIn /> LinkedIn
                </SocialBtn>
                <SocialBtn href="mailto:khoaln6@gmail.com">
                  <IconMail /> Email
                </SocialBtn>
              </SocialLinks>
            </HeroText>
          </HeroInner>
        </Container>
      </Hero>

      {/* Body */}
      <PageBody>
        <Container maxWidth={800}>

          {/* Tech stack */}
          <Section>
            <SectionTitle>Tech Stack</SectionTitle>
            <Card>
              <p css={css`font-size:0.8125rem;color:${theme.colors.textMuted};margin:0 0 16px;`}>
                Primary
              </p>
              <SkillsGrid css={css`margin-bottom:16px;`}>
                {SKILLS_PRIMARY.map(s => <Skill key={s} primary>{s}</Skill>)}
              </SkillsGrid>
              <p css={css`font-size:0.8125rem;color:${theme.colors.textMuted};margin:0 0 12px;`}>
                Tools &amp; Infrastructure
              </p>
              <SkillsGrid>
                {SKILLS_SECONDARY.map(s => <Skill key={s}>{s}</Skill>)}
              </SkillsGrid>
            </Card>
          </Section>

          {/* Experience + OSS side by side */}
          <TwoCol>
            {/* Experience */}
            <Section css={css`margin-bottom:0;`}>
              <SectionTitle>Experience</SectionTitle>
              <Timeline>
                {EXPERIENCE.map((item, i) => (
                  <TimelineItem key={i}>
                    <TimelineDot>
                      <Dot current={item.current} />
                      <Line className="line" />
                    </TimelineDot>
                    <TimelineContent>
                      <TimelineRole>{item.role}</TimelineRole>
                      <TimelineCompany>{item.company}</TimelineCompany>
                      <TimelinePeriod>{item.period}</TimelinePeriod>
                      <TimelineDesc>{item.desc}</TimelineDesc>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Section>

            {/* Open Source */}
            <Section css={css`margin-bottom:0;`}>
              <SectionTitle>Open Source</SectionTitle>
              <Card css={css`padding:0 24px;`}>
                {OSS_CONTRIBUTIONS.map(oss => (
                  <OSSItem key={oss.name} href={oss.url} target="_blank" rel="noopener noreferrer">
                    <div>
                      <OSSName className="oss-name">{oss.name}</OSSName>
                      <br />
                      <OSSDesc>{oss.desc}</OSSDesc>
                    </div>
                    <OSSArrow />
                  </OSSItem>
                ))}
              </Card>

              {/* Fun facts */}
              <Section css={css`margin-top:32px;margin-bottom:0;`}>
                <SectionTitle>Quick Facts</SectionTitle>
                <div css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                `}>
                  {[
                    ['Started coding', '2009'],
                    ['Current focus', 'AI & Automation'],
                    ['Team size', '~15 developers'],
                    ['Branches', '6 across Asia'],
                    ['Favorite stack', 'Laravel + Vue.js'],
                  ].map(([label, value]) => (
                    <div key={label} css={css`
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      padding: 10px 0;
                      border-bottom: 1px solid ${theme.colors.border};
                      &:last-child { border-bottom: none; }
                    `}>
                      <span css={css`font-size:0.875rem;color:${theme.colors.textMuted};`}>{label}</span>
                      <span css={css`font-size:0.875rem;font-weight:600;color:${theme.colors.text};font-family:${theme.fonts.mono};`}>{value}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </Section>
          </TwoCol>

          {/* Contact CTA */}
          <Section css={css`margin-top:56px;margin-bottom:0;`}>
            <ContactCard>
              <ContactTitle>Let's work together</ContactTitle>
              <ContactSub>
                Have a project in mind or want to discuss tech?<br />
                I'm always happy to connect.
              </ContactSub>
              <div css={css`display:flex;gap:12px;justify-content:center;flex-wrap:wrap;`}>
                <ContactBtn href="mailto:khoaln6@gmail.com">
                  <IconMail /> khoaln6@gmail.com
                </ContactBtn>
                <Link
                  to="/contact"
                  css={css`
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 11px 24px;
                    border: 1px solid rgba(255,255,255,0.15);
                    color: ${theme.colors.textSubtle};
                    border-radius: ${theme.radii.default};
                    font-size: 0.9375rem;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 120ms ease;
                    &:hover {
                      border-color: ${theme.colors.orange};
                      color: ${theme.colors.orange};
                    }
                  `}
                >
                  Contact Form
                </Link>
              </div>
            </ContactCard>
          </Section>

        </Container>
      </PageBody>
    </Layout>
  )
}
