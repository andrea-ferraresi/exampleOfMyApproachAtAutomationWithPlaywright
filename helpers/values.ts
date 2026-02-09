import { text } from "stream/consumers";

const Values = {
  // URLs
  careers_url: 'https://careers.osapiens.com/',
  
  // Test data
  searchTerm: 'Developer',
  searchTermAlternative: 'Engineer',
  
  // Expected text content
  pageTitle: 'osapiens',
  careersWording: 'Career',
  joinUsWording: 'Join',
  
  // Timeouts (in milliseconds)
  defaultTimeout: 30000,
  shortTimeout: 5000,
  longTimeout: 60000,
  
  // Utility
  uniqueName: Date.now().toString(),
  get_unique_identifier: () => `test_${Date.now().toString()}_${Math.random()}`,

  textOfTheButtonToAcceptAllTheCookies: 'Accept all',
  textOfTheButtonToRejectAllTheCookies: 'Reject all',

  searchTermQuality: 'Quality',


};

export default Values;
