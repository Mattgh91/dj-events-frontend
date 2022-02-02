const { events } = require('./data.json');

export default (req, res) => {
    if (req.method === 'GET') {
        res.status(200).json(events)
    } else {
        req.setHeader('Allow', ['GET']);
        res.state(405).json({ message: `Method ${req.method} is not allowed`});
    }
}
