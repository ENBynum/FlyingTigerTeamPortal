import { DateTime } from 'luxon'

import { Drill } from '../types/unit'



export default function DrillDateString(data: Drill): string {
    const start = DateTime.fromISO(data.start_date)
    const end = DateTime.fromISO(data.end_date)
    if (start.day === end.day && start.month === end.month) {
        return `${start.day} ${start.monthLong} ${start.year}`
    } else {
        if (start.month === end.month) {
            return `${start.day} - ${end.day} ${start.monthLong} ${end.year}`
        } else {
            return `${start.day} ${start.monthShort} - ${end.day} ${end.monthShort} ${end.year}`
        }
    }
}