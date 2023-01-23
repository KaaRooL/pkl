import { NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest } from 'next';

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
  console.log('body: ', body)

  const rows = [body.company, body.name, body.email, body.phone];

  //csv generation to move
  let csvContent = "data:text/csv;charset=utf-8," + rows.join(",");
  var encodedUri = encodeURI(csvContent);
  //

  processFile(body);

  res.status(200).json({ data: encodedUri })
}