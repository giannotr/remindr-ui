import { useState, useEffect } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import InputPin from './components/InputPin'
import InputText from './components/InputText'
import Spinner from './components/Spinner'
import type { Item } from './lib/types'
import { uuidv4 } from './lib/utils'
import './index.css'

// TODO: add pin login persistance (localStorage)
// TODO: add toast notifications

interface IRemindrUiProps {
	onCheckPin: (pin: string) => boolean
	onInitialFetch: () => Item[]
	onAdd: (item: Item) => boolean
	onChecked: (item: Item) => boolean
	onDelete: (id: string) => boolean
	fetchDataInterface: (row: unknown) => Item
}

function RemindrUi({
	onCheckPin,
	onInitialFetch,
	onAdd,
	onDelete,
	onChecked,
	fetchDataInterface = (row) => row as Item
}: IRemindrUiProps) {
	const [isPinCorrect, setIsPinCorrect] = useState<boolean>(false)
	const [items, setItems] = useState<Item[]>([])
	const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false)
	const [newItemLabel, setNewItemLabel] = useState<string>('')

	useEffect(() => {
		if(isPinCorrect) {
			;(async function fetchData() {
				setIsLoadingItems(true)
				const data = onInitialFetch()

				if (data) {
					setItems(data.map(fetchDataInterface))
					setIsLoadingItems(false)
					return
				}
			})()
		}
	}, [isPinCorrect])

	const handleCheckPin = async (pin: string) => {
		const authCheck = onCheckPin(pin)

		if (authCheck) {
			setIsPinCorrect(true)
		}
	}

	const handleAdd = async () => {
		if(newItemLabel) {
			const newItem = { id: uuidv4(), label: newItemLabel, checked: false }
			const succesfulAdd = onAdd(newItem)

			if (succesfulAdd) {
				setItems((prev) => [newItem, ...prev])
				setNewItemLabel('')
				// toast.success
			} // else toast.error
		}
	}

	const handleDelete = (index: number) => async () => {
		const succesfulDeletion = onDelete(items[index]['id'])

		if (succesfulDeletion) {
			const nextItems = [...items]
			nextItems.splice(index, 1)
			setItems(nextItems)
			// toast.success
		} // else toast.error
	}

	const handleChecked = (index: number) => async (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
		const item = items[index]
		const updatedItem = {
			id: item.id,
			label: item.label,
			checked: e.target.checked,
		}

		const succesfulChecked = onChecked(updatedItem)

		if (succesfulChecked) {
			const newItems = [...items]
			newItems[index] = updatedItem
			setItems(newItems)
		}
	}

  return (
		<div className='d-flex justify-content-center align-items-center align-self-center vw-100 vh-100'>
			{isPinCorrect ?
				<div className='w-75'>
					<div className='d-flex w-100 mb-4'>
						<InputText
							label='Neue Erinnerung'
							value={newItemLabel}
							onChange={(e) => setNewItemLabel(e.target.value)}
						/>
						<button className='todo-add' onClick={handleAdd} disabled={isLoadingItems}>
							<IoIosAddCircle />
						</button>
					</div>
					
					<div className='todo-list'>
						{isLoadingItems ? <div className='todo-list-loader'><Spinner /></div> :
							items.map((item, index) => (
								<div key={item.id} className='todo-list-row'>
									<input type="checkbox" id={item.id} name={item.id} checked={item.checked} onChange={handleChecked(index)} />
									<label htmlFor={item.id} data-content={item.label}>{item.label}</label>
									<button className='todo-list-row-action' onClick={handleDelete(index)}><MdDelete /></button>
								</div>
							))
						}
					</div>
				</div>
			:
				<InputPin pinLength={6} onPinCompletion={handleCheckPin} />
			}
		</div>
	)
}

export default RemindrUi
