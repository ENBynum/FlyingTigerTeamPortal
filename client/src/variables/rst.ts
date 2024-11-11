export const ABSENCE_TYPES = ['Excused/Absence Authorized', 'Excused/RST Authorized', 'Excused/ET Authorized', 'Exception of Unexcused Absence']
export const ABSENCE_TYPE_TOOLTIPS = [
    {
        type: 'Excused/Absence Authorized',
        tooltips: ['IAW AR 135-91, Para 4-2']
    },
    {
        type: 'Excused/RST Authorized',
        tooltips: [
            'IAW AR 140-1, Para 3-12',
            'To be made up on the dates below',
            'Reason must support unit/section mission'
        ]
    },
    {
        type: 'Excused/ET Authorized',
        tooltips: [
            'IAW AR 140-1, Para 3-11',
            'To be made up within 60 days'
        ]
    },
    {
        type: 'Exception of Unexcused Absence',
        tooltips: [
            'IAW AR 135-91, Para 4-10',
            'ET required on approval',
            'To be made up on the dates below'
        ]
    }
]
export const MAKEUP_UNIFORMS = ['ACU', 'PT', 'ASU']