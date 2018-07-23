const moment = require("moment");
const fetch = require("node-fetch");
/* @desc fetches a rate of dollar in hrynias from the National Bank of Ukraine public API
    @param date - date of the rate to be fetched
 */
function getRate(date) {
  console.log(date);

  return new Promise((resolve, reject) => {
    fetch(
      `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${date}&json`
    )
      .then(
        res => {
          res.json().then(json => {
            console.log("json", json);
            resolve({
              rate: json[0].rate,
              date: json[0].exchangedate
            });
          });
        },
        error => {
          console.log("nbu fetch error", error);

          reject({ error });
        }
      )
      .catch(e => reject(e));
  });
}

function createDate(date, subtract) {
  if (!subtract || subtract === 0)
    return moment(date, "YYYYMMDD")
      .format("YYYYMMDD")
      .toString();
  return moment(date, "YYYYMMDD")
    .subtract(subtract, "months")
    .format("YYYYMMDD")
    .toString();
}

function get3Rates(date) {
  const dates = [
    getRate(createDate(date, 2)),
    getRate(createDate(date, 1)),
    getRate(createDate(date))
  ];
  return Promise.all(dates);
}
module.exports = get3Rates;
