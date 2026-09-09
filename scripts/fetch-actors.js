import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const USERNAME = 'ahmed_jasarevic';
const BASE_URL = `https://api.apify.com/v2/store?search=&username=${USERNAME}`;
const LIMIT = 100;

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const ACTORS_PATH = path.join(DATA_DIR, 'actors.json');
const HTML_PATH = path.join(PUBLIC_DIR, 'scrapers.html');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

async function fetchAllActors() {
  let offset = 0;
  let total = Infinity;
  const allItems = [];

  while (offset < total) {
    const url = `${BASE_URL}&limit=${LIMIT}&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Apify API returned ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const data = json.data || json;

    if (data.items && data.items.length > 0) {
      allItems.push(...data.items);
    }

    total = data.total || 0;
    offset += LIMIT;

    if (data.items && data.items.length < LIMIT) break;
  }

  return allItems;
}

function loadExistingActors() {
  try {
    const raw = fs.readFileSync(ACTORS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

const DISPLAY_CATEGORY_MAP = {
  real_estate: 'Real Estate',
  jobs: 'Jobs',
  social_media: 'Social Media',
  videos: 'Social Media',
  lead_generation: 'Lead Generation',
  agents: 'Lead Generation',
  ecommerce: 'E-commerce',
  seo_tools: 'SEO & AI Tools',
  ai: 'SEO & AI Tools',
  automation: 'SEO & AI Tools',
  developer_tools: 'SEO & AI Tools',
  travel: 'Travel',
  news: 'Other',
};

const OTHER_CATEGORY = 'Other';

function deriveDisplayCategory(rawCategory) {
  return DISPLAY_CATEGORY_MAP[rawCategory] || OTHER_CATEGORY;
}

function derivePricing(info) {
  if (!info) return { model: 'unknown', pricePerUnit: null };

  const rawModel = info.pricingModel || 'UNKNOWN';
  let model;
  switch (rawModel) {
    case 'FREE':
      model = 'free';
      break;
    case 'PAY_PER_EVENT':
      model = 'pay-per-event';
      break;
    case 'PAY_PER_RESULT':
      model = 'pay-per-result';
      break;
    case 'MONTHLY_FIXED_PRICE':
      model = 'monthly';
      break;
    default:
      model = rawModel.toLowerCase();
  }

  let pricePerUnit = null;
  const perEvent = info.pricingPerEvent || {};
  const primary = Object.values(perEvent.actorChargeEvents || {}).find((e) => e.isPrimaryEvent);
  if (primary && typeof primary.eventPriceUsd === 'number') {
    pricePerUnit = primary.eventPriceUsd;
  }

  return { model, pricePerUnit };
}

function normalizeActor(raw, existingMap) {
  const slug = raw.name || raw.id || '';
  const existing = existingMap.get(slug) || {};

  const stats = raw.stats || {};
  const categories = Array.isArray(raw.categories) ? raw.categories : [];
  const rawCategory = categories.length ? categories[0].toLowerCase() : 'uncategorized';

  return {
    title: raw.title || raw.name || 'Untitled',
    slug,
    url: raw.url || `https://apify.com/${USERNAME}/${slug}`,
    description: raw.description || '',
    category: rawCategory,
    displayCategory: deriveDisplayCategory(rawCategory),
    imageUrl: raw.pictureUrl || null,
    pricing: derivePricing(raw.currentPricingInfo),
    totalUsers: stats.totalUsers ?? 0,
    lastModified: stats.lastRunStartedAt || raw.lastModified || null,
    rating: raw.actorReviewRating ?? stats.actorReviewRating ?? null,
    hasDeepDive: existing.hasDeepDive ?? false,
    deepDiveUrl: existing.deepDiveUrl ?? '',
  };
}

function sortActors(actors) {
  return actors.sort((a, b) => {
    const da = a.lastModified ? new Date(a.lastModified).getTime() : 0;
    const db = b.lastModified ? new Date(b.lastModified).getTime() : 0;
    return db - da;
  });
}

function updateSitemapDate() {
  if (!fs.existsSync(SITEMAP_PATH)) return;

  const today = new Date().toISOString().split('T')[0];
  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');

  sitemap = sitemap.replace(
    /(<loc>https:\/\/ahmedjasarevic\.github\.io\/scrapers\.html<\/loc>\s*<lastmod>)[^<]+(<\/lastmod>)/,
    `$1${today}$2`
  );

  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log(`Updated sitemap.xml lastmod to ${today}`);
}

function updateHtmlMetaDescription(actorCount) {
  if (!fs.existsSync(HTML_PATH)) return;

  let html = fs.readFileSync(HTML_PATH, 'utf8');
  const updated = html.replace(
    /(Browse\s+)\d+(\s+Apify scrapers)/,
    `$1${actorCount}$2`
  );

  if (updated !== html) {
    fs.writeFileSync(HTML_PATH, updated, 'utf8');
    console.log(`Updated scrapers.html meta description with ${actorCount} actors`);
  }
}

async function main() {
  console.log(`Fetching actors for user "${USERNAME}"...`);

  const rawActors = await fetchAllActors();
  console.log(`Fetched ${rawActors.length} actors from Apify store`);

  const existingActors = loadExistingActors();
  const existingMap = new Map(existingActors.map((a) => [a.slug, a]));

  const normalized = rawActors.map((a) => normalizeActor(a, existingMap));
  const sorted = sortActors(normalized);

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(ACTORS_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${sorted.length} actors to ${ACTORS_PATH}`);

  updateSitemapDate();
  updateHtmlMetaDescription(sorted.length);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
