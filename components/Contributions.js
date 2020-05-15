import { Fragment } from 'react'
import Card from 'components/Card'

const Contributions = ({ name, contributions, spendings, revenues }) => {
  const svgHeight = 150
  const svgWidth = 300
  const barWidth = (svgWidth - (revenues.length - 1) * 10) / revenues.length

  const maxRevenue = Math.max(...revenues)

  return (
    <Card className="contributions">
      <h3>{name}</h3>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {contributions.map((contribution, index) => (
          <Fragment key={index}>
            <rect
              width={barWidth}
              height={(revenues[index] / maxRevenue) * svgHeight || 0}
              x={index * (barWidth + 10)}
              y={svgHeight - (revenues[index] / maxRevenue) * svgHeight || 0}
              className="revenue"
            />
            <rect
              width={barWidth}
              height={(contribution / maxRevenue) * svgHeight || 0}
              x={index * (barWidth + 10)}
              y={svgHeight - (revenues[index] / maxRevenue) * svgHeight || 0}
              className="contribution"
            />
            <text
              x={index * (barWidth + 10)}
              y={svgHeight - (revenues[index] / maxRevenue) * svgHeight + (contribution / maxRevenue) * svgHeight || 0}
              dx={barWidth / 2}
              dy={20}
              textAnchor="middle"
            >
              {revenues[index] - contribution}
            </text>
            <text
              x={index * (barWidth + 10)}
              y={svgHeight - (revenues[index] / maxRevenue) * svgHeight || 0}
              dx={barWidth / 2}
              dy={20}
              textAnchor="middle"
            >
              {contribution}
            </text>
          </Fragment>
        ))}
      </svg>
      <style jsx>{`
        h3 {
          margin: 0;
          margin-bottom: 1rem;
        }

        text {
          fill: white;
        }

        .revenue {
          fill: #3c80e0;
        }

        .contribution {
          fill: #6dceff;
        }
      `}</style>
    </Card>
  )
}

export default Contributions
