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
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class DeliverModal extends Component {
  state = {
    modal: false,
    name: "",
    domestic: 0,
    international: 0
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.domestic]: e.target.value,
      [e.target.international]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      domestic: this.state.domestic,
      international: this.state.international,
      price: Number(this.state.domestic) * 3 + Number(this.state.international) * 5
    };

    //Add item via addItem action
    this.props.addItem(newItem);

    //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Добавить посылку
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">
            Пожалуйста, авторизируйтесь для работы с приложением
          </h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Добавление посылки</ModalHeader>
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
                  Добавить
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(DeliverModal);
