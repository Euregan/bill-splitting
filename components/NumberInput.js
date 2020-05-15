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
        padding: 0.5rem;
        margin-top: 0.25rem;
        border-radius: var(--dynamic-border-radius);
        border: 0.05rem solid var(--border-color);
      }
    `}</style>
  </label>
)

export default NumberInput
