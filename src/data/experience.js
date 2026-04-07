const EXPERIENCE = [
  {
    id: 'exp1',
    title: 'Software Developer III',
    company: 'Upperity (SEZC) Ltd.',
    summary:
      'Architected multi-tenant database models and led legacy database migrations for a scalable enterprise platform.',
    details: [
      'Architected a multi-tenant database model by separating Primary and Tenant databases, improving scalability, maintainability, and data isolation.',
      'Led migration of legacy MySQL/MariaDB databases to PostgreSQL, managing schema transformation, data mapping, and validation.',
      'Refactored Entity Framework configurations to support accurate, high-performance data access across multiple data stores.',
      'Designed and built secure REST APIs integrating external systems for automated document ingestion and AI-driven processing workflows.',
      'Designed and implemented a scalable sales order workflow platform used by 20+ resellers, reducing manual order processing time by 60%.',
      'Developed a dynamic localization service providing multilingual UI support across the platform.',
    ],
    date: 'Jan 2024 – Jan 2026',
    location: 'Cayman Islands',
    tags: ['C#', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Clean Architecture'],
  },
  {
    id: 'exp2',
    title: 'Senior Software Developer',
    company: 'Book4Time Inc.',
    summary:
      'Built high-availability REST APIs and optimized SQL Server performance for an enterprise SaaS platform.',
    details: [
      'Developed and enhanced backend services and enterprise SaaS features using C#, ASP.NET Core, SQL Server, Angular, and TypeScript.',
      'Built high-availability REST APIs supporting thousands of daily transactions across enterprise SaaS clients.',
      'Designed and optimized SQL Server queries, stored procedures, and database structures to improve performance and reliability.',
      'Investigated and resolved complex production issues across application and database layers in collaboration with support teams.',
      'Contributed to modernization of legacy components by improving architecture patterns and code maintainability.',
      'Participated in Agile ceremonies, peer code reviews, and release cycles.',
    ],
    date: 'Dec 2022 – Jan 2024',
    location: 'Toronto, Ontario',
    tags: ['C#', 'ASP.NET Core', 'SQL Server', 'Angular', 'TypeScript'],
  },
  {
    id: 'exp3',
    title: 'Senior Developer',
    company: 'DMS Organization',
    summary:
      'Rebuilt a high-traffic buy-and-sell web platform from the ground up with ASP.NET Core and Angular.',
    details: [
      'Rebuilt a high-traffic buy-and-sell web platform from the ground up using ASP.NET Core, SQL Server, Angular, and TypeScript.',
      'Designed database schema and data access layers to support scalable application growth.',
      'Developed REST APIs and backend services to support frontend functionality and integrations.',
      'Participated in Salesforce administration and system support for multiple business units.',
    ],
    date: 'Jan 2022 – Jul 2022',
    location: 'Cayman Islands',
    tags: ['C#', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Angular'],
  },
  {
    id: 'exp4',
    title: 'Systems Programmer',
    company: 'Cayman Islands Monetary Authority',
    summary:
      'Designed and maintained regulatory enterprise systems, implementing CQRS and Repository patterns.',
    details: [
      'Designed, developed, and maintained regulatory enterprise systems using ASP.NET Core and SQL Server.',
      'Implemented CQRS and Repository design patterns to improve system structure and maintainability.',
      'Implemented automated unit and integration testing to validate application logic, API endpoints, and database interactions, improving system reliability and reducing production defects.',
      'Developed SQL Server database objects including stored procedures, views, and data transformation processes.',
      'Reduced deployment time by implementing structured SQL Server Database Projects across multiple systems.',
      'Built and maintained integrations between external regulatory websites and internal enterprise platforms.',
    ],
    date: 'Jan 2020 – Jan 2022',
    location: 'Cayman Islands',
    tags: ['C#', 'ASP.NET Core', 'EF Core', 'SQL Server', 'CQRS', 'DevOps'],
  },
  {
    id: 'exp5',
    title: 'Software Developer',
    company: 'DMS Fund Governance',
    summary:
      'Developed workflows, reports, and a secure client portal using .NET Framework and SQL Server.',
    details: [
      'Developed and maintained workflows, reports, and tools using .NET Framework and SQL Server.',
      'Built a secure client portal allowing external users to access documents and engagement information.',
      'Researched and resolved Salesforce platform issues related to quarterly maintenance releases.',
      'Supported backend systems and performed database updates and troubleshooting.',
    ],
    date: 'Feb 2019 – Jan 2020',
    location: 'Cayman Islands',
    tags: ['C#', 'ASP.NET Core', 'SQL Server', 'Salesforce'],
  },
  {
    id: 'exp6',
    title: 'Lead Software Developer',
    company: 'ClearPay Canada Corporation',
    summary:
      'Led technical strategy and a small development team while contributing to SOC2 Type 1 certification.',
    details: [
      'Led technical strategy while remaining hands-on in development (50% leadership / 50% engineering).',
      'Managed two contract developers and worked closely with executive leadership on technology initiatives.',
      'Contributed to achieving SOC2 Type 1 certification through application and infrastructure improvements.',
      'Maintained and enhanced ASP.NET applications and SQL Server databases.',
      'Monitored performance metrics and maintained vendor relationships for hosting and security services.',
    ],
    date: 'May 2018 – Dec 2018',
    location: 'Toronto, Ontario',
    tags: ['C#', '.NET Framework', 'SQL Server', 'Leadership'],
  },
  {
    id: 'exp7',
    title: 'Contract SQL Developer',
    company: 'Brac Informatics Centre',
    summary:
      'Developed stored procedures and C# web services, with BI reporting using Tableau.',
    details: [
      'Developed and maintained stored procedures, SQL scripts, and C# web services supporting multiple web clients.',
      'Performed database troubleshooting, performance analysis, and query optimization.',
      'Produced business intelligence reporting using Tableau.',
      'Supported production systems by diagnosing and resolving database and application issues.',
    ],
    date: 'Nov 2017 – May 2018',
    location: 'Toronto, Ontario',
    tags: ['C#', '.NET Framework', 'SQL Server', 'Tableau'],
  },
  {
    id: 'exp8',
    title: 'Contract Web Developer',
    company: 'Harmonic Fund Services',
    summary:
      'Built enterprise web applications for financial institutions using ASP.NET MVC and Angular.',
    details: [
      'Developed enterprise web applications using ASP.NET MVC, SQL Server, Angular, and TypeScript.',
      'Designed backend logic, REST endpoints, and database queries for financial institution systems.',
      'Participated in code reviews to ensure optimized, maintainable code.',
      'Created unit tests to maintain stability and prevent regressions.',
    ],
    date: 'May 2017 – Nov 2017',
    location: 'Toronto, Ontario',
    tags: ['C#', 'Angular', 'TypeScript', 'SQL Server'],
  },
  {
    id: 'exp9',
    title: 'Contract Web Developer',
    company: 'DMS Fund Governance',
    summary:
      'Built internal enterprise applications and automated document workflows, reducing processing time from one week to three hours.',
    details: [
      'Developed internal enterprise applications and integrations using C#, ASP.NET MVC, and SQL Server.',
      'Automated invoicing and digitized document workflows, reducing processing time from one week to approximately three hours.',
      'Built WCF web services and optimized SQL Server stored procedures.',
    ],
    date: 'Oct 2009 – Mar 2017',
    location: 'Cayman Islands / Toronto, Ontario',
    tags: ['C#', 'ASP.NET MVC', 'WCF', 'SQL Server', 'SSRS'],
  },
]

export default EXPERIENCE
