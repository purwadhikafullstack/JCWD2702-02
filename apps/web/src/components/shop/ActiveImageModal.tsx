import React from "react";
import Image from "next/image";

interface IActiveImageModal {
    src: string;
    alt: string;
    onClose: () => void;
}

export default function ActiveImageModal({ src, alt, onClose }: IActiveImageModal) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
            <div className="relative">
                <Image src={src} alt={alt} width={600} height={600} className="rounded-lg shadow-lg" />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-white text-black rounded-full p-2"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};
