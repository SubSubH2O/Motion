const Modal = ({ type, onClose }) => {
    const renderContent = () => {
        switch (type) {
            case "Text":
                return (<div>Text modal</div>)
            case "Table":
                return (<div>Table modal</div>)
            case "To-do":
                return (<div>Todo modal</div>)
            case "List":
                return (<div>List modal</div>)
            case "Chart":
                return (<div>Chart Modal</div>)
            case "Gallery":
                return (<div>Gallery modal</div>)
            default:
                return (<div>Select a type</div>)
        }
    }

    return (
        <div>
            <div>
                <h2>Create {type}</h2>
                <button onClick={onClose}>×</button>
            </div>
            <div>
                {renderContent()}
                <button onClick={onClose}>Create</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default Modal;