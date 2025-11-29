const fs = require('fs').promises
const path = require('path');

module.exports = class FileManager {
    // читает файл language и задает перевод
    async readInitFile() {
        try {
            const fileBuffer = await fs.readFile(path.relative('', '../language/language.json'));
            const initJSON = JSON.parse(fileBuffer);
            return initJSON;
        } catch(err) {
            console.log('LANGUGE FILE READ ERR:', err);
        }
    }

    #out = {
        EN: 'The program has finished its work. You can pick up the translation from the "_output" folder',
        RU: 'Программа завершила свою работу. Вы можете забрать перевод из папки "_output"',
        AUTHOR: 'https://github.com/didimul (github didimul) (автор)'
    }

    // читает оригинальный файл (без перевода)
    async readModFile() {
        try {
            const INIT = await this.readInitFile();

            const fileBuffer = await fs.readFile(path.resolve('', `../_input/${INIT.inputFile}`));
            const modJSON = JSON.parse(fileBuffer);
            return modJSON
        } catch(err) {
            console.log('FILE READ ERR:', err);
        }
    }

    // сохраняет переведенный файл (например, ru_ru.json)
    async saveTranslatedModFile(data) {
        try {
            const INIT = await this.readInitFile();

            await fs.writeFile(path.resolve('', `../_output/${INIT.outputFile}`), JSON.stringify(data, null, 2));
            console.log(this.#out);
        } catch(err) {
            console.log('SAVE FILE ERR:', err);
        }
    }
} 