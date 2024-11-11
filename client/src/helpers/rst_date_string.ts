import { DateTime } from 'luxon'

import { RSTRequest } from '../types/rst'



type RSTField = 'absence_dates' | 'makeup_dates' | 'soldier_signature_date' | 'supervisor_signature_date' | 'commander_signature_date'

export default function RSTDateString(data: RSTRequest, field: RSTField): string {
    if (field === 'absence_dates') {
        const start = DateTime.fromISO(data.absence_dates[0])
        const end = DateTime.fromISO(data.absence_dates[1])
        if (start.day === end.day && start.month === end.month) {
            return `${start.day} ${start.monthLong} ${start.year}`
        } else {
            if (start.month === end.month) {
                return `${start.day} - ${end.day} ${start.monthLong} ${end.year}`
            } else {
                return `${start.day} ${start.monthShort} - ${end.day} ${end.monthShort} ${end.year}`
            }
        }
    } else if (field === 'makeup_dates') {
        const start = DateTime.fromISO(data.makeup_dates[0])
        const end = DateTime.fromISO(data.makeup_dates[1])
        if (start.day === end.day && start.month === end.month) {
            return `${start.day} ${start.monthLong} ${start.year}`
        } else {
            if (start.month === end.month) {
                return `${start.day} - ${end.day} ${start.monthLong} ${end.year}`
            } else {
                return `${start.day} ${start.monthShort} - ${end.day} ${end.monthShort} ${end.year}`
            }
        }
    } else if (field === 'soldier_signature_date') {
        if (data.soldier_signature_date) {
            const date = DateTime.fromISO(data.soldier_signature_date)
            return `${date.day} ${date.monthLong} ${date.year}`
        }
    } else if (field === 'supervisor_signature_date') {
        if (data.supervisor_signature_date) {
            const date = DateTime.fromISO(data.supervisor_signature_date)
            return `${date.day} ${date.monthLong} ${date.year}`
        }
    } else if (field === 'commander_signature_date') {
        if (data.commander_signature_date) {
            const date = DateTime.fromISO(data.commander_signature_date)
            return `${date.day} ${date.monthLong} ${date.year}`
        }
    }

    return ''
}