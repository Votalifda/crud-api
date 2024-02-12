import { createServer } from 'http';
import { parse } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;
const users = [];

const server = createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);

    if (pathname === '/api/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (pathname.startsWith('/api/users/') && req.method === 'GET') {
        const userId = pathname.split('/').pop();
        if (userId) {
            const user = users.find((user) => user.id === userId);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid User Id' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('URL Not Found');
    }

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
