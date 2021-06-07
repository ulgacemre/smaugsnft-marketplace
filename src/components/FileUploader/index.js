import React, { useMemo } from 'react';
import {useDropzone} from 'react-dropzone';
import Icon from '../Icon';

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

  
function FileUploader({onDrop}) {
    const {
        isDragActive,
        isDragAccept,
        isDragReject,
        getRootProps, 
        getInputProps
    } = useDropzone({
        accept: 'image/*', 
        multiple: false,
        onDrop: (files) => {
            if( onDrop ) onDrop(files)
        }
    });

    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div className="file-uploader" {...getRootProps({style})}>
            <input {...getInputProps()} />
            <div className="text-center">
                <Icon icon="file-upload" />
                <div className="text-caption-2 neutral-4 mt-2">
                    PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                </div>
            </div>
        </div>
    );
}

export default FileUploader;
