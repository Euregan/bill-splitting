import * as calculation from '../libs/calculation'

export default (t) => {
  t.test('equal contributions', (t) => {
    t.equal(
      calculation.equalContribution([1500, 1500], 900)[0],
      calculation.equalContribution([1500, 1500], 900)[1],
      'should be equal to one another'
    )

    t.notEqual(
      calculation.equalContribution([1500, 400], 900)[0],
      calculation.equalContribution([1500, 400], 900)[1],
      'should not be equal if some earners cannot afford their share'
    )

    t.equal(calculation.equalContribution([1500, 1500], 900), [450, 450], 'should result in the right amounts')
    t.equal(calculation.equalContribution([1500, 400], 900), [500, 400], 'should result in the right amounts')
    t.equal(calculation.equalContribution([1500, 450], 900), [450, 450], 'should result in the right amounts')
  })

  t.test('ratioed contribution', (t) => {
    t.equal(
      calculation.ratioedContribution([1500, 1500], 900)[0],
      calculation.ratioedContribution([1500, 1500], 900)[1],
      'should be equal to one another when earnings are the same'
    )

    t.notEqual(
      calculation.ratioedContribution([1500, 1500], 900)[0],
      calculation.ratioedContribution([1700, 1500], 900)[1],
      'should not be equal to one another when earnings are different'
    )

    t.equal(calculation.ratioedContribution([1500, 1500], 900), [450, 450], 'should result in the right amounts')
    t.equal(calculation.ratioedContribution([1700, 1500], 900), [478, 422], 'should result in the right amounts')
  })

  t.test('equal remaining', (t) => {
    t.equal(
      calculation.equalRemaining([1500, 1500], 900)[0],
      calculation.equalRemaining([1500, 1500], 900)[1],
      'should be equal to one another when earnings are the same'
    )

    t.notEqual(
      calculation.equalRemaining([1500, 1500], 900)[0],
      calculation.equalRemaining([1700, 1500], 900)[1],
      'should not be equal to one another when earnings are different'
    )

    t.equal(calculation.equalRemaining([1500, 1500], 900), [450, 450], 'should result in the right amounts')
    t.equal(calculation.equalRemaining([1700, 1500], 900), [550, 350], 'should result in the right amounts')
  })
}
