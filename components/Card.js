const Card = ({ children, className }) => (
  <div className={'card ' + (className || '')}>
    {children}
    <style jsx>{`
      .card {
        padding: var(--padding);
        border-radius: 0.3rem;
        background-color: white;
        color: #333333;
        box-shadow: 0px 20px 39px 3px rgba(0, 0, 0, 0.07);
      }
    `}</style>
  </div>
)

export default Card
