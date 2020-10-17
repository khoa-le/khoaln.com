module.exports = {
  siteTitle: 'Khoa Le', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Khoa Le', // Alternative Site title for SEO
  siteTitleShort: 'khoaln', // short_name for manifest
  siteUrl: process.env.ROOT_URL || 'https://khoaln.com', // Domain of your site. No trailing slash!
  lang: 'en', // Language Tag on <html> element
  pathPrefix: '/',
  siteLogo: 'images/logo.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription:
    'Come check out how Khoa Le can help you level up your career as a software engineer.',
  minibio: `
    <strong>Khoa Le</strong> is a JavaScript software engineer and
    teacher. He's taught hundreds of thousands of people how to make the world
    a better place with quality software development tools and practices. He
    lives with his wife and four kids in Utah.
  `,
  author: 'Khoa Le', // Author for schemaORGJSONLD
  organization: 'Khoa Le Tech LLC',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@khoaln', // Twitter Username
  ogSiteName: 'Khoa Le', // Facebook Site Name
  ogLanguage: 'en_US',

  // Manifest and Progress color
  themeColor: '#4147DC',
  backgroundColor: '#231C42',

  // Social component
  twitterHandle: '@khoaln',
  github: 'https://github.com/khoa-le/',
  linkedin: 'https://www.linkedin.com/in/khoaln/',
  rss: 'https://khoaln.com/blog/rss.xml',
}
