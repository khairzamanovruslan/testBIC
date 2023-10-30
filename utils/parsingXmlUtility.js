import * as fs from "fs";
import * as path from 'path';
import * as xml2js from 'xml2js';
import { fileURLToPath } from 'url';
import iconv from 'iconv-lite';

const handleFilterByAccount = async (data) => {
    const dataPrepear = await xml2js.parseStringPromise(data);
    const result = dataPrepear.ED807.BICDirectoryEntry.filter(item => {
        if ('Accounts' in item) {
            return item;
        }
    })
    return result;
}

const handleDataPrepear = async (data) => {
    const result = data.map((item) => {
        const bic = item.$.BIC;
        const name = item.ParticipantInfo[0].$.NameP;
        const accountsArr = item.Accounts.map(element => {
            return { bic, name, corrAccount: element.$.Account };
        });
        return accountsArr;
    })
    return result;
}

export const parsingXmlUtility = async (fileNameXml) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const pathFileXml = path.join(__dirname, '..', 'share', fileNameXml);
        const dataFromFile = await fs.promises.readFile(pathFileXml);
        const decodedText = iconv.decode(dataFromFile, 'Windows-1251')
        const dataFilteredByAccount = await handleFilterByAccount(decodedText);
        const dataPrepear = await handleDataPrepear(dataFilteredByAccount);
        const handleDataResult = async (data) => data.flat();
        const dataResult = await handleDataResult(dataPrepear);
        return dataResult;
    } catch (e) {
        console.log(e)
    }
}