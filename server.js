const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running in ${MODE} mode, listening on port ${PORT}...`);
});
