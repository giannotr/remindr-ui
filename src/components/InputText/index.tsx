import './index.css'

export default function InputText({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return(
		<div className="input-text-group">
      <input type="text" name={`input ${label}`} className='input-text' value={value} onChange={onChange} required />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label htmlFor={`input ${label}`} className='input-text-label'>{label}</label>
    </div>
	)
}
