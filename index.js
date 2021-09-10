const { callBasiqApi } = require('./app');

exports.handler = async (event) => {
    const data = await callBasiqApi();
    return data;
};
