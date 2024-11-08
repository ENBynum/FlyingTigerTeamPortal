import { useDispatch, useSelector } from 'react-redux'

import { Select } from '@mantine/core'

import { AppDispatch, RootState } from '../../../../store/main'
import { CommissionedRanks, EnlistedRanks, WarrantRanks } from '../../../../utils/variables/profile'
import { useRegisterFormContext } from '../../utils/register-form'
import { setRanks } from '../../utils/register-slice'



export default function UserRank(): JSX.Element {
    const form = useRegisterFormContext()
    const register = useSelector((state: RootState) => state.register)
    const dispatch = useDispatch<AppDispatch>()

    function handleSearch(value: string) {
        function filterRanks(rank: string): boolean {
            return rank.startsWith(value.toUpperCase().trim())
        }

        const filtered_ranks: { group: string, items: string[] }[] = []
        const filtered_enlisted = EnlistedRanks.filter(filterRanks)
        const filtered_warrant = WarrantRanks.filter(filterRanks)
        const filtered_commissioned = CommissionedRanks.filter(filterRanks)

        if (filtered_enlisted.length !== 0) filtered_ranks.push({ group: 'Enlisted', items: filtered_enlisted })
        if (filtered_warrant.length !== 0) filtered_ranks.push({ group: 'Warrant', items: filtered_warrant })
        if (filtered_commissioned.length !== 0) filtered_ranks.push({
            group: 'Commissioned',
            items: filtered_commissioned
        })

        dispatch(setRanks(filtered_ranks))
    }

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (register.ranks.length === 1 && register.ranks[0].items.length === 1) form.setFieldValue('rank', register.ranks[0].items[0])
            document.getElementById('register-last')?.focus()
        }
    }

    return <>
        <Select
            id={'register-rank'}
            w={'100%'}
            label={'Rank'}
            data={register.ranks}
            searchable
            onSearchChange={handleSearch}
            required
            comboboxProps={{ position: 'bottom', transitionProps: { transition: 'pop', duration: 200 } }}
            error={form.errors.rank}
            key={form.key('rank')}
            {...form.getInputProps('rank')}
            onKeyDownCapture={handleEnter}
        />
    </>
}