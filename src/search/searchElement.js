import React, { useState } from "react";
import "./searchElement.css";

// Компонент SearchElement представляет форму поиска с возможностью отправки запроса и сброса поиска
const SearchElement = ({ onSearchSend, resetSearch }) => {
  // Состояние для хранения значения введенного в строку поиска
  const [searchValue, setSearchValue] = useState("");

  // Функция для обработки события поиска
  const handleSearch = async () => {
    try {
      // Выполняем асинхронный запрос к серверу с использованием введенного значения поиска
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${searchValue}`
      );
      const data = await response.json();
      // Вызываем колбэк onSearchSend с введенным значением поиска
      onSearchSend(searchValue);
    } catch (error) {
      // Обрабатываем возможные ошибки при выполнении поискового запроса
      console.error("Ошибка при выполнении поискового запроса:", error);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        {/* Ввод для введения текста поиска */}
        <input
          type="search"
          name=""
          placeholder="Искать..."
          className="input"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        {/* Кнопка для запуска поиска по введенному значению */}
        <button className="button" onClick={handleSearch}>
          Найти
        </button>
        {/* Кнопка для сброса поискового запроса */}
        <button className="button" onClick={resetSearch}>
          Сбросить поиск
        </button>
      </div>
    </div>
  );
};

export default SearchElement;
