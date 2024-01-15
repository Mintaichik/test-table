import React from "react";
import "./detailItem.css";

//Компонент модального окна
const DetailedItem = ({ detailItemData, closeModal }) => {
  // Извлекаем город и адрес из объекта address в detailItemData, если они существуют
  const AddressCity =
    detailItemData && detailItemData.address
      ? detailItemData.address.city
      : null;
  const AddressAddress =
    detailItemData && detailItemData.address
      ? detailItemData.address.address
      : null;

  return (
    <div className="modal">
      {/* Отображаем данные о человеке */}
      <div>
        ФИО:{" "}
        {detailItemData.firstName +
          " " +
          detailItemData.lastName +
          " " +
          detailItemData.maidenName}
      </div>
      <div>Возраст: {detailItemData.age}</div>
      <div>Адрес: {AddressAddress + ", " + AddressCity}</div>
      <div>Рост: {detailItemData.height}</div>
      <div>Вес: {detailItemData.weight}</div>
      <div>Номер телефона: {detailItemData.phone}</div>
      <div>E-mail: {detailItemData.email}</div>
      {/* Кнопка для закрытия модального окна */}
      <button onClick={closeModal}>Закрыть</button>
    </div>
  );
};

export default DetailedItem;
