import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');

const USERNAME = 'ahmed_jasarevic';
const STORE_URL = `https://api.apify.com/v2/store?search=&username=${USERNAME}`;
const DETAIL_URL = 'https://api.apify.com/v2/acts';
const LIMIT = 100;
const CONCURRENCY = 10;

const SITE_URL = 'https://ahmedjasarevic.github.io';
const SCRAPERS_URL = `${SITE_URL}/scrapers.html`;
const OG_IMAGE_URL = `${SITE_URL}/og-banner.svg`;

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const ACTORS_PATH = path.join(DATA_DIR, 'actors.json');
const HTML_TEMPLATE_PATH = path.join(__dirname, 'scrapers.template.html');
const HTML_PATH = path.join(PUBLIC_DIR, 'scrapers.html');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

const OTHER = 'Other';

const RAW_CATEGORY_MAP = {
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
  news: 'News & Content',
  finance: 'Finance',
  automotive: 'Automotive',
};

const BUCKETS = [
  {
    name: 'Finance',
    keywords: [
      'coinmarketcap', 'cryptocompare', 'crypto', 'lendingtree', 'heloc', 'mortgage',
      'insurance', 'car insurance', 'yahoo finance', 'stock', 'options', 'greeks',
      'market cap', 'trading', 'finance',
    ],
  },
  {
    name: 'Automotive',
    keywords: [
      'autoscout24', 'cars.com', 'cargurus', 'autotrader', 'vin decoder', 'vehicle',
      'dealership', 'mileage', 'imv',
    ],
  },
  {
    name: 'Real Estate',
    keywords: [
      'real estate', 'property', 'properties', 'realtor', 'realty', 'zillow', 'redfin',
      'trulia', 'homes.com', 'hemnet', 'immobiliare', 'immobilien', 'immowelt', 'immoweb',
      'wg-gesucht', 'wg rooms', 'magicbricks', 'funda', 'housing', 'sold prices',
      'apartment', 'apartments', 'rentcafe', 'rent & buy', 'rental', 'otodom', 'sreality',
      'daft', 'zoopla', 'rightmove', 'seloger', 'se loger', 'idealista', 'leboncoin',
      'bayut', 'propertyfinder', 'crexi', 'building permit', 'construction', 'ber ratings',
      'rent',
    ],
  },
  {
    name: 'Jobs',
    keywords: [
      'naukri', 'remoteok', 'remote jobs', 'ziprecruiter', 'simplyhired', 'indeed',
      'stepstone', 'reed.co.uk', 'wellfound', 'dice', 'glassdoor', 'toptal', '99designs',
      'we work remotely', 'freelancer', 'freelance', 'jobs', 'job ', 'salary', 'hiring',
      'career', 'employment', 'design talent',
    ],
  },
  {
    name: 'Travel',
    keywords: [
      'tripadvisor', 'viator', 'booking.com', 'expedia', 'hotels.com', 'hotel', 'hotels',
      'flight', 'flights', 'tours', 'travel', 'vacation',
    ],
  },
  {
    name: 'Social Media',
    keywords: [
      'reddit', 'tumblr', 'pinterest', 'skool', 'bilibili', 'ltk', 'milkshake', 'msha.ke',
      'shorby', 'linkpop', 'komi', 'contactinbio', 'bio links', 'link-in-bio', 'link in bio',
      'patreon', 'shoppable', 'social', 'socials', 'profile data extraction',
    ],
  },
  {
    name: 'News & Content',
    keywords: [
      'google news', 'hacker news', 'show hn', 'product hunt', 'medium', 'substack', 'news',
      'newsletter', 'newsletters', 'article', 'articles', 'blog', 'rss', 'trends',
      'publishing', 'journalism', 'editorial',
    ],
  },
  {
    name: 'Lead Generation',
    keywords: [
      'angi', 'checkatrade', 'thumbtack', 'houzz', 'manta', 'bbb', 'bark.com', 'clutch',
      'goodfirms', 'designrush', 'thomasnet', 'franchise', 'chamber of commerce',
      'npi registry', 'companies house', 'firmographic', 'firmographics', 'contractor',
      'contractors', 'leads', 'b2b', 'prospecting', 'outreach', 'email extract', 'emails',
      'email ', 'local business', 'agency', 'agencies', 'member data', 'providers',
      'trustpilot',
    ],
  },
  {
    name: 'E-commerce',
    keywords: [
      'flipkart', 'zalando', 'gumroad', 'amazon', 'bestsellers', 'shopify', 'stan.store',
      'sephora', 'poshmark', 'ebay', 'vinted', 'best buy', 'chrono24', 'rarible', 'nft',
      'yupoo', 'whop', 'doordash', 'vivino', 'product', 'products', 'storefront', 'inventory',
      'price tracker', 'deals', 'savings', 'seller', 'sellers', 'marketplace', 'digital goods',
      'watches', 'arbitrage',
    ],
  },
  {
    name: 'SEO & AI Tools',
    keywords: [
      'seo', 'serp', 'llm', 'rag', 'gpt', 'openai', 'markdown', 'wikipedia', 'patent', 'aso',
      'app store optimization', 'developer', 'api', 'webhook', 'automation', 'agents',
    ],
  },
];

