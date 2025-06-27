import React, { useState } from 'react';
import style from '../styles/tabel.module.css';

const Tabel = ({ data, target, setTarget }) => {
    const [isFullTabel, setIsFullTabel] = useState(true);

    if (!data || !Array.isArray(data) || data.length === 0) return null;

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Имя' },
        { key: 'status', label: 'Статус' },
        { key: 'cpuLoadPercent', label: 'CPU (%)' },
        { key: 'diskUsedTotal', label: 'Диск' },
        { key: 'memoryUsedTotal', label: 'Память' },
        { key: 'memoryCache', label: 'Память (кэш)' },
        { key: 'memoryPercent', label: 'Память (%)' },
        { key: 'deviceType', label: 'Устройство' },
        { key: 'temperature', label: 'Температура (°C)' },
    ];

    const toggleFullTable = () => {
        setIsFullTabel(prev => !prev);
    };

    const onClickHandler = (row) => {
        setTarget(prev => prev?.id === row.id ? null : row);
    };

    const formatCell = (value) => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value);
        }
        return value ?? '—';
    };

    return (
        <div className={style.tabelWrapper}>
            <table className={style.table}>
                <thead>
                    <tr>
                        {(isFullTabel ? columns : [columns[1]]).map(col => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr
                            key={idx}
                            onClick={() => onClickHandler(row)}
                            className={target?.id === row.id ? style.activeRow : ''}
                        >
                            {(isFullTabel ? columns : [columns[1]]).map(col => (
                                <td key={col.key}>{formatCell(row[col.key])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={toggleFullTable} className={style.toggleButton}>
                {isFullTabel ? '<' : '>'}
            </button>
        </div>
    );
};

export default Tabel;
