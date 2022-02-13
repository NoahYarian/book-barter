import {Html5QrcodeScanner} from "html5-qrcode"
import React, { useEffect, useRef } from "react";
import { Box, Button } from '@mui/material';

const Scanner = ({ handleCloseScanner, backdropIsOpen, bookLookupFromISBN}) => {

    let html5QrcodeScanner = useRef(null);

    useEffect(() => {
        html5QrcodeScanner.current = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: {width: 250, height: 250},
                experimentalFeatures: { useBarCodeDetectorIfSupported: true },
                aspectRatio: 1.7777778,
                rememberLastUsedCamera: true
            }
        );

        const onScanSuccess = async (decodedText, /*decodedResult*/) => {
            // decodedText = '9781585425860';

            if (decodedText.length !== 13 || decodedText.slice(0,2) !== "97") return;

            bookLookupFromISBN(decodedText);

            closeScanner();
        }

        const onScanFailure = (error) => console.log(`Code scan error = ${error}`);

        html5QrcodeScanner.current.render(onScanSuccess, onScanFailure);

        if (!backdropIsOpen) html5QrcodeScanner.current.clear();
    });

    const closeScanner = () => {
        if (html5QrcodeScanner.current?.getState() === 2) html5QrcodeScanner.current?.pause();
        handleCloseScanner();
    }

    return (
        <Box>
            <div id="reader" style={{ width: "500px", backgroundColor: "#fff" }}></div>
            <Button variant="contained" color="error" size="small" onClick={closeScanner} fullWidth>Close Scanner</Button>
        </Box>
    );
}

export default Scanner;
