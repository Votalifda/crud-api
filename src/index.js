import { createServer } from 'http';
import { parse } from 'url';
import { v4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;
const users = [];

const server = createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);

    try {
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
        } else if (pathname === '/api/users' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => body += chunk.toString());
            req.on('end', () => {
                try {
                    const newUser = JSON.parse(body);
                    if (isValidUser(newUser)) {
                        newUser.id = v4();
                        users.push(newUser);
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(newUser));
                    } else {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Invalid user data' }));
                    }
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid JSON format in request body' }));
                }
            });
        } else if (pathname.startsWith('/api/users/') && req.method === 'PUT') {
            const userId = pathname.split('/').pop();
            if (userId) {
                const userIndex = users.findIndex((user) => user.id === userId);

                if (userIndex !== -1) {
                    let body = '';
                    req.on('data', (chunk) => body += chunk.toString());
                    req.on('end', () => {
                        try {
                            const updatedUser = JSON.parse(body);
                            if (isValidUser(updatedUser)) {
                                users[userIndex] = { ...users[userIndex], ...updatedUser };
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify(users[userIndex]));
                            } else {
                                res.writeHead(400, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Invalid user data' }));
                            }
                        } catch (error) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Invalid JSON format in request body' }));
                        }
                    });
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid User Id' }));
            }
        } else if (pathname.startsWith('/api/users/') && req.method === 'DELETE') {
            const userId = pathname.split('/').pop();
            if (userId) {
                const userIndex = users.findIndex((user) => user.id === userId);
                if (userIndex !== -1) {
                    users.splice(userIndex, 1);
                    res.writeHead(204);
                    res.end();
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
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function isValidUser(user) {
    return (
        user &&
        typeof user.username === 'string' &&
        typeof user.age === 'number' &&
        Array.isArray(user.hobbies)
    );
}