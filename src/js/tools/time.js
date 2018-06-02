import moment from 'moment'

export function createDate(date, subtract) {
  if (!subtract || subtract === 0)
    return moment(date)
      .format('YYYYMMDD')
      .toString()
  return moment(date)
    .subtract(subtract, 'months')
    .format('YYYYMMDD')
    .toString()
}
