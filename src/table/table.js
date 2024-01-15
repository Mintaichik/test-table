import React, { useState } from "react";
import styles from "./table.css";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import DetailedItem from "./../detailItem/detailItem";

// Компонент Table представляет таблицу сведения о людях с возможностью сортировки и отображения подробной информации
const Table = ({
  sortData,
  contactData,
  directionSort,
  detailRow,
  detailItemData,
  rowIsClicked,
  onSearchSend,
}) => {
  // Состояние для отслеживания поля, по которому производится сортировка
  const [fieldData, setFieldData] = useState("");

  // Вспомогательный компонент Arrow для отображения стрелки сортировки в таблице
  const Arrow = () => {
    return directionSort ? <AiFillCaretDown /> : <AiFillCaretUp />;
  };

  // Состояние для отслеживания состояния модального окна (открыто/закрыто)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для сортировки данных по заданному полю
  const fieldSortData = (field) => {
    sortData(field);
    setFieldData(field);
  };

  // Функции для открытия и закрытия модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            {/* Заголовки таблицы с возможностью сортировки */}
            <th>
              ФИО{" "}
              <span
                onClick={() => {
                  fieldSortData("firstName");
                }}
              >
                {fieldData === "firstName" ? (
                  <Arrow />
                ) : (
                  <AiOutlineCheckCircle />
                )}
              </span>
            </th>
            <th>
              Возраст{" "}
              <span
                onClick={() => {
                  fieldSortData("age");
                }}
              >
                {fieldData === "age" ? <Arrow /> : <AiOutlineCheckCircle />}
              </span>
            </th>
            <th>
              Пол{" "}
              <span
                onClick={() => {
                  fieldSortData("gender");
                }}
              >
                {fieldData === "gender" ? <Arrow /> : <AiOutlineCheckCircle />}
              </span>
            </th>
            <th>Номер телефона</th>
            <th>Адрес </th>
          </tr>
        </thead>
        <tbody>
          {/* Отображение данных людей в таблице */}
          {contactData.map((item) => (
            <tr
              key={item.id}
              onClick={() => {
                detailRow(item);
                openModal();
              }}
            >
              <td>
                {item.firstName + " " + item.lastName + " " + item.maidenName}
              </td>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.phone}</td>
              <td>{item.address.address + ", " + item.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Отображение модального окна при наличии данных */}
      {isModalOpen && (
        <div className="modal-overlay">
          <DetailedItem
            detailItemData={detailItemData}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
