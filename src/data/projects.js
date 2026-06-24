import aviMemoIcon from '../assets/AviMemo_logo.png'

const PROJECTS = [
  {
    id: '1',
    title: 'Project Alpha',
    summary: 'A web app that helps teams coordinate tasks and milestones.',
    details:
      'Built with React and Vite. Implemented feature X, improved performance by 30%, and led deployment.',
    date: '2024',
    tags: ['React', 'Vite', 'Performance'],
    links: [{ href: 'https://example.com', label: 'Live' }],
  },
  {
    id: '2',
    title: 'Data Pipeline',
    summary: 'Backend ETL pipeline for processing analytics events.',
    details: 'Designed and implemented scalable ingestion and processing with monitoring.',
    date: '2023',
    tags: ['ETL', 'Python'],
  },
  {
    id: '3',
    title: 'Open-source Contribution',
    summary: 'Contributed core feature to popular library.',
    details: 'Authored PR that added feature Y and improved docs; accepted upstream after review.',
    date: '2022',
    tags: ['OSS', 'Documentation'],
  },
  {
    id: '4',
    title: 'Aviary Memo', // confirmed name (per app's splash screen)
    summary: 'An iOS app for keeping a birdwatching journal.', // PLACEHOLDER copy
    date: '2026', // PLACEHOLDER — replace with real release date
    tags: ['iOS'], // PLACEHOLDER — add real tech stack tags
    landingPageUrl: '/avimemo/index.html',
    icon: aviMemoIcon,
  },
]

export default PROJECTS
