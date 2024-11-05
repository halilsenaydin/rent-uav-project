import express from 'express'
import path from 'path';

const app = express();
const __dirname = path.resolve();
app.use(express.static(__dirname + '/baykar-iha-angular/browser'))
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/baykar-iha-angular/browser/index.html'));
});

app.listen(8001, () => {
	console.log('listening on port 8001 for baykar iha angular');
});