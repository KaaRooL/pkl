import { NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest } from 'next';
import sendEmail from '../../utils/mailing-service';

async function fileReader() {
  const fileContents = await fs.readFile('./data/leads.json', 'utf8');
  return fileContents;
}

async function saveData(leads: any) {
  await fs.writeFile('data/leads.json', JSON.stringify(leads, null, 4));
}

const processFile = async (lead: any) => {
  await fileReader().then(res => {
    let parsedResponse = JSON.parse(res)

    let leadJson = JSON.parse(JSON.stringify(lead, null, 4));
    parsedResponse.push(leadJson)
    saveData(parsedResponse);
  })
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const body = req.body
  processFile(body);
  sendEmail(body);

  res.status(200).json({ data: "DONE" })
}