const CATEGORY_COLORS = [
  { bg: 'rgba(145, 94, 255, 0.15)', text: '#915eff' },
  { bg: 'rgba(0, 206, 168, 0.15)',  text: '#00cea8' },
  { bg: 'rgba(47, 128, 237, 0.15)',  text: '#2f80ed' },
  { bg: 'rgba(236, 0, 140, 0.15)',   text: '#ec008c' },
  { bg: 'rgba(17, 153, 142, 0.15)',  text: '#11998e' },
  { bg: 'rgba(241, 39, 17, 0.15)',   text: '#f12711' },
  { bg: 'rgba(245, 175, 25, 0.15)',  text: '#f5af19' },
  { bg: 'rgba(86, 204, 242, 0.15)',  text: '#56ccf2' },
  { bg: 'rgba(252, 103, 103, 0.15)', text: '#fc6767' },
  { bg: 'rgba(56, 239, 125, 0.15)',  text: '#38ef7d' },
];

async function fetchJson(url, attempts = 3) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return null;
}

async function fetchAllStoreItems() {
  const allItems = [];
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const json = await fetchJson(`${STORE_URL}&limit=${LIMIT}&offset=${offset}`);
    const data = json.data || json;
    const items = data.items || [];

    if (items.length) allItems.push(...items);
    total = data.total || allItems.length;
    offset += LIMIT;
    if (items.length < LIMIT) break;
  }

  return allItems;
}

