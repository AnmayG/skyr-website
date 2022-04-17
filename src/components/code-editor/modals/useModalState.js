import { useState } from "react"

const useModalState = (initialValue) => {
    const [modalOpen, setModalOpen] = useState(initialValue)
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return [modalOpen, handleModalOpen, handleModalClose]
}

export default useModalState;