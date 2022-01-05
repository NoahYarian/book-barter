import {Html5QrcodeScanner} from "html5-qrcode"
import React, { useEffect } from "react";

const Scanner = ({ handleCloseScanner, backdropIsOpen, bookLookupFromISBN}) => {

    useEffect(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
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
            decodedText = '9781585425860';

            bookLookupFromISBN(decodedText);

            html5QrcodeScanner.pause();
            handleCloseScanner();
        }

        const onScanFailure = (error) => console.log(`Code scan error = ${error}`);

        html5QrcodeScanner.render(onScanSuccess, onScanFailure);

        if (!backdropIsOpen) html5QrcodeScanner.clear();
    });

    return (
        <div id="reader" style={{ width: "500px", backgroundColor: "#fff" }}></div>
    );
}

export default Scanner;