async function fetchDetail(id) {
  const json = await fetchJson(`${DETAIL_URL}/${id}`);
  return (json && (json.data || json)) || null;
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;

  async function worker() {
    while (true) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

function derivePricing(info) {
  if (!info) return { model: 'unknown', pricePerUnit: null };

  let model = 'unknown';
  const rawModel = info.pricingModel || 'UNKNOWN';
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

function classify(rawCategory, title) {
  const text = title.toLowerCase();
  for (const bucket of BUCKETS) {
    for (const keyword of bucket.keywords) {
      if (text.includes(keyword)) return bucket.name;
    }
  }
  const mapped = RAW_CATEGORY_MAP[rawCategory];
  return mapped || OTHER;
}

function loadExistingActors() {
  try {
    const raw = fs.readFileSync(ACTORS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function normalizeActor(raw, detail, existingMap) {
  const slug = raw.name || raw.id || '';
  const existing = existingMap.get(slug) || {};
  const src = detail || raw;

  const storeStats = raw.stats || {};
  const detailStats = (detail && detail.stats) || {};
  const rawCategories = Array.isArray(src.categories) ? src.categories : raw.categories || [];
  const rawCategory = (rawCategories[0] || 'uncategorized').toLowerCase();

  const title = src.title || raw.title || raw.name || 'Untitled';
  const description = src.description || raw.description || '';

  return {
    title,
    slug,
    url: raw.url || `https://apify.com/${USERNAME}/${slug}`,
    description,
    imageUrl: src.pictureUrl || raw.pictureUrl || null,
    category: rawCategory,
    displayCategory: classify(rawCategory, title),
    pricing: derivePricing(raw.currentPricingInfo),
    totalUsers: detailStats.totalUsers ?? storeStats.totalUsers ?? 0,
    totalRuns: detailStats.totalRuns ?? storeStats.totalRuns ?? 0,
    lastModified: src.modifiedAt || raw.lastModified || storeStats.lastRunStartedAt || null,
    rating: src.actorReviewRating ?? storeStats.actorReviewRating ?? null,
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

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatNumber(n) {
  if (n == null) return '0';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return '';
  }
}

function getPricingLabel(pricing) {
  const model = pricing && pricing.model;
  const price = pricing && pricing.pricePerUnit;
  if (model === 'free') return 'Free';
  if (model === 'pay-per-result') return price != null ? `From $${price}/result` : 'Pay per result';
  if (model === 'pay-per-event') return price != null ? `From $${price}/event` : 'Pay per event';
  if (model === 'monthly') return price != null ? `$${price}/mo` : 'Monthly';
  if (model && model !== 'unknown') return model.charAt(0).toUpperCase() + model.slice(1);
  return '';
}

function orderedCategoryNames(actors) {
  const counts = {};
  actors.forEach((a) => {
    const cat = a.displayCategory || OTHER;
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return Object.keys(counts).sort((a, b) => {
    if (a === OTHER) return 1;
    if (b === OTHER) return -1;
    return counts[b] - counts[a];
  });
}

function buildPillsHtml(actors, categoryNames, active) {
  const buttons = categoryNames.map((cat, index) =>
    `<button class="pill${cat === active ? ' active' : ''}" data-filter="${escapeHtml(cat)}" data-index="${index}">${escapeHtml(cat)}</button>`
  );
  return [
    `<button class="pill${active === 'all' ? ' active' : ''}" data-filter="all">All</button>`,
    ...buttons,
  ].join('\n      ');
}

function renderCardsHtml(actors, categoryNames) {
  const colorIndex = {};
  categoryNames.forEach((cat, i) => { colorIndex[cat] = i; });

  return actors.map((actor) => {
    const cat = actor.displayCategory || OTHER;
    const color = CATEGORY_COLORS[colorIndex[cat] % CATEGORY_COLORS.length];
    const pricingLabel = getPricingLabel(actor.pricing);
    const searchable = `${actor.title} ${actor.description} ${actor.category} ${actor.displayCategory || ''}`.toLowerCase();

    const thumb = actor.imageUrl
      ? `<img class="card-thumb" src="${escapeHtml(actor.imageUrl)}" alt="" loading="lazy">`
      : `<div class="card-thumb-fallback">${escapeHtml(actor.title.charAt(0))}</div>`;

    const metaItems = [];
    if (pricingLabel) metaItems.push(`<span>${escapeHtml(pricingLabel)}</span>`);
    if (actor.totalUsers) metaItems.push(`<span>${formatNumber(actor.totalUsers)} users</span>`);
    if (actor.lastModified) metaItems.push(`<span>${escapeHtml(formatDate(actor.lastModified))}</span>`);

    const deepDive = actor.hasDeepDive && actor.deepDiveUrl
      ? `<a class="btn btn-ghost" href="${escapeHtml(actor.deepDiveUrl)}" target="_blank" rel="noopener noreferrer">Read more</a>`
      : '';

    return `<article class="actor-card" id="actor-${escapeHtml(actor.slug)}" data-title="${escapeHtml(actor.title)}" data-display-category="${escapeHtml(cat)}" data-modified="${escapeHtml(actor.lastModified || '')}" data-search="${escapeHtml(searchable)}">
        <div class="card-header">
          ${thumb}
          <div class="card-header-info">
            <h3 class="card-title">${escapeHtml(actor.title)}</h3>
            <span class="card-category" style="background:${color.bg};color:${color.text}">${escapeHtml(cat)}</span>
          </div>
        </div>
        <p class="card-desc">${escapeHtml(actor.description)}</p>
        <div class="card-meta">${metaItems.join('')}</div>
        <div class="card-actions">
          <a class="btn btn-primary" href="${escapeHtml(actor.url)}" target="_blank" rel="noopener noreferrer">View on Apify</a>
          ${deepDive}
        </div>
      </article>`;
  }).join('\n      ');
}

function buildJsonLd(actors) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Apify Scrapers by Ahmed Jasarevic',
    description: `Collection of ${actors.length} public Apify actors for web scraping and automation.`,
    numberOfItems: actors.length,
    itemListElement: actors.map((actor, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: actor.title,
        url: actor.url,
        description: actor.description,
        applicationCategory: 'Web Scraping Tool',
        operatingSystem: 'Cloud',
      },
    })),
  };
  return JSON.stringify(json).replace(/<\//g, '<\\/');
}

function renderHtml(template, actors, stats, categoryNames, jsonLd) {
  const pills = buildPillsHtml(actors, categoryNames, 'all');
  const cards = renderCardsHtml(actors, categoryNames);

  return template
    .replaceAll('__ACTOR_COUNT__', String(actors.length))
    .replace('__STAT_ACTORS__', String(actors.length))
    .replace('__STAT_USERS__', String(stats.totalUsers))
    .replace('__STAT_CATEGORIES__', String(stats.categoryCount))
    .replace('__JSON_LD__', jsonLd)
    .replace('<!-- CATEGORY_PILLS -->', pills)
    .replace('<!-- ACTOR_CARDS -->', cards);
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

function printSample(actors) {
  const wanted = [
    'RemoteOK', 'ZipRecruiter', 'Redfin', 'CarGurus', 'CoinMarketCap',
    'Google News', 'Expedia', 'Linkpop', 'Companies House', 'Flipkart',
  ];

  const header = [
    'title'.padEnd(34),
    'rawCat'.padEnd(16),
    'users'.padEnd(6),
    'runs'.padEnd(6),
    'lastModified'.padEnd(14),
    'bucket',
  ].join(' | ');

  console.log('\nRay data vs written (10 sample actors):');
  console.log(header);
  console.log('-'.repeat(header.length));

  wanted.forEach((needle) => {
    const actor = actors.find((a) => a.title.includes(needle));
    if (!actor) return;
    console.log([
      actor.title.slice(0, 32).padEnd(34),
      actor.category.slice(0, 14).padEnd(16),
      String(actor.totalUsers).padEnd(6),
      String(actor.totalRuns).padEnd(6),
      (actor.lastModified || '').slice(0, 10).padEnd(14),
      actor.displayCategory,
    ].join(' | '));
  });
}

function printDistribution(actors) {
  const names = orderedCategoryNames(actors);
  console.log('\nCategory distribution:');
  names.forEach((name) => {
    const count = actors.filter((a) => a.displayCategory === name).length;
    const bar = '#'.repeat(Math.round((count / actors.length) * 40));
    console.log(`  ${name.padEnd(16)} ${String(count).padStart(3)} ${bar}`);
  });
}

function printBuckets(actors) {
  const byName = new Map();
  actors.forEach((a) => {
    const cat = a.displayCategory || OTHER;
    if (!byName.has(cat)) byName.set(cat, []);
    byName.get(cat).push(a.title);
  });
  console.log('\nPer-bucket actors:');
  byName.forEach((titles, cat) => {
    console.log(`\n=== ${cat} (${titles.length}) ===`);
    titles.forEach((t) => console.log(`  - ${t}`));
  });
}

function printDryRun(actors) {
  printDistribution(actors);
  printSample(actors);
  if (process.argv.includes('--buckets')) printBuckets(actors);

  const missingImages = actors.filter((a) => !a.imageUrl).map((a) => a.title);
  console.log(`\nActors without image (${missingImages.length}):`);
  missingImages.forEach((title) => console.log(`  - ${title}`));

  const totalUsers = actors.reduce((sum, a) => sum + (a.totalUsers || 0), 0);
  const totalRuns = actors.reduce((sum, a) => sum + (a.totalRuns || 0), 0);
  console.log(`\nSum of totalUsers: ${formatNumber(totalUsers)}  |  Sum of totalRuns: ${formatNumber(totalRuns)}`);
  console.log(`Distinct categories: ${orderedCategoryNames(actors).length}`);

  const clustered = actors.filter((a) => (a.lastModified || '').startsWith('2026-09-08') || (a.lastModified || '').startsWith('2026-09-09')).length;
  console.log(`lastModified clustered on 2026-09-08/09 (old fetch-date behavior): ${clustered}`);

  const distinctDates = [...new Set((actors.map((a) => a.lastModified || '')))].filter(Boolean).length;
  console.log(`Distinct lastModified values from detail endpoint: ${distinctDates}`);
}

async function main() {
  console.log(`Fetching store items for user "${USERNAME}"...`);
  const storeItems = await fetchAllStoreItems();
  console.log(`Fetched ${storeItems.length} actors from Apify store`);

  console.log(`Fetching per-actor details (modifiedAt, real stats)...`);
  const details = await mapWithConcurrency(storeItems, CONCURRENCY, (item) =>
    fetchDetail(item.id).catch(() => null)
  );

  const existingActors = loadExistingActors();
  const existingMap = new Map(existingActors.map((a) => [a.slug, a]));

  const normalized = storeItems.map((item, i) => normalizeActor(item, details[i], existingMap));
  const sorted = sortActors(normalized);
  console.log(`Normalized ${sorted.length} actors (keyword classifier applied)`);

  if (DRY_RUN) {
    printDryRun(sorted);
    console.log('\nDry run complete — nothing written.');
    return;
  }

  const categoryNames = orderedCategoryNames(sorted);
  const stats = {
    totalUsers: formatNumber(sorted.reduce((sum, a) => sum + (a.totalUsers || 0), 0)),
    categoryCount: categoryNames.length,
  };

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(ACTORS_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${sorted.length} actors to ${ACTORS_PATH}`);

  if (!fs.existsSync(HTML_TEMPLATE_PATH)) {
    throw new Error(`Template not found: ${HTML_TEMPLATE_PATH}`);
  }
  const template = fs.readFileSync(HTML_TEMPLATE_PATH, 'utf8');
  const html = renderHtml(template, sorted, stats, categoryNames, buildJsonLd(sorted));
  fs.writeFileSync(HTML_PATH, html, 'utf8');
  console.log(`Generated ${HTML_PATH}`);

  updateSitemapDate();

  console.log('\nDone. Commit and push to deploy.');
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});