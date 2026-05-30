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

```ts

function App() {
	const handleCheckPin = (pin) => {}

	const handleInitialFetch = (pin) => {}

	const handleAdd = (pin) => {}

	const handleDelete = (pin) => {}

	const handleChecked = (pin) => {}

	const handleInterface = (pin) => {}

	return (
		<RemindrUi
			onCheckPin={}
			onInitialFetch={}
			onAdd={}
			onDelete={}
			onChecked={}
			fetchDataInterface={}
		/>
	)
}

```
