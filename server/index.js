const http = require('http');

const server = http.createServer((request, response) => {
	response.end('Hello))');
});

server.listen(8888, () => {
	console.log('server has started...');
});
