interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
}

export default function Modal({ setIsOpen }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full mx-4 relative">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-gray-600 hover:text-black text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center"
                >
                    &times;
                </button>

                {/* Loom Video Embed */}
                <div className="w-full aspect-video">
                    <iframe
                        src="https://www.loom.com/embed/1f13e644057e4e9e82a1deb58db7579e?sid=8c8a5c4c-8c4f-4c8f-8c4f-8c8a5c4c8c4f"
                        className="w-full h-full"
                        style={{ border: 'none' }}
                        allowFullScreen
                        title="Loom video"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}