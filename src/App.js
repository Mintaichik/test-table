import { useEffect, useState } from "react";
import useServerData from "./hooks/useServerData";
import TableBody from "./tableBody/tableBody";
import SearchElement from "./search/searchElement";

function App() {
  // Состояния для управления направлением сортировки, выбранной строкой и статусом клика по строке
  const [directionSort, setDirectionSort] = useState(true);
  const [rowItem, setRowItem] = useState("");
  const [rowIsClicked, setRowIsClicked] = useState(false);

  // Состояния для управления текстом поиска и результатами поиска
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Использование кастомного хука useServerData для получения данных с сервера
  const [{ contactData, isLoading, setContactData }] = useServerData("url");

  // Функция для сброса результатов поиска
  const resetSearch = () => {
    setSearchText("");
    setSearchResults([]);
  };

  // Функция для фильтрации данных по введенному запросу
  const getFilteredData = (data, query) => {
    if (!query) {
      return data;
    }
    return data.filter((el) => {
      return (
        el["firstName"].toLowerCase().includes(query.toLowerCase()) ||
        el["lastName"].toLowerCase().includes(query.toLowerCase()) ||
        el["maidenName"].toLowerCase().includes(query.toLowerCase()) ||
        String(el["age"]).toLowerCase().includes(query.toLowerCase()) ||
        el["gender"].toLowerCase().includes(query.toLowerCase()) ||
        String(el["phone"]).toLowerCase().includes(query.toLowerCase()) ||
        (el["address"] &&
          el["address"]["city"].toLowerCase().includes(query.toLowerCase())) ||
        (el["address"] &&
          el["address"]["address"]
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        false
      );
    });
  };

  // Функция для обработки события отправки поискового запроса
  const onSearchSend = (text) => {
    setSearchText(text);
    // Обновляем результаты поиска при каждом вводе текста
    setSearchResults(getFilteredData(contactData, text));
  };

  // Функция для сортировки данных по заданному полю
  const sortData = (field) => {
    const copyData = contactData.concat();

    let sortData;

    if (directionSort) {
      sortData = copyData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    } else {
      sortData = copyData.sort((a, b) => (a[field] > b[field] ? -1 : 1));
    }

    setContactData(sortData);
    setDirectionSort(!directionSort);
  };

  // Функция для обработки клика по строке и отображения подробной информации
  const detailRow = (row) => {
    setRowIsClicked(true);
    setRowItem(row);
  };

  // Эффект для установки заголовка страницы
  useEffect(() => {
    document.title = "Table Task";
  }, []);

  return (
    <div className="App">
      {/* Добавляем компонент поиска */}
      <SearchElement onSearchSend={onSearchSend} resetSearch={resetSearch} />

      {/* Условный рендеринг результатов поиска*/}
      {searchResults.length > 0 ? (
        <TableBody
          contactData={searchResults}
          sortData={sortData}
          rowItem={rowItem}
          directionSort={directionSort}
          detailItemData={rowItem}
          detailRow={detailRow}
          isLoading={isLoading}
          rowIsClicked={rowIsClicked}
        />
      ) : (
        <>
          {/* Отображаем основные данные, если нет результатов поиска */}
          <TableBody
            contactData={contactData}
            sortData={sortData}
            rowItem={rowItem}
            directionSort={directionSort}
            detailItemData={rowItem}
            detailRow={detailRow}
            isLoading={isLoading}
            rowIsClicked={rowIsClicked}
          />
        </>
      )}
    </div>
  );
}

export default App;
