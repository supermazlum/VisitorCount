const express = require('express');
const fs = require('fs');
const app = express();

let visitorCount = 0;
const countFilePath = 'visitorCount.json';

try {
    const data = fs.readFileSync(countFilePath, 'utf8');
    const countData = JSON.parse(data);
    visitorCount = countData.count;
    console.log('Visitor count loaded:', visitorCount);
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('File not found. Starting with visitorCount:', visitorCount);
        saveVisitorCount();
    } else {
        console.log('Error reading file:', err);
    }
}

function saveVisitorCount() {
    const countData = { count: visitorCount };
    fs.writeFileSync(countFilePath, JSON.stringify(countData), 'utf8');
    console.log('Visitor count saved.');
}

app.get('/visit', (req, res) => {
    visitorCount++;
    res.send('Visited successfully.');
    saveVisitorCount();
});

app.get('/visited', (req, res) => {
    res.send(`Total visitors: ${visitorCount}`);
});

app.listen(3007, () => {
    console.log('Server started on port 3007');
});
