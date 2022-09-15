import { Modal } from "react-bootstrap";

function SuccessAddBeans({ show }) {
  return (
    <Modal show={show} centered>
      <Modal.Body className="text-dark">
        <p>The product is successfully added to the Bucks</p>
      </Modal.Body>
    </Modal>
  );
}

export default SuccessAddBeans;
