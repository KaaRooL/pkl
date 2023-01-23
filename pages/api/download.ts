import fs from "fs";
import { readFile } from 'fs/promises';

import path from 'path';
import auth from "express-basic-auth";
import initMiddleware from '../../utils/middleware';
import { NextApiRequest, NextApiResponse } from 'next';

async function fileReader() {  

  try {
    const filePath = new URL('./data/leads.json');
    const fileContents = await readFile(filePath, { encoding: 'utf8' });
    return fileContents;

  } catch (err) {
    console.error(err);
  }  
}


const user = process.env.ADMIN_USERNAME || "";
const password = process.env.ADMIN_PASSWORD || "";

const basicAuth = auth({
  users: { [user]: password },
  challenge: true
});

const authMiddleware = initMiddleware(basicAuth);


export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("helo");

  if (user && password) {
    authMiddleware(req, res);
  }
  const {
    query: { file_name: fileName }
  } = req;

  if (!fileName) {
    return res.status(404).send("File not found");
  }

  const decodedFileName = decodeURIComponent(fileName as string);
  const filePath = path.join(process.cwd(), `./data/${decodedFileName}`);

  try {
    fs.accessSync(filePath, fs.constants.R_OK);
  } catch (err) {
    return res.status(404).send("File not found");
  }

  const content = fs.readFileSync(filePath);

  res.setHeader(
    "content-disposition",
    `attachment; filename=${decodedFileName}`
  );
  res.send(content);
}