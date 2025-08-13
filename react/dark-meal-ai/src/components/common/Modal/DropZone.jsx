import React, { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Center, Loader, Image, Text } from '@mantine/core';
import axios from 'axios';

function DropZone({ imageURL, setImageURL }) {
    const [loading, setLoading] = useState(false);

    const uploadImage = async (file) => {
            const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
            const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

            if (!cloudinaryName || !uploadPreset) {
                console.error('Missing Cloudinary env variables');
                return;
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            try {
                setLoading(true);
                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
                    formData
                );
                console.log("Image URL:", res.data.secure_url);
                setImageURL(res.data.secure_url);
            } catch (error) {
                console.error("Cloudinary upload error:", error.response?.data || error);
            } finally {
                setLoading(false);
            }
    };

    return (
        <div>
        <Dropzone
            h={120}
            p={0}
            multiple={false}
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => uploadImage(files[0])}
        >
            <Center h={120} style={{ flexDirection: 'column' }}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                    <Dropzone.Idle>
                        <Text c="dimmed">Drag your image here</Text>
                    </Dropzone.Idle>
                    <Dropzone.Accept>
                        <Text>Release to upload</Text>
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <Text c="red">Wrong file format</Text>
                    </Dropzone.Reject>
                    </>
                )}
            </Center>
        </Dropzone>

        {imageURL && (
            <Image
            src={imageURL}
            alt="Uploaded"
            mt="md"
            radius="md"
            withPlaceholder
            />
        )}
        </div>
    );
}

export default DropZone;
