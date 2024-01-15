import React, { Fragment, useState } from "react";
import Loader from "./../loader/loader";
import Table from "./../table/table";

// Компонент TableBody отображает тело страницы, включая таблицу людей илли индикатор загрузки
const TableBody = ({
  contactData,
  sortData,
  detailItemData,
  directionSort,
  detailRow,
  isLoading,
  rowIsClicked,
  onSearchSend,
}) => {
  // Если данные еще загружаются, отображаем индикатор загрузки
  return isLoading ? (
    <Loader />
  ) : (
    // Если данные загружены, отображаем таблицу
    <Fragment>
      <Table
        contactData={contactData}
        sortData={sortData}
        directionSort={directionSort}
        detailRow={detailRow}
        detailItemData={detailItemData}
        rowIsClicked={rowIsClicked}
        onSearchSend={onSearchSend}
      />
    </Fragment>
  );
};

export default TableBody;
