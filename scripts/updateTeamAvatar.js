const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const AVATAR_JSON_PATH = path.resolve(__dirname, '../src/pages/team/languages.json');
const OUTPUT_DIR = './static/img/team';
const RELATIVE_PATH_PREFIX = '/img/team/';

async function ensureDirectoryExists(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Request error, status code: ${response.statusCode}`));
        return;
      }

      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.startsWith('image/')) {
        reject(new Error(`Invalid content type: ${contentType}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => { });
      reject(err);
    });
  });
}


async function processAvatars() {
  try {
    await ensureDirectoryExists(OUTPUT_DIR);
    const data = await readFile(AVATAR_JSON_PATH, 'utf8');
    const jsonData = JSON.parse(data);

    if (jsonData.en && jsonData.en.pmc) await avatarSectionProcess(jsonData.en.pmc)
    if (jsonData.en && jsonData.en.committer) await avatarSectionProcess(jsonData.en.committer)

    await writeFile(AVATAR_JSON_PATH, JSON.stringify(jsonData, null, 2));
    console.log('JSON update!');
  } catch (err) {
    console.error('Error cause:', err);
  }
}

async function avatarSectionProcess(avatarList) {
  if (!Array.isArray(avatarList)) {
    throw new Error('Invalid json');
  }

  for (let i = 0; i < avatarList.length; i++) {
    const item = avatarList[i];
    if (!item.avatarUrl) continue;

    try {
      const url = item.avatarUrl;
      const ext = path.extname(url) || '.png';
      const filename = `avatar_${Date.now()}_${i}${ext}`;
      const outputPath = path.join(OUTPUT_DIR, filename);

      await downloadImage(url, outputPath);

      item.avatarUrl = RELATIVE_PATH_PREFIX + filename;
      console.log(`Download success: ${url} -> ${item.avatarUrl}`);
    } catch (err) {
      console.error(`Download failed ${item.avatarUrl}: ${err.message}`);
    }
  }
}

processAvatars();
