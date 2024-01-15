import { useState, useEffect } from "react";

//Кастомный хук для получения данных с сервера
const useServerData = (url) => {
  const ourl = "https://dummyjson.com/users";

  // Состояния для данных, загрузки функций и для их установки
  const [contactData, setContactData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(ourl)
      .then((res) => res.json())
      .then((data) => {
        // Устанавливаем полученные данные в состояние данных
        setContactData(data.users);

        // Устанавливаем состояние загрузки в false, так как данные загружены
        setIsLoading(false);
      })
      .catch((error) => {
        // В случае ошибки выводим ее в консоль для отладки
        console.error("Error:", error);
      });
  }, []); // Пустой массив зависимостей гарантирует, что эффект будет выполнен только один раз

  // Возвращаем объект с состояниями и функциями для их установки
  return [{ contactData, isLoading, setContactData, setIsLoading }];
};

export default useServerData;
