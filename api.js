const axios = require('axios');
const qs = require('qs');

// Step 1: Create a user.
const createUser = async (email, mobile) => {
    const data = JSON.stringify({
        email,
        mobile
    });

    var config = {
        method: 'post',
        url: 'https://au-api.basiq.io/users',
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data
    };
    return new Promise((resolve, reject) => {
        axios(config)
        .then(function (response) {
            console.log(response.data);
            resolve(response.data.id);
        })
        .catch(function (error) {
            console.log(error);
            reject(error);
        });
    })

}

// Step 2: Connect to Basiq API
const connect = async (userId) => {
    const data = JSON.stringify({
        "loginId": "gavinBelson",
        "password": "hooli2016",
        "institution": {
            "id": "AU00000"
        }
    });

    const config = {
        method: 'post',
        url: `https://au-api.basiq.io/users/${userId}/connections`,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data
    };
    return new Promise((resolve, reject) => {
        axios(config)
        .then(function (response) {
            console.log(response.data);
            resolve(response.data);
        })
        .catch(function (error) {
            console.log(error);
            reject(error);
        });
    });
}

// Step 3: Fetch user accounts.
const fetchAccounts = async (userId) => {
    const config = {
        method: 'get',
        url: `https://au-api.basiq.io/users/${userId}/accounts`,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Accept': 'application/json'
        }
    };
    return new Promise((resolve, reject) => {
        axios(config)
        .then(function (response) {
            console.log(response.data);
            resolve(response.data);
        })
        .catch(function (error) {
            console.log(error);
            reject(error);
        });
    })
}

module.exports = {
    createUser,
    connect,
    fetchAccounts
}