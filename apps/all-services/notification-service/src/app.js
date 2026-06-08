import express from 'express';
const app = express();


// health - route --->
app.get('/', (req, res) => {
    res.send(`Notification service is up and running`);
});

export default app;