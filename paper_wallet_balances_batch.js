const fs = require('fs');
const axios = require('axios');
const json2csv = require('json2csv');
require('dotenv').config();

const inputFile = 'paper.dash.org.txt';
const BcAPIToken = process.env.BC_API_TOKEN;
const BcAPI = 'https://api.blockcypher.com/v1/dash/main/addrs';
const outputFile = 'wallet_balances.csv';

function readFile(inputFile) {
    return fs.readFileSync(inputFile, 'utf8');
};

const contents = readFile(inputFile);
const fileObj = contents
    .replace(/\"/g,"")
    .replace(/ /g,"")
    .trim()
    .split('\n')
    .slice(1)
    .map(e => e.split(','))
    .map(e => e.reduce(pubPrivs => {
        pubPrivs["pub"] = e[0];
        pubPrivs["priv"] = e[1];
        return pubPrivs
    },{}));
    
const addresses = fileObj.map(e => e['pub']);

const getBalance = (addr) => {
    return axios.get(`${BcAPI}/${addr}/?token=${BcAPIToken}`)
};

const getBalances = () => {
    return addresses.map(addr => {
        return getBalance(addr).then(res => {
            return res.data.balance
        });
    });
};

const buildBalanceObj = (balances) => {
    return balances.map((b,i) => {
        const o = {};
        o.id = i+1;
        o.address = addresses[i];
        o.balance = b;
        return o
    })
}

const formatData = (data) => {
    let fields = ['id', 'address', 'balance'];
    let csv = json2csv({ data, fields });
    return csv;
}

const outputData = (csv) => {
    fs.writeFile(outputFile, csv, (err) => {
        if (err) throw err;
        else console.log('file saved');
    });
};

const kickoff = async () => {
    try {
        const balances = await axios.all(getBalances())
        const balanceObj = await buildBalanceObj(balances);
        const csv = formatData(balanceObj);
        outputData(csv);
    } catch (error) {
        console.log(error);
    }
};

kickoff();
