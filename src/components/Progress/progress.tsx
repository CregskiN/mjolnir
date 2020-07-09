import React from 'react';
import { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
};

const Progress: React.FC<ProgressProps> = (props) => {
    console.log('component Progress render ...');
    const {
        percent,
        strokeHeight,
        showText,
        styles,
        theme,
    } = props;

    return (
        <div className="mjolnir-progress-bar" style={styles}>
            <div className="mjolnir-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
                <div
                    className={`mjolnir-progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }}
                >
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
};

export default Progress;