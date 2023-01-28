import fs from "fs";
import { readFile } from 'fs/promises';

import path from 'path';
import auth from "express-basic-auth";
import initMiddleware from '../../utils/middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { json } from "stream/consumers";
import { stringify } from "querystring";

async function fileReader() {  

  try {
    const fileContents = await readFile('./data/leads.json', { encoding: 'utf8' });
    return fileContents;

  } catch (err) {
    console.error(err);
  }  
}



let user = process.env.USER_NAME || "";
let password = process.env.PASSWORD || "";

const basicAuth = auth({
  users: { [user]: password },
  challenge: true
});

const authMiddleware = initMiddleware(basicAuth);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (user && password) {
    await authMiddleware(req, res);
  }
  const fileName = 'leads.json';

  if (!fileName) {
    return res.status(404).send("File not found");
  }

  const decodedFileName = decodeURIComponent(fileName as string);
  const filePath = path.join(process.cwd(), `./data/${fileName}`);

  try {
    fs.accessSync(filePath, fs.constants.R_OK);
  } catch (err) {
    return res.status(404).send("File not found");
  }

  const content = await fileReader() ?? ''
  const header = "Nazwa placowki,Imie i nazwisko,Telefon,Email"

  const rows: [Lead] = JSON.parse(content);  
  let csvFormatArray = rows.map(r => `${r.company},${r.name},${r.phone},${r.email}`)
  
  csvFormatArray.unshift(header)
  const csvFormat = csvFormatArray.join("\r\n")
  let csvContent = csvFormat;
  csvContent = Buffer.from(csvContent, 'utf-8').toString();
  
  res.setHeader(
    "content-disposition",
    `attachment; filename=leads.csv`,
  );

  res.setHeader(
    "content-type","text/csv; charset=UTF-8",
  );
  

  res.send(csvContent);
};

export default handler;

interface Lead{
  company: string,
  name: string,
  email: string,
  phone: string
}