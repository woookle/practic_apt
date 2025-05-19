const FormatPracticDate = (dateString) => {
  const monthsGenitive = [
    'января', 'февраля', 'марта', 'апреля', 
    'мая', 'июня', 'июля', 'августа', 
    'сентября', 'октября', 'ноября', 'декабря'
  ];
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthsGenitive[date.getMonth()];
  const year = date.getFullYear();
  
  return `«${day}» ${month} ${year}г.`;
}

export default FormatPracticDate;