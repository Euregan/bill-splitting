const Button = ({ children, onClick }) => (
  <button onClick={onClick}>
    {children}
    <style jsx>{`
      button {
        background-color: white;
        border: 0.05rem solid gray;
        border-radius: 0.15rem;
        cursor: pointer;
      }
    `}</style>
  </button>
)

export default Button
