import {test, expect} from '@playwright/test';
import {Client} from '../helpers/Client';
import Values from '../helpers/values';
import {Selectors} from '../helpers/selectors';

test.describe('osapiens Careers Page Tests', () => {
  
  test('TC_01_visit_careers_page_and_verify_page_loads', async ({page, browserName}) => {
    const client = new Client(page, browserName);
    
    await client.visitCareersPage();
    await client.seesThePageIsCorrectlyLoaded();
    /*
    inline comments which state ideas on how to improve the test
    (more inline comments are in the Client.ts file)
    */
    /*
    1) it's a good idea to close the cookie banner if it appears, to avoid it interfering with other tests.
    2) it may be useful to compare if the two buttons to view the jobs lead to the same place.
    */
    await client.countsTheNumberOfJobOpeningsAndPrintsTheResult()
    await client.failsIfThereIsNoJobTitleContainingTheWord(Values.searchTermQuality);
    

  });









});
