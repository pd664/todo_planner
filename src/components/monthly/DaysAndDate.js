export let setdate = ""



export const setDate = ""

export const date = (todoDate) => {
    const container = document.getElementById("mph_cont");
    const todayDate = new Date().getDate();
    // console.log(todayDate)

    for (let i = 1; i < 36; i++) {
      const item = document.createElement("a");
      if(i.toString() == todayDate) item.classList.add("date_today")
      item.classList.add("item", "item-" + i);
      let setI = i < 32 ? i : i - 31
      item.innerHTML = '<div id="dat">' +
        (setI) +
      '</div>' 
      const setDate = document.getElementById("dat") 
      item.onclick = todoDate
      container.appendChild(item);
    }
}

export  const daysName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
    const container = document.getElementById("mph_cont");
    for(let i = 0; i < days.length; i++) {
      const day = document.createElement("h3")
      day.classList.add('item', 'dayname')
      day.innerHTML = days[i]
      container.appendChild(day);
    }
  }