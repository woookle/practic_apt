import FormatDate from "../../../../utils/FormatDate";

const Doc = ({ document, setIsOpen, setCurrentDoc }) => {
  return (
    <div className="doc">
      <div className="docInfo">
        <p className="docTitle">{document.title}</p>
        <p className="created">Создан: {FormatDate(document.createdAt)}</p>
      </div>
      <button type="button" onClick={() => { setCurrentDoc(document); setIsOpen(true) }}>Подробнее</button>
    </div>
  )
}

export default Doc;