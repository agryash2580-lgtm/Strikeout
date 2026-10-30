import {test,expect} from '@playwright/test';

async function advanceTo(page:any,stage:number){
 if(stage>=1)await page.getByRole('button',{name:'Meet Pop →',exact:true}).click();
 if(stage>=2){await page.getByRole('button',{name:'Inspect link →'}).click();await page.getByRole('button',{name:'Continue with Pop →'}).click();}
 if(stage>=3)await page.getByRole('button',{name:'Team up with Pop →'}).click();
}

test('Meet Pop opens the introduction for returning visitors through navigation and the cat card',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('strikeout.pop.intro.v1','done'));
 await page.goto('/home');
 await page.getByRole('link',{name:'Meet Pop',exact:true}).click();
 await expect(page).toHaveURL(/\/meet-pop$/);
 await expect(page.getByRole('heading',{name:'A wild Pop appeared.'})).toBeVisible();
 await page.reload();
 await expect(page.getByRole('heading',{name:'A wild Pop appeared.'})).toBeVisible();
 await page.getByRole('link',{name:/STRIKEOUT/}).click();
 await page.getByRole('button',{name:'Meet Pop — play the introduction'}).click();
 await expect(page).toHaveURL(/\/meet-pop$/);
 await expect(page.getByRole('heading',{name:'A wild Pop appeared.'})).toBeVisible();
});

test('Pop visibly travels between stages and every encounter action reaches a real outcome',async({page})=>{
 await page.goto('/meet-pop');
 const cat=page.locator('.scene-pop');
 await expect(cat).toHaveAttribute('data-motion-state','settled');
 const start=(await cat.boundingBox())!.x;
 await page.getByRole('button',{name:'Meet Pop →',exact:true}).click();
 const samples=await cat.evaluate(async node=>{const positions:number[]=[];for(let i=0;i<18;i++){await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));positions.push(node.getBoundingClientRect().x);}return positions;});
 expect(Math.max(...samples)-Math.min(...samples)).toBeGreaterThan(20);
 await expect(cat).toHaveAttribute('data-motion-state','settled');
 expect(start-(await cat.boundingBox())!.x).toBeGreaterThan(100);
 await page.getByRole('button',{name:'Inspect link →'}).click();
 await expect(page.getByText('Label: prizes.example',{exact:true})).toBeVisible();
 await expect(page.getByText('Destination: totally-a-prize.invalid',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Continue with Pop →'}).click();
 await page.getByRole('button',{name:'Offer Pop a pixel snack'}).click();
 await expect(page.getByRole('button',{name:'Snack accepted'})).toBeDisabled();
 await page.getByRole('button',{name:'Team up with Pop →'}).click();
 await expect(page.getByRole('heading',{name:'Pop joined your party.'})).toBeVisible();
 await page.getByRole('button',{name:'← Back',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Small cat. Good company.'})).toBeVisible();
 await page.getByRole('button',{name:'Team up with Pop →'}).click();
 await page.getByRole('button',{name:'Log an incident →',exact:true}).click();
 await expect(page.getByLabel('What happened?')).toBeVisible();
});

test('Skip works immediately at all four steps without waiting for movement or authentication',async({page})=>{
 for(let stage=0;stage<4;stage++){
  await page.goto('/meet-pop');await advanceTo(page,stage);
  const skip=page.getByRole('button',{name:'Skip demo → Log an incident'});
  await expect(skip).toBeInViewport();await skip.click();
  await expect(page).toHaveURL(/\/incident$/);
  await expect(page.getByLabel('What happened?')).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
 }
});

test('keyboard and reduced-motion visitors can finish the mobile encounter with Pop inside the scene',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/meet-pop');
 await page.getByRole('button',{name:'Meet Pop →',exact:true}).focus();await page.keyboard.press('Enter');
 await expect(page.getByRole('heading',{name:'A second pair of eyes.'})).toBeFocused();
 await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Inspect link →'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.getByRole('heading',{name:'A second pair of eyes.'})).toBeFocused();
 await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Continue with Pop →'})).toBeFocused();
 await page.keyboard.press('Enter');await page.getByRole('button',{name:'Team up with Pop →'}).focus();await page.keyboard.press('Enter');
 await expect(page.getByRole('heading',{name:'Pop joined your party.'})).toBeFocused();
 const cat=await page.locator('.scene-pop').boundingBox(),scene=await page.locator('.landscape').boundingBox();
 expect(cat!.x).toBeGreaterThanOrEqual(scene!.x);expect(cat!.x+cat!.width).toBeLessThanOrEqual(scene!.x+scene!.width);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await expect(page.getByRole('button',{name:'Skip demo → Log an incident'})).toBeInViewport();
 await page.getByRole('button',{name:'Get the Pop extension ↗'}).click();
 await expect(page).toHaveURL(/\/extension$/);
 await expect(page.getByRole('link',{name:/Download Pop/})).toBeVisible();
});
