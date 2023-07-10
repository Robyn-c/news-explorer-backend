const https = require('https');

const WeekInMs = 7 * 24 * 60 * 60 * 1000;
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0',
    Authorization: 'Bearer ed4390ffc54146c7a2ff5ea1673c8b01',
  },
};
const NewsApiConfig = {
  baseUrl: 'https://nomoreparties.co/news/v2/everything?language=en&pageSize=100',
  headers: {
    Authorization: 'Bearer ed4390ffc54146c7a2ff5ea1673c8b01',
  },
};
const today = () => new Date().toISOString();
const sevenDaysAgo = () => new Date(Date.now() - WeekInMs).toISOString();
const getUrl = (query) => `${NewsApiConfig.baseUrl}&from=${sevenDaysAgo()}to=${today()}&q=${query}`;

module.exports.getNews = (req, res) => {
  https
    .get(getUrl(req.body.query), options, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        console.log(JSON.parse(data));
        res.send(JSON.parse(data));
      });
    })
    .on('error', (err) => {
      console.log(`Error: ${err.message}`);
    });
};
