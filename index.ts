import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port: number = 3000;

// Rest API
app.get("/articles", (req: Request, res: Response) => {
    res.json({
        code: 200,
        message: "Thanh cong!",
        articles: []
    });
});

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
})