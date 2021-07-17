import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Row className="d-flex align-items-end">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search products..."
          className="ml-sm-5 mr-sm-2"
        />
        <Button
          type="submit"
          variant="outline-success"
          className="p-2 ms-2"
          style={{ height: "100%" }}
        >
          Search
        </Button>
      </Form.Row>
    </Form>
  );
};

export default withRouter(SearchBox);
