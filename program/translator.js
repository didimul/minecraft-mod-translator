const translator = require('google-translate-api-x');
const colors = require('colors');
const FileManager = require('./fileManager')
const fileManager = new FileManager();

// google переводчик
async function googleTranslate(input, FROM_LANG, TO_LANG) {
    try {
        const res = await translator.translate(input, {from: FROM_LANG, to: TO_LANG});
        return res.text;
    } catch(err) {
        console.log('GOOGLE TRANSLATE ERR:', err);
        return input;
    }
}

// прогресс бар
function createProgressBar(percent, length) {
    const filled = Math.round((percent / 100) * length);
    const empty = length - filled;
    return `[${'━'.repeat(filled)}${' '.repeat(empty)}]`;
}

// перевод и запись
async function translation() {
    const modFile = await fileManager.readModFile();

    const modKeys = Object.keys(modFile);
    const modValues = Object.values(modFile);
    const modValuesLength = modValues.length;
    const translatedMod = {}

    const init = await fileManager.readInitFile();
    const FROM_LANG = init.fromLang;
    const TO_LANG = init.toLang;

    let counter = 0;
    for(let i = 0; i < modValuesLength; i++) {
        const data = await googleTranslate(modValues[i], FROM_LANG, TO_LANG);
        translatedMod[modKeys[i]] = data;

        counter++;
        const percent = Math.round((counter / modValuesLength) * 100);
        const progress = createProgressBar(percent, 50);

        process.stdout.write('\x1B[1A\x1B[0K');
        console.log(colors.green(progress), `${counter}/${modValuesLength} | [${percent}%]`);
    }

    fileManager.saveTranslatedModFile(translatedMod);
}

translation();