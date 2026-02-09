export enum Selectors {
  // Page structure
  pageHeader = 'h1',
  mainContent = 'main',
  navigation = 'nav',
  
  // Job listings - these selectors will need to be updated based on actual page structure
  jobListings = '[data-testid="job-listing"], .job-card, .position, article',
  jobTitle = 'h2, h3, .job-title',
  jobDescription = '.description, .job-description',
  applyButton = 'button:has-text("Apply"), a:has-text("Apply")',
  
  // Search and filters
  searchInput = 'input[type="search"], input[placeholder*="Search"], input[name="search"]',
  filterButton = 'button:has-text("Filter")',
  categoryFilter = 'select[name="category"], .category-filter',
  locationFilter = 'select[name="location"], .location-filter',
  
  // Footer
  footer = 'footer',
  footerLinks = 'footer a',
  
  // Company info
  companyLogo = 'img[alt*="osapiens"], .logo',
  aboutSection = '[data-testid="about"], .about-section',

  buttonInThePageHeaderToViewAllJobs = 'a[href="/?scroll_to=js-careers-jobs-block"]',
  buttonToViewAllTheJobs = 'a[href="#js-careers-jobs-block"]',

  titleOfOverlayToAcceptOrRejectCookies = '#cm__title',

  jobEntryInEnglish = 'a[href^="/en/postings/"]',

  buttonToRegisterYourInterest = 'a[href="/register-your-interest/new"]',


}
