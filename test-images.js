const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1516826957135-733181150534?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1434389678232-040224d081b8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1502716115624-b433e0e59a68?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1585045084931-df2ebcd11dbb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800"
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
  console.log("Done checking.");
}
run();
