import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import InputPin from '.'

const meta = {
  title: 'Remindr UI/InputPin',
  component: InputPin,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    pinLength: 6,
    autoComplete: 'one-time-code',
  },
  render: (args) => {
    const [completedPin, setCompletedPin] = useState('')

    return (
      <div>
        <InputPin
          {...args}
          onPinCompletion={(pin) => {
            setCompletedPin(pin)
            args.onPinCompletion?.(pin)
          }}
        />
        <p style={{ marginTop: 16 }}>
          Completed pin: {completedPin || 'Waiting for input'}
        </p>
      </div>
    )
  },
} satisfies Meta<typeof InputPin>

export default meta
type Story = StoryObj<typeof meta>

export const SixDigits: Story = {}

export const FourDigits: Story = {
  args: {
    pinLength: 4,
  },
}
