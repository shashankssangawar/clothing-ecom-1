const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600"
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({url, status: res.statusCode});
    }).on('error', (e) => {
      resolve({url, status: 500});
    });
  });
}

async function run() {
  for (const url of urls) {
    const res = await checkUrl(url);
    if (res.status !== 200 && res.status !== 302) {
      console.log("FAILED:", url, res.status);
    }
  }
  console.log("Done checking categories.");
}
run();
