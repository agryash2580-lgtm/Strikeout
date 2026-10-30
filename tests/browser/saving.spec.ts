import {test,expect} from '@playwright/test';

async function sample(page:any){await page.goto('/sample');await expect(page.getByLabel('Incident summary')).toBeVisible();await expect(page.locator('.save-indicator')).toContainText(/Saved|All changes saved/);}
async function saved(page:any){await expect(page.locator('.save-indicator')).toContainText(/Saved|All changes saved/);}

test('a temporary save failure retries automatically and the saved edit survives refresh',async({page})=>{
 await sample(page);let attempts=0;
 await page.route('**/api/data',async route=>{if(route.request().method()!=='PUT')return route.continue();attempts++;if(attempts===1)await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Synthetic temporary storage failure',retryable:true})});else if(attempts===2)await route.fulfill({status:200,contentType:'text/html',body:'Synthetic malformed response'});else await route.continue();});
 await page.getByLabel('Incident summary').fill('Fictional revised incident after a temporary connection failure.');
 await expect(page.locator('.save-indicator')).toContainText(/Reconnecting/);await saved(page);expect(attempts).toBeGreaterThanOrEqual(3);
 await expect(page.getByRole('alert',{name:'Pending workspace changes'})).toHaveCount(0);await page.reload();await expect(page.getByLabel('Incident summary')).toHaveValue('Fictional revised incident after a temporary connection failure.');
});

test('two tabs safely combine separate edits and offer a real comparison for conflicting edits',async({page,context})=>{
 await sample(page);const other=await context.newPage();await other.goto(page.url());await expect(other.getByLabel('Incident summary')).toBeVisible();
 await page.getByLabel('Incident summary').fill('Fictional summary from the first tab.');await saved(page);
 await other.getByLabel('Work email to preserve').fill('new-work@example.com');await saved(other);
 await other.reload();await expect(other.getByLabel('Incident summary')).toHaveValue('Fictional summary from the first tab.');await expect(other.getByLabel('Work email to preserve')).toHaveValue('new-work@example.com');
 await page.reload();await expect(page.getByLabel('Work email to preserve')).toHaveValue('new-work@example.com');
 await page.getByLabel('Incident summary').fill('First tab’s newest account.');await saved(page);
 await other.getByLabel('Incident summary').fill('Second tab’s conflicting account.');
 const review=other.getByRole('alert',{name:'Pending workspace changes'});await expect(review).toContainText('Two versions need a quick review.');await review.getByText('cases / summary',{exact:true}).click();await expect(review.getByText('Second tab’s conflicting account.',{exact:true})).toBeVisible();await expect(review.getByText('First tab’s newest account.',{exact:true})).toBeVisible();
 await other.reload();await expect(other.getByRole('alert',{name:'Pending workspace changes'})).toContainText('Two versions need a quick review.');await other.getByRole('button',{name:'Keep this tab’s edits',exact:true}).click();await saved(other);await other.reload();await expect(other.getByLabel('Incident summary')).toHaveValue('Second tab’s conflicting account.');await other.close();
});

test('an offline draft saves when the connection returns and survives refresh',async({page,context})=>{
 await sample(page);const address=page.url();await context.setOffline(true);await page.getByLabel('Incident summary').fill('Fictional draft written while offline.');await expect(page.getByRole('alert',{name:'Pending workspace changes'})).toContainText('You’re offline. We kept your edits.');
 await context.setOffline(false);await saved(page);await page.reload();await expect(page.getByLabel('Incident summary')).toHaveValue('Fictional draft written while offline.');await expect(page).toHaveURL(address);
});

test('older pending drafts are preserved for review, and choosing the saved version clears recovery safely',async({page})=>{
 await sample(page);const original=await page.getByLabel('Incident summary').inputValue();
 await page.evaluate(async()=>{const user=(await(await fetch('/api/auth/me')).json()).user,remote=await(await fetch('/api/data')).json();remote.cases[0].summary='Fictional pending draft from the previous website version.';sessionStorage.setItem('strikeout.pending.'+user.id,JSON.stringify({cases:remote.cases,identifiers:remote.identifiers}));});
 await page.reload();await expect(page.getByRole('alert',{name:'Pending workspace changes'})).toContainText('Two versions need a quick review.');await expect(page.getByLabel('Incident summary')).toHaveValue('Fictional pending draft from the previous website version.');
 await page.getByRole('button',{name:'Use saved edits',exact:true}).click();await saved(page);await expect(page.getByLabel('Incident summary')).toHaveValue(original);await expect(page.getByRole('alert',{name:'Pending workspace changes'})).toHaveCount(0);
 expect(await page.evaluate(()=>Object.keys(sessionStorage).filter(key=>key.startsWith('strikeout.pending.')).length)).toBe(0);
});
