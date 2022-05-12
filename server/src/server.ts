import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(bodyParser.json({ limit: '500kb' }));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("HTTP server running!");
});