const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const inputFile = 'paper.dash.org.txt';
const BcAPIToken = process.env.BC_API_TOKEN;
const BcAPI = 'https://api.blockcypher.com/v1/dash/main/addrs';

function readFile(inputFile) {
  return fs.readFileSync(inputFile, 'utf8');
};

const contents = readFile(inputFile);
const fileObj = contents
  .replace(/"/g,'')
  .replace(/ /g,'')
  .trim()
  .split('\n')
  .slice(1)
  .map(e => e.split(','))
  .map(e => e.reduce((pubPrivs) => {
    pubPrivs['pub'] = e[0];
    pubPrivs['priv'] = e[1];
    return pubPrivs;
  },{}));

const addresses = fileObj.map(e => e.pub);

const getBalance = (addr) => {
  return axios.get(`${BcAPI}/${addr}/?token=${BcAPIToken}`);
};

const kickoff = async () => {
  try {
    const ms = 20000; // time to wait between API calls
    const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

    let i = 1;
    for (let address of addresses) {
      const APIResponse = await getBalance(address);
      const balance = APIResponse.data.balance;
      const line = `${i},${address},${balance}\n`;
      fs.appendFileSync(`wallet_balances.csv`, line, 'utf8');
      console.log(`
        ${address} has a ${balance/100000000} DASH balance
        ...waiting ${ms/1000} seconds to make next request...
      `);           
      await pause(ms);
      i++;
    };
    console.log(`Finished.  ${i-1} balances retrieved`);
  } catch (error) {
    console.log(error);
  }
};

kickoff();