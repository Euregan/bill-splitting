const Button = ({ children, onClick }) => (
  <button onClick={onClick}>
    {children}
    <style jsx>{`
      button {
        background-color: white;
        border: 0.05rem solid var(--border-color);
        border-radius: var(--dynamic-border-radius);
        padding: 1rem;
        cursor: pointer;
      }
    `}</style>
  </button>
)

export default Button
