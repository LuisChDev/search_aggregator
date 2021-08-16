import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import { API } from "aws-amplify";
import { addBing, addGoogle, clear } from "../redux/ResultsSlice";
import { useDispatch } from "react-redux";

const searchSchema = Yup.object().shape({
  searchText: Yup.string()
    .required()
    .min(4, "type at least 4 characters")
    .max(50, "type at most 50 characters"),
  searchEngine: Yup.mixed().required().oneOf(["google", "bing", "Both"]),
});

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        searchText: "",
        searchEngine: "",
      }}
      validationSchema={searchSchema}
      onSubmit={async (vals) => {

        // clear previous value
        dispatch(clear());

        const resp = await API.post("APIcallAPI", "/search", {
          body: {
            search: vals.searchText,
            engine: vals.searchEngine,
          },
        });

        if (vals.searchEngine === "Both") {
          console.log(resp);
          dispatch(addBing(resp.search_result.bing));
          dispatch(addGoogle(resp.search_result.google)
          );
        } else {
          if (vals.searchEngine === "google") {
            console.log(resp);
            dispatch(addGoogle(resp.search_result));
          } else {
            console.log(resp);
            dispatch(addBing(resp.search_result));
          }
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Form.Group controlId="searchText">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search text"
              onChange={props.handleChange}
              value={props.values.searchText}
            />
          </Form.Group>

          <Form.Group controlId="searchEngine">
            {["google", "bing", "Both"].map((engine) => (
              <Form.Check
                inline
                key={`${engine} radio button`}
                name="searchEngine"
                type="radio"
                label={engine}
                value={engine}
                onChange={props.handleChange}
              />
            ))}
          </Form.Group>

          <Button variant="primary" type="submit">
            {`Search using ${props.values.searchEngine}`}
          </Button>

          {Object.keys(props.errors).length !== 0 ? (
            <Alert variant="danger">
              {props.errors.searchEngine || props.errors.searchText}
            </Alert>
          ) : (
            ""
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SearchBox;
