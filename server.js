const express = require('express');

const app = express();

app.use(express.static('./dist/portfolio2020'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/portfolio2020/'}),
);

app.listen(process.env.PORT || 8080);
