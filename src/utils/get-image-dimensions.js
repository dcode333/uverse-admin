const getImageDimensions = (file) => {

    if (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const image = new Image();
                image.src = event.target.result;

                image.onload = () => {
                    const width = image.width;
                    const height = image.height;

                    // Resolve the promise with the dimensions
                    resolve({ width, height });
                };
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }
};

export { getImageDimensions }