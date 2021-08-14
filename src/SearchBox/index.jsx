import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";



const SearchBox = () => {

  const formik = useFormik({
    initialValues: {
      searchText: "",
      searchEngine: "",
    },

    onSubmit: async (vals) => {
      await new Promise((r) => setTimeout(r, 2000));
      if (!vals) {
        alert("no values selected");
      } else {
        alert(JSON.stringify(vals));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="searchText">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search text"
          onChange={formik.handleChange}
          value={formik.values.searchText}
        />
      </Form.Group>

      <Form.Group controlId="searchEngine">
        {["Google", "Bing", "Both"].map((engine) => (
          <Form.Check
            inline
            key={`${engine} radio button`}
            name="searchEngine"
            type="radio"
            label={engine}
            value={engine}
            onChange={formik.handleChange}
          />
        ))}
      </Form.Group>

      <Button variant="primary" type="submit">
        {`Search using ${formik.values.searchEngine}`}
      </Button>
    </Form>
  );
};

export default SearchBox;
