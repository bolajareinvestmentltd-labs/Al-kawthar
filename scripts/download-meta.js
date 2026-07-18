const https = require('https');
const fs = require('fs');

console.log('Downloading Quran Database...');
https.get('https://api.alquran.cloud/v1/surah', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const parsed = JSON.parse(data);
    fs.writeFileSync('./src/data/surah-meta.json', JSON.stringify(parsed.data, null, 2));
    console.log('✅ Offline Quran Database Secured in src/data!');
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
