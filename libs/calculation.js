const equalContribution = (revenues, spendings) => revenues.map(() => spendings / revenues.length || 0)

const ratioedContribution = (revenues, spendings) =>
  revenues.map(
    (revenue) => Math.round((revenue / revenues.reduce((acc, revenue) => acc + revenue, 0)) * spendings) || 0
  )

const equalRemaining = (revenues, spendings) => {
  let remainingToPay = spendings
  let remainingRevenues = revenues.slice()

  while (remainingToPay > 0 && Math.max(...remainingRevenues) !== Math.min(...remainingRevenues)) {
    const higherstEarner = remainingRevenues.reduce(
      (highest, revenue, index) => (revenue > highest.revenue ? { index, revenue } : highest),
      { revenue: -Infinity }
    )
    const lowestEarner = remainingRevenues.reduce(
      (lowest, revenue, index) => (revenue < lowest.revenue ? { index, revenue } : lowest),
      { revenue: +Infinity }
    )
    const highestEarnerContribution = higherstEarner.revenue - lowestEarner.revenue
    remainingRevenues[higherstEarner.index] -= highestEarnerContribution
    remainingToPay -= highestEarnerContribution
  }

  return remainingRevenues.map((revenue, index) => revenues[index] - (revenue - remainingToPay / revenues.length) || 0)
}

export { equalContribution, ratioedContribution, equalRemaining }
