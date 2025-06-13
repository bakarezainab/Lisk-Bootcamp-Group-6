interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
}

export default function Modal({ setIsOpen }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-2xl w-full relative">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
                >
                    &times;
                </button>

                {/* Playable YouTube Video */}
                <div className="w-full aspect-video">
                    <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="YouTube video"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}