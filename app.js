const express = require('express');
// const fs = require('fs');
const app = express();

let visitorCount = 0;

// LEVEL 1
app.get('/visit', (req, res) => {
    visitorCount++;
    res.send('Visited successfully.');
});

app.get('/visited', (req, res) => {
    res.send(`Total visitors: ${visitorCount}`);
});

app.listen(3007, () => {
    console.log('Server started on port 3007');
});


// LEVEL 2
fs.readFile('visitorCount.json', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
    } else {
        const countData = JSON.parse(data);
        visitorCount = countData.count;
        console.log('Visitor count loaded:', visitorCount);
    }
});

app.get('/visit', (req, res) => {
    visitorCount++;
    res.send('Visited successfully.');

    const countData = { count: visitorCount };
    fs.writeFile('visitorCount.json', JSON.stringify(countData), 'utf8', (err) => {
        if (err) {
            console.log('Error writing file:', err);
        }
    });
});

app.get('/visited', (req, res) => {
    res.send(`Total visitors: ${visitorCount}`);
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});



