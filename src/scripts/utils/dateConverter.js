export default function convertDate (date){
  let dateArticle = new Date(date);
  if(dateArticle){
    let month = dateArticle.getMonth();
    let day = dateArticle.getDate();
    let year = dateArticle.getFullYear();
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${day} ${months[month]} ${year}`;
  }
  return 'Дата неизвестна';
}
