const NumberInput = ({ children, value, onChange }) => (
  <label>
    <span>{children}</span>
    <input type="number" value={value} onChange={(event) => onChange(parseFloat(event.target.value) || 0)} />
    <style jsx>{`
      label {
        display: flex;
        flex-direction: column;
      }

      input {
        margin-top: 0.25rem;
      }
    `}</style>
  </label>
)

export default NumberInput
