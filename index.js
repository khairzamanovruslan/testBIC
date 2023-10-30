import { clearSharaUtility } from './utils/clearSharaUtility.js';
import { downloadFileZipUtility } from './utils/downloadFileZipUtility.js';
import { extractedFromArchiveUtility } from './utils/extractedFromArchiveUtility.js';
import { parsingXmlUtility } from './utils/parsingXmlUtility.js';
import { getFileNameXmlUtility } from './utils/getFileNameXmlUtility.js';

const start = async () => {
    const DOWNLOAD_URL = encodeURI('http://www.cbr.ru/s/newbik');
    await clearSharaUtility();
    await downloadFileZipUtility(DOWNLOAD_URL);
    await extractedFromArchiveUtility();
    const fileNameXml = await getFileNameXmlUtility();
    const dataResult = await parsingXmlUtility(fileNameXml);
    console.log('Результат: ', dataResult);
}

start()