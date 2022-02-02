const { events } = require('./data.json');

export default (req, res) => {
    const theEvent = events.filter(ev => ev.slug === req.query.slug);

    if (req.method === 'GET') {
        res.status(200).json(theEvent)
    } else {
        req.setHeader('Allow', ['GET']);
        res.state(405).json({ message: `Method ${req.method} is not allowed`});
    }
}
