document.addEventListener("DOMContentLoaded", () => {
  console.log("Доступные API:", API_ENDPOINTS);
});

// Универсальная функция загрузки данных
async function loadData(entity) {
  let endpoint = API_ENDPOINTS[entity];

  if (!endpoint) {
      console.error("Эндпоинт не найден для:", entity);
      return;
  }

  try {
      let response = await fetch(endpoint);
      let data = await response.json();
      
      renderData(data);
  } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
  }
}

// Функция для отображения данных
function renderData(data) {
  let list = document.getElementById("data-list");
  list.innerHTML = ""; // Очищаем список перед новой загрузкой

  data.forEach(item => {
      let li = document.createElement("li");

      // Автоматически формируем строку с данными
      li.textContent = Object.values(item).join(" — ");
      
      list.appendChild(li);
  });
}
