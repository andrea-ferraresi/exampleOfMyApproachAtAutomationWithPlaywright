import {type Page, type Locator, expect} from '@playwright/test';
import {Selectors} from './selectors';
import Values from './values';

export class Client {
  page: Page;
  browserName: string;
  isBrowserSizeSet: boolean = false;

  public constructor(page: Page, browserName?: string) {
    this.page = page;
    if (browserName) {
      if (browserName == 'webkit' || browserName == 'Mobile Chrome') {
        this.browserName = 'web on mobile';
      } else {
        this.browserName = browserName;
      }
    }
  }

  async browseTo(url: string) {
    await this.page.goto(url);
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async clickElement(selector: string) {
    await this.page.locator(selector).click();
  }

  async fillInputField(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  async waitForSelector(selector: string) {
    await this.page.locator(selector).waitFor({state: 'visible'});
  }

  async expectElementToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectPageToHaveTitle(title: string) {
    await expect(this.page).toHaveTitle(new RegExp(title, 'i'));
  }

  async expectPageToHaveURL(url: string) {
    await expect(this.page).toHaveURL(new RegExp(url));
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({path: `screenshots/${name}.png`, fullPage: true});
  }

  // Career site specific methods
  async visitsTheCareersPage() {
    await this.browseTo(Values.careers_url);
    
  }

  
  async seesJobListings() {
    const jobListings = this.page.locator(Selectors.jobListings);
    const count = await jobListings.count();
    expect(count).toBeGreaterThan(0);
  }

  async clicksOnJobListing(index: number = 0) {
    const jobListings = this.page.locator(Selectors.jobListings);
    await jobListings.nth(index).click();
  }

  async searchForJob(searchTerm: string) {
    const searchInput = this.page.locator(Selectors.searchInput);
    if (await searchInput.isVisible()) {
      await searchInput.fill(searchTerm);
      await searchInput.press('Enter');
      
    }
  }

  async seesThePageIsCorrectlyLoaded() {
    await this.expectPageToHaveURL(Values.careers_url);

    //TC_05_verify_company_logo_is_displayed
    if(this.browserName != 'web on mobile') {
      await expect(this.page.locator(Selectors.companyLogo).last()).toBeVisible();
    } else {
      // to be implemented
    }

    await this.expectPageToHaveTitle(Values.pageTitle);

    await this.expectElementToBeVisible(Selectors.buttonInThePageHeaderToViewAllJobs);
    await expect(this.page.locator(Selectors.buttonInThePageHeaderToViewAllJobs)).toHaveText('View Jobs');
    await this.expectElementToBeVisible(Selectors.buttonToViewAllTheJobs);

    await this.expectElementToBeVisible(Selectors.titleOfOverlayToAcceptOrRejectCookies);
  }



  async countsTheNumberOfJobOpeningsAndPrintsTheResult() {
    /*
    inline comments which state ideas on how to improve the test
    */
    /*
    The AI suggests to count the jobs by checking the number of elements in the table.
    This is very sensible, but I still prefer to check the href elements, instead.
    Now, my selector checks for listing in English, so I may need to change the selector 
    to make it work for jobs in other langages. From this point of view, the AI's solution is more robust, because it does not rely on the language of the job listings.


    const jobListings = this.page.locator(Selectors.jobListings);
    const count = await jobListings.count();
    console.log(`Found ${count} job listings on the page`);
    */


    /*
    If the count is 0, it would be a good idea to attempt 
    to click on the buttons to view all the jobs, 
    in case the website is designed to load the job listings only after clicking on those buttons.
    */



    // Get all job entries and print the count
    const jobEntries = this.page.locator(Selectors.jobEntryInEnglish);
    var jobCount = await jobEntries.count();
    jobCount = jobCount / 2; // Assuming two href elements for each job listed
    console.log(`Number of open jobs: ${jobCount}`);
  }


  /*
    inline comments which state ideas on how to improve the test
  */
  /*
  The title of the job listing is the text of the "a[href" element, 
  however if the product designer decides to add a style to the job title, and wraps it in a span, the test may fail.
  However, to find a fix for this change, it would be sufficient to add one line of code,
  so I would not worry about it right now.
  */

  /*
  Before failing this test, if the word "quality" is not present in any of the job titles, it would be a good idea to print all the job titles in the console, to make it easier to understand why the test failed.
  I would first check if there are any equivalent job title, such as "QA Engineer", "SDET", "Test Engineer", etc, 

  */
  /*
  To verify the correctness of the code, 
  I should create a mock of the career page without any job listings with the word quality,
  and load the mock instead of the actual answer
  */

  async failsIfThereIsNoJobTitleContainingTheWord(word: string) {
    const jobTitles = this.page.locator(Selectors.jobEntryInEnglish);
    const count = await jobTitles.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const titleText = await jobTitles.nth(i).textContent() || '';
      if (titleText.toLowerCase().includes(word.toLowerCase())) {
        found = true;
        break;
      }
    }
    expect(found).toBeTruthy();
  }

  async scrollsToTheBottomOfThePageIfOnMobile() {
    /*
    on mobile, we need to wait for the listing to be displayed
    */
    if(this.browserName == 'web on mobile') {
      await this.page.locator(Selectors.buttonToRegisterYourInterest).scrollIntoViewIfNeeded();
      /*
      this assertion is not robust at all, it needs to be improved
      */
      await expect(this.page.locator(Selectors.jobEntryInEnglish).first()).toBeVisible();
    }
  }

  async closesTheCookieBannerIfItAppears() {
    /*
    const acceptButton = this.page.locator(`button:has-text("${Values.textOfTheButtonToAcceptAllTheCookies}")`);
    const rejectButton = this.page.locator(`button:has-text("${Values.textOfTheButtonToRejectAllTheCookies}")`);

    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    } else if (await rejectButton.isVisible()) {
      await rejectButton.click();
    }
    */
    const cookieBannerTitle = this.page.locator(Selectors.titleOfOverlayToAcceptOrRejectCookies);
    if (await cookieBannerTitle.isVisible()) {
      await this.page.getByRole('button', {name: Values.textOfTheButtonToAcceptAllTheCookies}).click();
    }

  }




}
