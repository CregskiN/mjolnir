import React from 'react';
import { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
    /* 进度百分比 */
    percent: number;
    /* 填充高度 */
    strokeHeight?: number;
    /* 是否显示文字。如 30%，50% */
    showText?: boolean;
    /* 最外层css */
    styles?: React.CSSProperties;
    /* 进度条风格 */
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