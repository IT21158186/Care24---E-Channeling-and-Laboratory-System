import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [qrText, setQrText] = useState('');

  const handleChangeQR = (event) => {
    setQrText(event.target.value);
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-canvas');
    const qrCodeURL = canvas.toDataURL('image/png');
    const element = document.createElement('a');
    element.href = qrCodeURL;
    element.download = 'QRcode.png';
    element.click();
  };

  return (
    <div className="dashboard-app container">
      <div>
        <input
          type="text"
          value={qrText}
          onChange={handleChangeQR}
          placeholder="Enter text for QR code"
        /> &nbsp;&nbsp;
        <button className='btn btn-warning' onClick={handleDownloadQR}>Download QR</button>
      </div>
      <br/><br/>
      <div>
        <QRCode id="qr-canvas" value={qrText} size={256} level="H" />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
