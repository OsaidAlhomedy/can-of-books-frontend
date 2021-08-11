import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

class UpdateBookFormModal extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.hideUpdateModal}>
          <Form onSubmit={this.props.handleUpdating}>
            <Modal.Header closeButton>
              <Modal.Title>Update Book</Modal.Title>
            </Modal.Header>

            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                name="title"
                defaultValue={this.props.updateTitle}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book description"
                name="description"
                defaultValue={this.props.updateDescription}
              />
            </Form.Group>
            <Form.Group controlId="floatingSelect" label="Works with selects">
              <Form.Select name="select">
                <option>Choose Status</option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </Form.Select>
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                onClick={this.props.hideUpdateModal}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default UpdateBookFormModal;
