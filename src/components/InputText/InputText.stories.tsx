import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import InputText from '.'

const meta = {
  title: 'Remindr UI/InputText',
  component: InputText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Reminder',
    value: '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value)

    return (
      <div style={{ width: 360 }}>
        <InputText
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    )
  },
} satisfies Meta<typeof InputText>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithValue: Story = {
  args: {
    value: 'Pick up groceries',
  },
}
