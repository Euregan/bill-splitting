import NumberInput from 'components/NumberInput'

const Revenue = ({ number, revenue, onRevenueChange, currency }) => (
  <NumberInput value={revenue} onChange={onRevenueChange} currency={currency}>
    Revenue {number}
  </NumberInput>
)

export default Revenue
