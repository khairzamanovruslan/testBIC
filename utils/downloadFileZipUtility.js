import fetch from 'node-fetch';
import * as fs from "fs";
import { pipeline } from 'node:stream';
import { promisify } from 'node:util'

export const downloadFileZipUtility = async (url) => {
    try {
        const streamPipeline = promisify(pipeline);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
        await streamPipeline(response.body, fs.createWriteStream('./share/1.zip'));
        return true;
    } catch (e) {
        console.log(e)
    }
}