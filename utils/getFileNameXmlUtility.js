import * as fs from "fs";
import * as path from "path";

const fileNameXml = (files) => {
    const result = files.filter((item) => {
        if (item.indexOf('xml') !== -1) {
            return item;
        }
    })
    return result[0];
}

export const getFileNameXmlUtility = async () => {
    try {
        const directory = path.join('./share');
        const files = await fs.promises.readdir(directory, (err, files) => files);
        const fileName = fileNameXml(files);
        return fileName;
    } catch (e) {
        console.log(e)
    }
}