import {test, expect} from '@playwright/test';
import {Client} from '../helpers/Client';
import Values from '../helpers/values';
import {Selectors} from '../helpers/selectors';

test.describe('osapiens Careers Page Tests', () => {
    /*
    inline comments which state ideas on how to improve the test
    (more inline comments are in the Client.ts file)
    */
    
    /*
    What I would do is a data driven test:
    I would use one mock returning some results containing the word Quality,
    one mock returning some results without the word Quality,
    one mock with no results,
    one mock returning some results containing job titles equivalent to "Quality" jobs,
    ...
    */
  
  test('TC_01_visit_careers_page_and_verify_page_loads', async ({page, browserName}) => {
    const client = new Client(page, browserName);
    
    await client.visitsTheCareersPage();
    await client.seesThePageIsCorrectlyLoaded();
    await client.closesTheCookieBannerIfItAppears();

    /*
    1) it's a good idea to close the cookie banner if it appears, to avoid it interfering with other tests.
    2) it may be useful to compare if the two buttons to view the jobs lead to the same place.
    */

    /*
    on mobile, we need to wait for the listing to be displayed
    */
    await client.scrollsToTheBottomOfThePageIfOnMobile();
    await client.countsTheNumberOfJobOpeningsAndPrintsTheResult()
    await client.failsIfThereIsNoJobTitleContainingTheWord(Values.searchTermQuality);
    

  });









});
