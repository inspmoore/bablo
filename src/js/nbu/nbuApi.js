import moment from 'moment'
import { createDate } from '../tools/time'
/* @desc fetches a rate of dollar in hrynias from the National Bank of Ukraine public API
    @param date - date of the rate to be fetched
 */
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

export function get3Rates(date) {
  const dates = [
    getRate(createDate(date, 2)),
    getRate(createDate(date, 1)),
    getRate(createDate(date))
  ]
  return Promise.all(dates)
}
