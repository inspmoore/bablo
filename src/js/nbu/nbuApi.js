import moment from 'moment'
function getRate(date) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${date}&json`
    ).then(
      res => {
        res.json().then(json => {
          resolve({
            rate: json[0].rate,
            date: json[0].exchangedate,
            formatedDate: moment(json[0].exchangedate, 'DD.MM.YYYY').format(
              'D MMMM'
            )
          })
        })
      },
      error => {
        reject({ error })
      }
    )
  })
}

export function get3Rates(dates) {
  return Promise.all([getRate(dates[0]), getRate(dates[1]), getRate(dates[2])])
}
