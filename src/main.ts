import express, { response } from 'express';
import { Request, Response } from 'express-serve-static-core';
import Album from './models/album';
import Photo from './models/photos';
import User from './models/user';


const app = express();

function middleware(req: Request, res: Response): void {
  const a = 3;
  console.log(a);
  res.end('Fin de la réponse');
}

async function run() {
  // const album = await Album.findById(1, ['user', 'photos']);
  // const title = await Album.findAlbumsByUserId(1, ['user', 'photos']);
  const test = new Album(1, 5, 'yay!');
  Album.find().then((resulat: any) => {
    console.log(resulat);
  });
  // console.log(album);
  // console.log(title);
}
run().catch((err) => {
  console.error(err);
});


app.use(middleware);

app.listen('8080');
