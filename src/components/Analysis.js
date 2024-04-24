import React, { useState, useEffect } from 'react';

const Analysis = () => {
    const [emotionsdata, setEmotionsdata] = useState('');
    const [refreshed, setRefreshed] = useState(false);

    useEffect(() => {
        // Retrieve data from local storage
        var eData = localStorage.getItem('Emotions');
        setEmotionsdata(JSON.parse(eData));

        // Refresh the page after 5 seconds if not already refreshed
        if (!refreshed) {
            const refreshPage = setTimeout(() => {
                window.location.reload();
            }, 5000);

            // Mark the page as refreshed
            setRefreshed(true);

            // Clean up timeout on component unmount
            return () => clearTimeout(refreshPage);
        }
    }, [refreshed]); // Only run the effect when 'refreshed' changes

    return (
        <>
            <div className='startpage'></div>
            <div className='startpageouters'>
                <div>
                    <pre>
                        <h3>{emotionsdata}</h3>
                    </pre>
                </div>
            </div>
        </>
    );
};

export default Analysis;
