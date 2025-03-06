const Filter = ({ group, setGroup, title, setTitle, startDate, setStartDate, endDate, setEndDate, clearFilter, isChanged }) => {
  return (
    <div className="filterBlock animate__animated animate__fadeInUp">
      <h1 className="title">Фильтры</h1>
      <div className="inputs">
        <input type="text" placeholder="Поиск по названию" value={title} onChange={txt => setTitle(txt.target.value)} />
        <input type="text" placeholder="Поиск по группе" value={group} onChange={txt => setGroup(txt.target.value)} />
      </div>
      <div className="dateFilter">
        <input type="date" value={startDate} onChange={txt => setStartDate(txt.target.value)} />
        <div className="line"></div>
        <input type="date" value={endDate} onChange={txt => setEndDate(txt.target.value)} />
      </div>
      <button type="button" className="clear" disabled={isChanged} onClick={clearFilter}>ОЧИСТИТЬ</button>
    </div>
  )
}

export default Filter;