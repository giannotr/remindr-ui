# remindr-ui

This is the UI wrapper for a 'remindr' workflow in n8n.
This UI collects the data that can be fed into a n8n data table
and be sent out in various ways.

The component expects five backend hooks: `onCheckPin`, `onInitialFetch`, `onAdd`, `onChecked`, `onDelete`.

The `fetchDataInterface` prop is meant to interface between the incoming data from a database and the shape that the component expects internally, i.e. the type `Item`:

```ts
type Item = {
	id: string
	label: string
	checked: boolean
}
```

To install it: `npm i -S @remindr/ui`.

## Example usage

Given according backend routes
(`/api/auth`, `/api/items`, `/api/items/${id}`)
exist,
component usage could look like the following.

```ts
function App() {
	const handleCheckPin = async (pin: string) => {
		const response = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ pin }),
		})

		const { authCheck } = await response.json()

		if (authCheck) {
			setIsPinCorrect(true)
		}
	}

	const handleInitialFetch = () => {
		const response = await fetch('/api/items')

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`)
		}

		return response.json()
	}

	const handleAdd = (item) => {
		const response = await fetch(`/api/items/${item.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(item),
		})

		return response.json()
	}

	const handleDelete = (itemId) => {
		const response = await fetch(`/api/items/${itemId}`, { method: 'DELETE' })
		return response.json()
	}

	const handleChecked = (item) => {
		const response = await fetch(`/api/items/${item.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(item),
		})

		return response.json()
	}

	const interfaceBackendResponse = (row) => ({
		id: row.internal_id,
		label: row.label,
		checked: row.checked,
	})

	return (
		<RemindrUi
			onCheckPin={handleCheckPin}
			onInitialFetch={handleInitialFetch}
			onAdd={handleAdd}
			onDelete={handleDelete}
			onChecked={handleChecked}
			fetchDataInterface={interfaceBackendResponse}
		/>
	)
}

```
