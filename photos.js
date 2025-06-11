
import React, { useState } from 'react';

export default function Photos() {
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files.map(file => URL.createObjectURL(file))]);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Zdjęcia projektów</h1>
      <input type="file" multiple onChange={handlePhotoUpload} className="m-2" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt="project" className="w-full h-auto" />
        ))}
      </div>
    </div>
  );
}
