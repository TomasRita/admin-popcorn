import { QRCodeCanvas } from "qrcode.react";
import React from "react";

interface RegistrationQRCodeProps {
  registrationData: object;
}

const RegistrationQRCode: React.FC<RegistrationQRCodeProps> = ({ registrationData }) => {
  const jsonData = JSON.stringify(registrationData);
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2 text-center">QR Code do Registro</h3>
      <QRCodeCanvas
        id="qr-canvas" // Adicione o id aqui
        value={jsonData}
        size={256}
        level="H"
        includeMargin={true}
      />
      <p className="mt-2 text-sm text-gray-600">
        Escaneie para obter os dados do registro.
      </p>
    </div>
  );
};

export default RegistrationQRCode;
