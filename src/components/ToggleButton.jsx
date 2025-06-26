import React from 'react';
import style from '../styles/toggleButton.module.css';

const ToggleButton = ({ is3d, setIs3d }) => {
    return (
        <div className={style.toggleWrapper}>
            <button
                className={`${style.toggleBtn} ${!is3d ? style.active : ''}`}
                onClick={() => setIs3d(false)}
            >
                2D
            </button>
            <button
                className={`${style.toggleBtn} ${is3d ? style.active : ''}`}
                onClick={() => setIs3d(true)}
            >
                3D
            </button>
        </div>
    );
};

export default ToggleButton;
