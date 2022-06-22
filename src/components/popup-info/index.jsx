import { Input } from "antd";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Popup } from "react-leaflet";

const { TextArea } = Input;

function PopupInfo(props) {
  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Popup className="popup-show-info-draw">
      <TextArea
        rows={3}
        placeholder="Input text"
        onChange={() => console.log("abc")}
      />
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="manager-upload">
            <div className="upload-picture-card-wrapper">
              <button
                className="upload-select-picture-card"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              />
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="upload-list-picture-card">
                  <div
                    className="delete-image"
                    onClick={() => onImageRemove(index)}
                  >
                    X
                  </div>

                  <img
                    src={image.data_url}
                    alt=""
                    className="upload-list-picture-card-container"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </Popup>
  );
}

export default PopupInfo;
