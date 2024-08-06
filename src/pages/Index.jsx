import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Scan, X } from "lucide-react";

const Index = () => {
  const [image, setImage] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 });

  const removeImage = () => {
    setImage(null);
    setScannedData(null);
  };

  const handleScan = async () => {
    // Simulating API call for OCR
    // In a real app, you would send the image to a backend service
    setTimeout(() => {
      setScannedData({
        name: "John Doe",
        company: "Tech Solutions Inc.",
        email: "john.doe@techsolutions.com",
        phone: "+1 (555) 123-4567",
        website: "www.techsolutions.com"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Business Card Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div {...getRootProps()} className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drag & drop a business card image here, or click to select one</p>
            </div>
            {image && (
              <div className="relative">
                <img src={image} alt="Uploaded business card" className="mx-auto object-cover w-full h-48 rounded-md" />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeImage}>
                  <X className="h-4 w-4" />
                </Button>
                <Button onClick={handleScan} className="mt-4 w-full">
                  <Scan className="mr-2 h-4 w-4" /> Scan Card
                </Button>
              </div>
            )}
            {scannedData && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Scanned Information</h3>
                <Input value={scannedData.name} placeholder="Name" />
                <Input value={scannedData.company} placeholder="Company" />
                <Input value={scannedData.email} placeholder="Email" />
                <Input value={scannedData.phone} placeholder="Phone" />
                <Input value={scannedData.website} placeholder="Website" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
