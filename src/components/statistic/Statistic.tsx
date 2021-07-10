import './Statistic.scss';

import React, {SyntheticEvent, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {
  clearLocalStorage,
  getFromLocalStorage,
  setBaseLocalStorage,
} from '../../local-storage/local-storage-wrap';

function StatisticPage({setDifficultWords}): JSX.Element {
  function handleCalculation(result) {
    switch (String(result)) {
      // case '1':
      //   return 100;
      case 'NaN':
        return 0;
      default:
        return +result.toFixed(2);
    }
  }

  const tableDataArr = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    tableDataArr.push(getFromLocalStorage(key));
    tableDataArr[i].rating = handleCalculation(
      (tableDataArr[i].correctClick / (tableDataArr[i].correctClick + tableDataArr[i].wrongClick)) *
        100,
    );
  }
  const tableDataDefaultSorted = tableDataArr.sort((a, b) => (a.word > b.word ? 1 : -1));

  const [tableData, setTableData] = useState(tableDataDefaultSorted);
  const [sortBy, setSortBy] = useState('word');
  const [sortOrder, setSortOrder] = useState('asc');

  function sortTablaData(event: SyntheticEvent) {
    const field = (event.target as HTMLElement).id;

    let sortedTableData;

    if (sortOrder === 'asc') {
      sortedTableData = tableDataDefaultSorted.sort((a, b) => (a[field] < b[field] ? 1 : -1));
    } else {
      sortedTableData = tableDataDefaultSorted.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    }

    const newTableData = [];
    for (let i = 0; i < sortedTableData.length; i++) {
      newTableData.push(sortedTableData[i]);
    }

    setTableData(newTableData);
    setSortBy(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  function handleClearLocalStorage() {
    clearLocalStorage();
    setBaseLocalStorage();
    const newTableData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      newTableData.push(getFromLocalStorage(key));
      newTableData[i].rating = handleCalculation(
        (newTableData[i].correctClick /
          (newTableData[i].correctClick + newTableData[i].wrongClick)) *
          100,
      );
    }

    const sortedNewTableData = newTableData.sort((a, b) => (a.word > b.word ? 1 : -1));

    setTableData(sortedNewTableData);
    setSortBy('word');
    setSortOrder('asc');
  }

  function handleRepeateDifficultWords() {
    const sortedTableData = tableData.sort(function (a, b) {
      return b.rating - a.rating;
    });
    const repeateDifficultWords = [];

    for (let i = 0; i < 8; i++) {
      if (sortedTableData[i].rating < 100 && sortedTableData[i].rating !== 0) {
        repeateDifficultWords.push(sortedTableData[i]);
      }
    }

    setDifficultWords(repeateDifficultWords);
  }
  return (
    <>
      <div className="statistic-page-wrapper">
        <div className="table-btn">
          <button className="reset-btn" type="button" onClick={handleClearLocalStorage}>
            reset
          </button>
          <NavLink to="/repeat" className="repeat-btn" onClick={handleRepeateDifficultWords}>
            repeat
          </NavLink>
        </div>
        <div className="statistic-table-wrap">
          <table className="statistic-table" cellSpacing="0" cellPadding="1">
            <thead>
              <tr className="table-caption">
                <th
                  id="word"
                  onClick={(event) => sortTablaData(event)}
                  className={`table-button ${sortBy === 'word' ? sortOrder : ''}`}>
                  Word
                </th>
                <th
                  id="translation"
                  onClick={(event) => sortTablaData(event)}
                  className={`table-button ${sortBy === 'translation' ? sortOrder : ''}`}>
                  Translation
                </th>
                <th
                  id="category"
                  onClick={(event) => sortTablaData(event)}
                  className={`table-button ${sortBy === 'category' ? sortOrder : ''} centered`}>
                  Category
                </th>
                <th
                  id="trainModeClick"
                  onClick={(event) => sortTablaData(event)}
                  className={`table-button ${
                    sortBy === 'tranModeClick' ? sortOrder : ''
                  } centered`}>
                  Train Clicks
                </th>
                <th
                  id="correctClick"
                  onClick={(event) => sortTablaData(event)}
                  className={`table-button ${sortBy === 'correctClick' ? sortOrder : ''} centered`}>
                  Correct Clicks
                </th>
                <th
                  id="wrongClick"
                  onClick={(event) => sortTablaData(event)}
                  className={`table-button ${sortBy === 'wrongClick' ? sortOrder : ''} centered`}>
                  Wrong Clicks
                </th>
                <th
                  id="rating"
                  className={`table-button ${sortBy === 'rating' ? sortOrder : ''} centered`}
                  onClick={(event) => sortTablaData(event)}>
                  Rating, %
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr className="table-body" key={String(index)}>
                  <td className="">{item.word}</td>
                  <td className="">{item.translation}</td>
                  <td className="centered">{item.category}</td>
                  <td className="centered">{item.trainModeClick}</td>
                  <td className="centered">{item.correctClick}</td>
                  <td className="centered">{item.wrongClick}</td>
                  <td className="centered">{item.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StatisticPage;
