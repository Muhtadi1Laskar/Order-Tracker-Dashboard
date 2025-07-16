import fs from 'fs';

const writeJSON = (filePath, content) => {
    const JSONString = JSON.stringify(content);

    fs.writeFile(filePath, JSONString, (err) => {
        if(err) {
            console.log("Error writing file", err);
            return;
        }
        console.log("Successfully written the file");
    });
}

const readJSON = (filePath) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            console.log("Error reading file", err);
        }
        try {
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch(parseError) {
            console.error("Error parsing JSON: ", parseError);
        }
    });
}

export {
    writeJSON,
    readJSON
}