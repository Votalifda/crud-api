import { createServer } from 'http';
import { parse } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

const server = createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);
    console.log('req');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
