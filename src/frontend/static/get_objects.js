var article = document.getElementById('urls');
let list = document.getElementById("data-list");


let page_num = 1;
let page_size = 10;
let has_next;


function updateButtonStates() {
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');
  
  prevButton.disabled = page_num === 1;    // Назад неактивна на первой странице
  nextButton.disabled = has_next === false;
  if (!has_next){
    nextButton.disabled = has_next === false;
    renderData([]);
  }
      // Вперед неактивна при отсутствии следующей страницы
}



// Универсальная функция загрузки данных
async function loadData(entity) {
  let endpoint = `${entity}?page_num=${page_num}&page_size=${page_size}`;
  console.log(endpoint);
  
  if (!endpoint) {
    console.error("Эндпоинт не найден для:", entity);
    return;
  }

  try {
    let response = await fetch(endpoint);
    let data = await response.json();
    
    // Сохраняем данные для фильтрации
    window.data = data; // data содержит { groups: [...], has_next: ... }
    console.log(data);
    
    has_next = data['has_next']; // Сохраняем информацию о следующей странице
    
    // Отображаем только группы
    if (data['data']){
      renderData(data['data']);
    };
    updateButtonStates();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error); 
  }
}

// Функция для отображения данных
function renderData(data) {
  
  list.innerHTML = ""; // Очищаем список перед новой загрузкой
  
  if (data.length === 0) {
    list.innerHTML = "<li>Нет данных</li>";
    return;
  }

  data.forEach(item => {
    let li = document.createElement("li");

    // Формируем строку с данными
    li.textContent = Object.values(item).join(" — ");
    
    list.appendChild(li);
  });
}

// Функция для фильтрации данных по введенному запросу
function filterData() {
  let query = document.getElementById('search').value.toLowerCase();
  
  // Если данные еще не загружены, ничего не фильтруем
  if (!window.data || !window.data.data) return;

  // Фильтруем только группы
  let filteredData = window.data.data.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(query)
    )
  );

  // Отображаем отфильтрованные данные
  renderData(filteredData);
}

// Обработчики кнопок переключения страниц
document.getElementById('prev-page').addEventListener('click', () => {
  if (page_num > 1) {
    page_num--;  
    loadData(article.dataset.url);
  } 
});

document.getElementById('next-page').addEventListener('click', () => {
  if (has_next) {  // Было !has_next, поменял на has_next
    page_num++;
    loadData(article.dataset.url);
  } 
});

// Слушаем изменения в поле поиска
document.getElementById('search').addEventListener('input', filterData);

// Загружаем данные при старте
loadData(article.dataset.url);
