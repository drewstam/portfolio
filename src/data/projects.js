const PROJECTS = [
  {
    id: '1',
    title: 'Inspire Small Business',
    summary: 'A Shopify app that serves as an internal client portal for support, tutorials, and billing.',
    details:
      'Designed and built the entire app as a contractor for Inspire Small Business, a Sydney-based Shopify agency. ' +
      'The app runs inside the Shopify Admin and gives the agency\'s existing clients one place to manage retainers, ' +
      'task logs, and hourly billing summaries; access tutorial videos, support tickets, and important store info; ' +
      'and track page speed history alongside theme update guidance from the agency. ' +
      'Published on the Shopify App Store in August 2026.',
    date: '2026',
    tags: ['Shopify', 'React', 'TypeScript', 'Postgres', 'Railway'],
    links: [{ href: 'https://apps.shopify.com/inspire-small-business', label: 'Shopify App Store' }],
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
]

export default PROJECTS
