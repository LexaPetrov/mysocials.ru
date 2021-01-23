import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source;     
    return (
        // basic bootstrap classes. you can change with yours.
        <div className="col-md-12" >
            <div className="emdeb-responsive" >
                <iframe title='iframe' src={src} style={{ width: '100%', height: '500px', outline: 'none'}}></iframe>
            </div>
        </div>
    );
};

export default Iframe;