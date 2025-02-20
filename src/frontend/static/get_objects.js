var article = document.getElementById('urls');

// Универсальная функция загрузки данных
async function loadData(entity) {
  let endpoint = entity;

  if (!endpoint) {
    console.error("Эндпоинт не найден для:", entity); return;}

  try {
    let response = await fetch(endpoint);
    let data = await response.json();
    
    // Отображаем данные и сохраняем их для фильтрации
    window.data = data; // Сохраняем данные в глобальной переменной
    renderData(data);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}

// Функция для отображения данных
function renderData(data) {
  let list = document.getElementById("data-list");
  list.innerHTML = ""; // Очищаем список перед новой загрузкой
  
  // Отображаем отфильтрованные или все данные
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
  if (!window.data) return;

  // Фильтруем данные на основе ввода в поле поиска
  let filteredData = window.data.filter(item => {
    // Проверяем, если хотя бы одно поле объекта содержит строку поиска
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(query)
    );
  });

  // Отображаем отфильтрованные данные
  renderData(filteredData);
}

// Слушаем изменения в поле поиска
document.getElementById('search').addEventListener('input', filterData);
console.log(article.dataset.url)
// Загружаем данные при инициализации
loadData(article.dataset.url);

