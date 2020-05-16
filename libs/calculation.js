const equalContribution = (revenues, spendings) => {
  const share = spendings / revenues.length || 0

  if (Math.min(...revenues) >= share) {
    return revenues.map(() => share)
  } else {
    // If any of the earner cannot afford their share, they pay all they can and the rest is split among others
    let paid = 0
    let earnersThatCantAfford = new Map()
    revenues.forEach((revenue, index) => {
      if (revenue < share) {
        paid += revenue
        earnersThatCantAfford.set(index, revenue)
      }
    })
    const newShare = (spendings - paid) / revenues.filter((revenue) => revenue > share).length
    return revenues.map((revenue, index) =>
      earnersThatCantAfford.has(index) ? earnersThatCantAfford.get(index) : newShare
    )
  }
}

const ratioedContribution = (revenues, spendings) =>
  revenues.map(
    (revenue) => Math.round((revenue / revenues.reduce((acc, revenue) => acc + revenue, 0)) * spendings) || 0
  )

const equalRemaining = (revenues, spendings) => {
  if (Math.max(...revenues) - Math.min(...revenues) < spendings) {
    let remainingToPay = spendings
    let remainingRevenues = revenues.slice()

    while (remainingToPay > 0 && Math.max(...remainingRevenues) !== Math.min(...remainingRevenues)) {
      const highestEarner = remainingRevenues.reduce(
        (highest, revenue, index) => (revenue > highest.revenue ? { index, revenue } : highest),
        { revenue: -Infinity }
      )
      const lowestEarner = remainingRevenues.reduce(
        (lowest, revenue, index) => (revenue < lowest.revenue ? { index, revenue } : lowest),
        { revenue: +Infinity }
      )
      const highestEarnerContribution = highestEarner.revenue - lowestEarner.revenue
      remainingRevenues[highestEarner.index] -= highestEarnerContribution
      remainingToPay -= highestEarnerContribution
    }

    return remainingRevenues.map(
      (revenue, index) => revenues[index] - (revenue - remainingToPay / revenues.length) || 0
    )
  } else {
    // If any of the earner cannot afford their share, they pay all they can and the rest is split among others
    let earnersThatCantAfford = []
    revenues.forEach((revenue, index) => {
      if (Math.max(...revenues) >= revenue + spendings) {
        earnersThatCantAfford.push(index)
      }
    })

    let remainingToPay = spendings
    let remainingRevenues = revenues.slice()

    while (remainingToPay > 0 && Math.max(...remainingRevenues) !== Math.min(...remainingRevenues)) {
      const highestEarner = remainingRevenues.reduce(
        (highest, revenue, index) => (revenue > highest.revenue ? { index, revenue } : highest),
        { revenue: -Infinity }
      )
      const lowestEarner = remainingRevenues.reduce(
        (lowest, revenue, index) => (earnersThatCantAfford.includes(index) ? { index, revenue: 0 } : lowest),
        { revenue: +Infinity }
      )
      const highestEarnerContribution = Math.min(highestEarner.revenue - lowestEarner.revenue, remainingToPay)
      remainingRevenues[highestEarner.index] -= highestEarnerContribution
      remainingToPay -= highestEarnerContribution
    }

    return remainingRevenues.map(
      (revenue, index) => revenues[index] - (revenue - remainingToPay / revenues.length) || 0
    )
  }
}

export { equalContribution, ratioedContribution, equalRemaining }
