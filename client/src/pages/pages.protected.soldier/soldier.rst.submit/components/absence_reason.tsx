import { Textarea } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'
import { useRSTFormContext } from '../soldier.rst.submit.form.ts'



interface Props {
	width?: CSSProperties['width']
	rows?: number
}


export default function AbsenceReason({ width, rows }: Props): ReactNode {
	const form = useRSTFormContext()
	
	return <>
		<Textarea
			id={'#rst-absence-reason'}
			w={width || '100%'}
			rows={rows || 3}
			label={'Absence Reason'}
			required
			key={form.key('absence_reason')}
			{...form.getInputProps('absence_reason')}
			error={form.errors.absence_reason}
		/>
	</>
}