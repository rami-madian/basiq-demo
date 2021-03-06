const axios = require('axios');
const qs = require('qs');
const { createUser, connect, fetchAccounts } = require('./api');

const data = qs.stringify({
    'scope': 'SERVER_ACCESS'
})

const config = {
    method: 'post',
    url: 'https://au-api.basiq.io/token',
    headers: {
        'Authorization': `Basic ${process.env.API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'basiq-version': '2.0'
    },
    data: data
};

module.exports = {
    callBasiqApi: async () => {
        return new Promise((resolve, reject) => {
            axios(config)
            .then(async (response) => {
                process.env.ACCESS_TOKEN = response.data.access_token
                console.log(response.data.access_token);
                const userId = await createUser('bighead@hooli.com', '+61424609234');
                await connect(userId);
                const aggregatedData = await fetchAccounts(userId);
                resolve(aggregatedData);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })            
        })
    }
}