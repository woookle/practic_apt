const Footer = ({ emblema }) => {
  return (
    <footer>
      <div className="container">
        <img src={emblema} className="emblema" alt="emblema" />
        <a href="https://github.com/woookle" className="githubLink" target="_blank" rel="noopener noreferrer">@woookle</a>
      </div>
    </footer>
  )
}

export default Footer;