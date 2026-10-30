import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests/browser',timeout:120000,expect:{timeout:15000},use:{baseURL:process.env.TEST_URL||'http://localhost:3002',channel:'msedge',headless:true,viewport:{width:1440,height:1000},screenshot:'only-on-failure'},workers:1,reporter:'list'});
