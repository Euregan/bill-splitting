import NumberInput from 'components/NumberInput'

const Revenue = ({ number, revenue, onRevenueChange }) => (
  <NumberInput value={revenue} onChange={onRevenueChange}>
    Revenue {number}
  </NumberInput>
)

export default Revenue
