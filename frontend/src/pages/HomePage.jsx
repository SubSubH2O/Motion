import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Modal";

const HomePage = () => {

    const [createOpen, setCreateOpen] = useState(false);
    const [itemType, setItemType] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const handleCreateOpen = () => {
        setCreateOpen(!createOpen);
    }

    const handleItemClick = (type) => {
        setItemType(type);
        setModalShow(true)
        setCreateOpen(false)
    }

    const closeModal = () => {
        setModalShow(false);
        setItemType('');
    }

    return (
        <>
            <Outlet />
            {modalShow && <Modal type={itemType} onClose={closeModal}/>}
            <div>
                <button onClick={handleCreateOpen}>+</button>
                {createOpen && (
                    <div>
                        <ul>
                            <li onClick={() => handleItemClick("Text")}>Text</li>
                            <li onClick={() => handleItemClick("Table")}>Table</li>
                            <li onClick={() => handleItemClick("To-do")}>To-do</li>
                            <li onClick={() => handleItemClick("Chart")}>Chart</li>
                            <li onClick={() => handleItemClick("List")}>List</li>
                            <li onClick={() => handleItemClick("Gallery")}>Gallery</li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomePage;