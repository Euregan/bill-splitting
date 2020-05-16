const NumberInput = ({ children, value, onChange, currency }) => (
  <label>
    <div>{children}</div>
    <div className="input">
      <input type="number" value={value} onChange={(event) => onChange(parseFloat(event.target.value) || 0)} />
      <span>{currency}</span>
    </div>
    <style jsx>{`
      label {
        display: flex;
        flex-direction: column;
      }

      input {
        border: none;
        -moz-appearance: textfield;
      }

      input::-webkit-inner-spin-button,
      input::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }

      .input {
        padding: 0.5rem;
        margin-top: 0.25rem;
        border-radius: var(--dynamic-border-radius);
        border: 0.05rem solid var(--border-color);
        display: flex;
      }

      .input > * ~ * {
        margin-left: 0.5rem;
      }
    `}</style>
  </label>
)

export default NumberInput
