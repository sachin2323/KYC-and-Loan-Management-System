import React, { Component } from "react";
import { Input, Modal, Button, Table, message, Tag, Row, Col } from "antd";
import { getClaimDetails, updateClaimStatus } from "../../Models/ClaimRecords";
import { getCurrentUser } from "../../Models/Auth";
const { TextArea } = Input;
export default class AcceptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      info: null,
      records: null,
      acceptButton: false,
      rejectButton: false,
      value:null
    };
  }

  handleChange = (e) =>{
    this.setState({value : e.target.value })
  } 
  
    handleAcceptOrReject = (status_update)=> {
    this.setState({ acceptButton: true });
    updateClaimStatus({
      data: {
        claim_id: this.props.record.id,
        status_update,
        suggestion: this.state.value
      },
      onSuccess: data => {
        this.setState({
          acceptButton: false,
          visible: false
        });
        this.props.list();
        message.success("Successfully Updated Application!");
      },
      onError: data => {
        console.log(data);
        this.setState({ acceptButton: false, visible: false });
        message.error("Unable to Update Application");
      }
    });
  };

  fetchInfo = () => {
    this.setState({ info: this.props.record });
  };

  showModal = () => {
    this.fetchInfo();
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      info: null
    });
  };

  renderInfo = () => {
    return (
      <div>
        <Row type="flex" justify="start">
          <Col span={12}>
            {/* <h2>User Info</h2> */}
            <p>
              <strong>Application ID: </strong>
              {this.state.info.id}
            </p>
            <p>
              <strong>Seller Name: </strong>
              {this.state.info.seller_name}
            </p>
            <p>
              <strong>Seller Email-ID: </strong>
              {this.state.info.seller_email}
            </p>
            <p>
              <strong>Seller PPS Number: </strong>
              {this.state.info.seller_PPS}
            </p>
            <p>
              <strong>Buyer PPS Number: </strong>
              {this.state.info.pps_number}
            </p>
            <p>
              <strong>Surname: </strong>
              {this.state.info.surname}
            </p>
            <p>
              <strong>First Name: </strong>
              {this.state.info.first_name}
            </p>
            <p>
              <strong>Gender: </strong>
              {this.state.info.gender}
            </p>
            <p>
              <strong>Address: </strong>
              {this.state.info.address}
            </p>
            <p>
              <strong>EIR Code: </strong>
              {this.state.info.eir_code}
            </p>
            <p>
              <strong>Phone Number: </strong>
              {this.state.info.phone_number}
            </p>
            <p>
              <strong>Email: </strong>
              {this.state.info.email}
            </p>
            <p>
              <strong>Date Of Birth: </strong>
              {this.state.info.date_of_birth}
            </p>
            <p>
              <strong>Martial Status: </strong>
              {this.state.info.martial_status}
            </p>
            <p>
              <strong>Number of Dependents: </strong>
              {this.state.info.no_of_dependents}
            </p>
           
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {
             <TextArea autosize = {true}
             placeholder="Enter any suggestions"
             id = "suggestion"
             onChange = {this.handleChange}
             value = {this.state.value} 
             />
          }
          {!this.state.Accepted ? (
            <Button
              type="primary"
              loading={this.state.acceptButton}
              onClick={() => this.handleAcceptOrReject("Accepted")}
            >
              Accept
            </Button>
          ) : (
            <div>
            <b>Accepted</b>
            <h1>Suggestions</h1>
            {this.state.value}</div> 
          )}
          {!this.state.Accepted ? (
            <Button
              type="primary"
              loading={this.state.rejectButton}
              onClick={() => this.handleAcceptOrReject("Rejected")}
            >
              Reject
            </Button>
          ) : (
            <div>
            <b>Rejected!</b>
            <h1>Suggestions</h1>
            {this.state.value}</div> 
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Update Status
        </Button>
        <Modal
          title="Application Info"
          visible={this.state.visible}
          okText="Accept"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          footer={false}
        >
          {this.state.info ? this.renderInfo() : null}
        </Modal>
      </div>
    );
  }
}