import Modal from "./Modal";

const DeleteModal = ({openModal, setOpenModal, deleteHandler}) => {
    return (
        <Modal title="Are you sure you want to delete this task?" confirmBtn="YES" openModal={openModal}
               setOpenModal={setOpenModal} submitHandler={deleteHandler}/>
    )
}

export default DeleteModal
