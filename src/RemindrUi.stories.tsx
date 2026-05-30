import type { Meta, StoryObj } from '@storybook/react-vite'
import RemindrUi from './RemindrUi'
import type { Item } from './lib/types'

type DemoRow = {
  id: string
  title: string
  done: boolean
}

const demoRows: DemoRow[] = [
  { id: 'water-plants', title: 'Water the plants', done: false },
  { id: 'send-report', title: 'Send weekly report', done: true },
  { id: 'book-train', title: 'Book train tickets', done: false },
]

const meta = {
  title: 'Remindr UI/RemindrUi',
  component: RemindrUi,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onCheckPin: async (pin: string) => pin === '123456',
    onInitialFetch: async () => demoRows,
    onAdd: async () => true,
    onChecked: async () => true,
    onDelete: async () => true,
    fetchDataInterface: (row: DemoRow): Item => ({
      id: row.id,
      label: row.title,
      checked: row.done,
    }),
  },
} satisfies Meta<typeof RemindrUi<DemoRow>>

export default meta
type Story = StoryObj<typeof meta>

export const Locked: Story = {}

export const InteractiveDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enter 123456 to unlock the demo list.',
      },
    },
  },
}
