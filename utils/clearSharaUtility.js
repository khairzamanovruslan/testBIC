import * as fs from "fs";
import * as path from "path";

export const clearSharaUtility = async () => {
    try {
        const directory = path.join('./share');
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}