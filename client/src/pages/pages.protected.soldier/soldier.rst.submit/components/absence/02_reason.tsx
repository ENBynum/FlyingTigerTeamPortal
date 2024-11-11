import { Textarea } from '@mantine/core'
import { ReactNode } from 'react'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'



export default function Reason(): ReactNode {
	const form = useRSTFormContext()
	
	return <>
		<Textarea
			id={'#rst-absence-reason'}
			w={'100%'}
			rows={3}
			label={'Absence Reason'}
			required
			key={form.key('absence_reason')}
			{...form.getInputProps('absence_reason')}
			error={form.errors.absence_reason}
		/>
	</>
}