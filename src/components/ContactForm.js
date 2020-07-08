import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const ContactForm = () => {
  const [state, setState] = useState({
    name: " ",
    email: " ",
    subject: " ",
    message: " ",
  });

  const [result, setResult] = useState(null);

  const sendEmail = (event) => {
    event.preventDefault();
    //passing form data as json to our api
    axios
      .post("/send", { ...state })
      //if success then store result
      .then((response) => {
        setResult(response.data);
        setState({ name: " ", email: " ", subject: " ", message: " " });
      })
      .catch(() => {
        setResult({
          success: false,
          message: "Something went wrong.Please try again later",
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
        {result && (
        <p className={`${result.success?'success':'error'}`}>
            {result.message}</p>)}
      <form onSubmit={sendEmail}>
        <Form.Group controlId="name">
          <Form.Label>Full Name </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            placeholder="Enter your Full Name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={state.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={state.subject}
            placeholder="Enter subject"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            name="message"
            value={state.message}
            placeholder="Enter your message"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
