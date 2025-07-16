import { promises as fs } from 'fs';

const writeJSON = async (filePath, content) => {
    try {
        const JSONString = JSON.stringify(content, null, 2); // pretty format
        await fs.writeFile(filePath, JSONString, 'utf-8');
        console.log("✅ Successfully written the file");
    } catch (err) {
        console.error("❌ Error writing file:", err.message);
        throw err;
    }
};

const readJSON = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("❌ Error reading or parsing file:", err.message);
        throw err;
    }
};


export {
    writeJSON,
    readJSON
}