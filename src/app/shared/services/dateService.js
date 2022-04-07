import { format } from 'date-fns'
import {utcToZonedTime } from 'date-fns-tz'

 const FORMAT_HOUR = "dd-MM-yyyy Ã  HH:mm"
 const FORMAT = "dd-MM-yyyy"
 const TIMEZONE = 'Europe/Berlin'

export function parseDateToZoneDate(date){
    if(!date) return null
    const zonedDate = utcToZonedTime(date, TIMEZONE)
    return format(zonedDate, FORMAT_HOUR, {TIMEZONE})
}

export function parseDate(date){
    if(!date) return null
    return format(new Date(date), FORMAT, {TIMEZONE})
}
