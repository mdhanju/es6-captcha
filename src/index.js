'use strict';

const chToPath = require('./ch-to-path');
const random = require('./random');

const getLineNoise = function(lv, width, height) {
    const noiseString = [];
    let i = -1;

    while (++i < lv) {
        const start = `${random.int(5, 25)} ${random.int(10, height - 10)}`;
        const end = `${random.int(width - 25, width - 5)} ${random.int(10, height - 10)}`;
        const mid1 = `${random.int((width / 2) - 25, (width / 2) + 25)} ${random.int(10, height - 10)}`;
        const mid2 = `${random.int((width / 2) - 25, (width / 2) + 25)} ${random.int(10, height - 10)}`;
        const color = random.greyColor();
        noiseString.push(`<path d="M${start} C${mid1},${mid2},${end}"
            stroke="${color}" fill="transparent"/>`);
    }

    return noiseString.join('');
};

const getSVGOptions = function(height) {
    return {
        y: height / 2,
        fontSize: height
    };
};

const getText = function(text, width, height, options) {
    const len = text.length;
    const charColor = options.color || 'black';
    const spacing = (width - 2) / (len + 1);
    let i = -1;
    const out = [];

    while (++i < len) {
        const charPath = chToPath(text[i], getSVGOptions(height));
        // randomly and evenly space out the characters
        const spacePos = spacing * (i + 1);
        const transform = random.int(spacePos - 2, spacePos + 4);
        const color = random.greyColor(0, 4);
        out.push(`<path fill="${charColor}" d="${charPath}" stroke="${charColor}"
            transform="translate(${transform})"/>`);
    }

    return out.join('');
};

const createCaptcha = function(options) {
    if (typeof options === 'string') {
        options = { text: options };
    }
    options = options || {};
    const width = options.width || 150;
    const height = options.height || 50;
    const noiseLv = options.noise || 1;
    const text = options.text || random.captchaText();

    const lineNoise = getLineNoise(noiseLv, width, height);
    const textPath = getText(text, width, height, options);
    const xml = `<svg xmlns="http://www.w3.org/2000/svg"
        width="${width}" height="${height}">
            ${textPath}
        </svg>`;

    return xml.replace(/[\t]/g, '').replace(/\n(\W)/g, '$1');
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
module.exports.captchaNumber = random.captchaNumber;
