import { useState, useEffect } from 'react'
import Head from 'next/head'
import Logo from 'components/Logo'
import Button from 'components/Button'
import Revenue from 'components/Revenue'
import Contributions from 'components/Contributions'
import Card from 'components/Card'
import NumberInput from 'components/NumberInput'
import * as calculation from 'libs/calculation'

const Home = () => {
  const [revenues, setRevenues] = useState([2438, 1986])
  const [spendings, setSpendings] = useState(1460)
  const [equalContribution, setEqualContribution] = useState([])
  const [ratioedContribution, setRatioedContribution] = useState([])
  const [equalRemaining, setEqualRemaining] = useState([])
  const [currency] = useState('€')

  useEffect(() => {
    setEqualContribution(calculation.equalContribution(revenues, spendings))
  }, [revenues, spendings])
  useEffect(() => {
    setRatioedContribution(calculation.ratioedContribution(revenues, spendings))
  }, [revenues, spendings])
  useEffect(() => {
    setEqualRemaining(calculation.equalRemaining(revenues, spendings))
  }, [revenues, spendings])

  return (
    <div>
      <Head>
        <title>Bill splitting</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <header>
        <Logo />
        <h1>Bill splitting</h1>
      </header>

      <main>
        <Card>
          <p>
            Have you ever thought about the way you split the bills when living together with someone? Have you gone the
            50/50 route, or are you splitting according to one another's pay? If you took the time to pick a method,
            rather than wing it, are you sure it's a really fair one? Below are the average man and woman earning in
            France, along with average spending in housing, transportation and groceries. You can fill the values with
            your own to try it out.
          </p>
        </Card>
        <Card className="parameters">
          <div className="revenues">
            {revenues.map((revenue, index) => (
              <Revenue
                key={index}
                number={index + 1}
                revenue={revenue}
                onRevenueChange={(revenue) =>
                  setRevenues([...revenues.slice(0, index), revenue, ...revenues.slice(index + 1)])
                }
              />
            ))}
            <Button onClick={() => setRevenues([...revenues, 0])}>Add revenue</Button>
          </div>
          <NumberInput value={spendings} onChange={setSpendings}>
            Spendings
          </NumberInput>
        </Card>
        <div className="splits">
          <Contributions
            name="Equal contribution"
            contributions={equalContribution}
            spendings={spendings}
            revenues={revenues}
          >
            <p>
              The equal contribution repartition is quite easy: Simply split the bills by the number of household
              members, each paying for an equal portion of the spendings.
            </p>
            <p>
              Though it might seem fair, notice that the one earning less ends up with{' '}
              <strong>
                {Math.max(...revenues) - equalContribution[0] - (Math.min(...revenues) - equalContribution[0])}
                {currency}
              </strong>{' '}
              less than the highest earner.
            </p>
          </Contributions>
          <Contributions
            name="Ratioed contribution"
            contributions={ratioedContribution}
            spendings={spendings}
            revenues={revenues}
          >
            <p>
              The ratioed contribution is adjusted to every one's income: Everyone pays according to their earning, thus
              leveling the amount given.
            </p>
            <p>
              Even if at first thought it might sounds fair, the lowest earner still has{' '}
              <strong>
                {Math.max(...revenues) -
                  Math.max(...ratioedContribution) -
                  (Math.min(...revenues) - Math.min(...ratioedContribution))}
                {currency}
              </strong>{' '}
              less than the highest earner after paying the bills.
            </p>
          </Contributions>
          <Contributions
            name="Equal remaining"
            contributions={equalRemaining}
            spendings={spendings}
            revenues={revenues}
          >
            <p>
              The equal remaining calculation however does not try to mitigate contributions: It effectively make sure
              everyone ends up with the same amount to spend after the bills are paid
            </p>
            <p>
              Here the lowest earner has exactly <strong>0{currency}</strong> less than the highest earner after the
              bills are paid.
            </p>
          </Contributions>
        </div>
      </main>
      {process.env.FATHOM && (
        <script src="https://cdn.usefathom.com/script.js" site={process.env.FATHOM} defer></script>
      )}
      <style jsx global>{`
        html {
          margin: 0;
          padding: 0;

          font-family: 'Fira Sans', sans-serif;
          color: #333333;

          height: 100vh;
          background-color: #faf8ff;

          --border-color: gray;
          --layout-margin: 3rem;
          --padding: 1.5rem;
          --dynamic-border-radius: 0.15rem;
          --border-color: #333333;
        }

        body {
          margin: var(--layout-margin);
        }

        @font-face {
          font-family: 'Fira Sans';
          src: url('FiraSans-Regular.ttf');
        }
        @font-face {
          font-family: 'Fira Sans';
          src: url('FiraSans-Bold.ttf');
          font-weight: bold;
        }

        header > svg {
          max-width: 2rem;
        }

        main > * ~ * {
          margin-top: var(--layout-margin);
        }

        .revenues {
          margin-bottom: 1rem;
        }

        .revenues > * ~ * {
          margin-left: 1rem;
        }

        @media (max-width: 1024px) {
          .revenues > * ~ * {
            margin-left: 0rem;
            margin-top: 1rem;
          }
        }
      `}</style>
      <style jsx>{`
        header {
          background: linear-gradient(135deg, #3c80e0, #6dceff);
          color: white;
          fill: white;
          padding: var(--padding);
          border-radius: 0.3rem;
          display: flex;
          margin-bottom: var(--layout-margin);
          align-items: end;
          box-shadow: 0px 20px 39px 3px rgba(0, 0, 0, 0.07);
        }

        header > h1 {
          margin: 0;
          margin-left: 1rem;
        }

        .revenues {
          display: flex;
        }

        .spendings {
          margin-top: 1rem;

          display: flex;
          flex-direction: column;
        }

        .splits {
          margin-top: var(--layout-margin);
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: var(--layout-margin);
        }

        p {
          line-height: 1.5rem;
          margin: 0;
        }

        @media (max-width: 1024px) {
          header {
            align-items: center;
          }

          .revenues {
            flex-direction: column;
            margin-bottom: 2rem;
          }

          .splits {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
