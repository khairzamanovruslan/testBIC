import AdmZip from 'adm-zip';

export const extractedFromArchiveUtility = async () => {
    try {
        const zip = new AdmZip("./share/1.zip");
        zip.extractAllTo('./share', );
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}