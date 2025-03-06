import { ClipLoader } from "react-spinners"

const Preloader = () => {
  return (
    <div className="preloader_container">
      <ClipLoader className="loader" color="#fff" size={56} />
    </div>
  )
}

export default Preloader;