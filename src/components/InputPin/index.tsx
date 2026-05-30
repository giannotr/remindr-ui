import {
	useState,
	useMemo,
	useCallback,
	createRef,
	type Ref, useEffect, 
} from 'react'
// import { setCharAt } from '../../lib/utils'
import './index.css'

const SPACE_KEY = ' '
const BACKSPACE_KEY = 'Backspace'
const LEFT_KEY = 'ArrowLeft'
const RIGHT_KEY = 'ArrowRight'
const UP_KEY = 'ArrowUp'
const DOWN_KEY = 'ArrowDown'

const FORWARDS_KEYS = [
	SPACE_KEY,
	RIGHT_KEY,
	UP_KEY,
]

const BACKWARDS_KEYS = [
	BACKSPACE_KEY,
	LEFT_KEY,
	DOWN_KEY,
]

const REGISTERED_KEYS = [
	...BACKWARDS_KEYS,
	...FORWARDS_KEYS,
]

export default function InputPin({
	pinLength,
	autoComplete,
	onPinCompletion,
}: {
	pinLength: number,
	// pin: string[],
	// setPin: React.Dispatch<React.SetStateAction<string[]>>,
	autoComplete?: string,
	onPinCompletion: (pin: string) => void
}) {
	const [pin, setPin] = useState<string[]>(Array(6).join('.').split('.'))
	const refsList = useMemo(() => {
		const refs: Ref<HTMLInputElement>[] = []
		
		for (let i = 0; i < pinLength; i++) {
			refs.push(createRef())
		}

		return refs
	}, [pinLength])

	const makeVisible = (ref: Ref<HTMLInputElement>) => {
		if (ref && 'current' in ref) {
			ref.current?.focus({ focusVisible: true })
		}
	}

	const focusInput = useCallback((index: number) => {
		makeVisible(refsList[index])
	}, [refsList])

	useEffect(() => {
		focusInput(0)
	}, [focusInput])

	useEffect(() => {
		const stringifiedPinInputs = pin.join('')
		if (stringifiedPinInputs.length === pinLength) {
			onPinCompletion(stringifiedPinInputs)
		}
	}, [pin, pinLength, onPinCompletion])

	const setPinAtIndex = (idx: number, val: string) => {
		const nextPin = [...pin]
		nextPin[idx] = val ? val : ''
		setPin(nextPin)
	}

	const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value

		if (!/^\d?$/.test(value)) return

		setPinAtIndex(index, value)

		if (value && index < pinLength - 1) {
			const nextIndex = index + 1
			requestAnimationFrame(() => focusInput(nextIndex))
		}
	}

	const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e

		if (!REGISTERED_KEYS.includes(key)) return

		e.preventDefault()

		if (key === BACKSPACE_KEY) {
			setPin((prev) => {
				const next = [...prev]
				next[index] = ''
				return next
			})
		}

		let nextIndex = index

		if ((BACKWARDS_KEYS.includes(key)) && index > 0) {
			nextIndex = nextIndex - 1
		}

		if ((FORWARDS_KEYS.includes(key)) && index < pinLength - 1) {
			nextIndex = nextIndex + 1
		}

		requestAnimationFrame(() => focusInput(nextIndex))
	}

	return(
		<form>
			<fieldset>
				<div className="d-flex align-items-center justify-content-center">
					{[...Array(pinLength).keys()].map((index) => (
						<input
							key={`input-pin-digit-${index}`}
							name={`input-pin-digit-${index}`}
							ref={refsList[index]}
							value={pin[index] ?? ''}
							maxLength={1}
							onChange={handleChange(index)}
							onKeyDown={handleKeyDown(index)}
							autoComplete={index === 0 ? autoComplete : undefined}
							className="form-control form-control--otp js-otp-input"
							inputMode="numeric"
							pattern="[0-9]*"
							required
						/>
					))}
				</div>
			</fieldset>
		</form>
	)
}
