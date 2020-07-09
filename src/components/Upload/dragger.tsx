import React, { useState } from 'react';
import classNames from 'classnames';

interface DraggerProps {
    onFile: (file: FileList) => void;
};

const Dragger: React.FC<DraggerProps> = (props) => {
    // console.log('component Dragger render ...');
    const {
        onFile,
        children,
    } = props;
    const [dragOver, setDragOver] = useState(false)
    const classes = classNames('mjolnir-uploader-dragger', {
        'is-dragover': dragOver
    })
    const handleDragOver = (e: React.DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over);
    }
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    }

    return (
        <div
            className={classes}
            onDragOver={e => { handleDragOver(e, true) }}
            onDragLeave={e => { handleDragOver(e, false) }}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger;