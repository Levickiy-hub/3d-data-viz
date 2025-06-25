import React, { useState } from 'react';
import { transformServerData } from '../utils/dataUtils';
import style from '../styles/tabel.module.css';

const Tabel = ({ data, target, setTarget }) => {
    const [isFullTabel, setIsFullTabel] = useState(true);

    if (!data || data.length === 0) return null;

    const tableData = transformServerData(data);
    const columns = Object.keys(tableData[0]);

    const toggleFullTable = () => {
        setIsFullTabel(prev => !prev);
    }

    const onClickHandler = (row) => {
        setTarget(row)
    }

    return (
        <div className={style.tabelWrapper}>
            {isFullTabel ? <table className={style.table}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col}>{col.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, idx) => (
                        <tr key={idx} onClick={() => onClickHandler(row)} className={target?.id === row.id ? style.activeRow : ''}>
                            {columns.map(col => (
                                <td key={col}>{row[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table> :
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, idx) => (
                            <tr key={idx} onClick={() => onClickHandler(row)} className={target?.id === row.id ? style.activeRow : ''}>
                                <td>{row['name']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <button onClick={() => toggleFullTable()} className={style.toggleButton}>{isFullTabel ? `<` : `>`}</button>

        </div>
    );
};

export default Tabel;
