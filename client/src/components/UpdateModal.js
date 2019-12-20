import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { updateItem } from "../actions/itemActions";

// UpdateModal don't work
class UpdateModal extends Component {
  state = {
    modal: false,
    name: "",
    domestic: 0,
    international: 0
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      domestic: this.state.domestic,
      international: this.state.international,
      price: (Number(this.state.domestic) * 3) + (Number(this.state.international) * 5)
    };

    //Add item via addItem action
    this.props.updateItem(newItem);

    //Bugfix with domestic prop
    this.setState({
      domestic: 0,
      international: 0
    })

    //Close modal
    this.toggle();
  };
  
  render() {
    console.log('domestic', this.state.domestic)
    console.log('international', this.state.international)
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Изменение посылки</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Название посылки"
                  onChange={this.onChange}
                />
                <Label for="item">Введите расстояние в километрах</Label>
                <Input
                  type="number"
                  name="domestic"
                  id="domestic"
                  placeholder="Внутри страны"
                  onChange={this.onChange}
                />
                <Input
                  type="number"
                  name="international"
                  id="international"
                  placeholder="Международная"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Изменить
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
});

export default connect(mapStateToProps, { updateItem })(UpdateModal);
