import { useState, useEffect } from 'react'
import Head from 'next/head'
import Logo from 'components/Logo'
import Button from 'components/Button'
import Revenue from 'components/Revenue'
import Contributions from 'components/Contributions'
import Card from 'components/Card'
import NumberInput from 'components/NumberInput'

const Home = () => {
  const [revenues, setRevenues] = useState([2438, 1986])
  const [spendings, setSpendings] = useState(1460)
  const [equalContribution, setEqualContribution] = useState([])
  const [ratioedContribution, setRatioedContribution] = useState([])
  const [equalRemaining, setEqualRemaining] = useState([])

  useEffect(() => {
    setEqualContribution(revenues.map(() => spendings / revenues.length || 0))
  }, [revenues, spendings])
  useEffect(() => {
    setRatioedContribution(
      revenues.map(
        (revenue) => Math.round((revenue / revenues.reduce((acc, revenue) => acc + revenue, 0)) * spendings) || 0
      )
    )
  }, [revenues, spendings])
  useEffect(() => {
    {
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

      setEqualRemaining(
        remainingRevenues.map((revenue, index) => revenues[index] - (revenue - remainingToPay / revenues.length) || 0)
      )
    }
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
          />
          <Contributions
            name="Ratioed contribution"
            contributions={ratioedContribution}
            spendings={spendings}
            revenues={revenues}
          />
          <Contributions
            name="Equal remaining"
            contributions={equalRemaining}
            spendings={spendings}
            revenues={revenues}
          />
        </div>
      </main>
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
          margin-bottom: 1rem;
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
