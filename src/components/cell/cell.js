import React from 'react';

import './cell.css';

const Cell = ({x, y, CELL_SIZE, mode}) => {

// mode:  0 - not active (white),                          1 - PC choose that cell (blue),
//        2 - player clicked on cell after mode 1 (green), 3 - player not clicked on cell after mode 1 (red)

        let clN;
        switch(mode) {
            case 1  : clN = "cell_blue";  break;
            case 2  : clN = "cell_green"; break;
            case 3  : clN = "cell_red";   break;
            default : clN = "cell_white"; break;
        }

        return (
            <div className = {clN}
                 style={{
                left:   `${CELL_SIZE * x + 1}px`,
                top:    `${CELL_SIZE * y + 1}px`,
                width:  `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
}

export default Cell;
