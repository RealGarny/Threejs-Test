import * as THREE from "three";

export const buildArrayTexture = (images: HTMLImageElement[], size = 128) => {
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = size;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });

	if (!ctx) throw new Error("Could not build Array texture");

	const layerBytes = size * size * 4;
	const data = new Uint8Array(layerBytes * images.length);

	images.forEach((image, i) => {
		ctx.clearRect(0, 0, size, size);
		ctx.drawImage(image, 0, 0, size, size);
		data.set(ctx.getImageData(0, 0, size, size).data, i * layerBytes);
	});

	const texture = new THREE.DataArrayTexture(data, size, size, images.length);
	texture.format = THREE.RGBAFormat;
	texture.type = THREE.UnsignedByteType;
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.wrapS = THREE.ClampToEdgeWrapping;
	texture.wrapT = THREE.ClampToEdgeWrapping;
	texture.generateMipmaps = false;
	texture.needsUpdate = true;

	return texture;
};
