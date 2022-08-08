import React, { useState } from "react";
import { Col, Row, Table, Pagination } from "react-bootstrap";
import { SortAlphaDown, SortAlphaDownAlt } from "react-bootstrap-icons";
import "./GridView.css";

const GridView = (props) => {
  const [state] = useState({ sort: "-" });

  return (
    <div style={{ marginBottom: "3vw" }} className="border">
      <Row>
        <Col>
          <p>
            <span>Row</span> {props.Pagination.offset + 1} <span>of</span>{" "}
            {props.Pagination.size * (props.Pagination.pageNumber + 1)}
            {" ["}
            <span>Max Rows</span> {props.Pagination.totalElements}
            {"]"}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr>
                {props.Columns.map((v, i) => {
                  return (
                    <th className="table-dark" key={i}>
                      {v.sort === true ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (v.sort) {
                              if (state.sort.startsWith("-")) {
                                state.sort = v.id;
                              } else {
                                state.sort = "-" + v.id;
                              }
                              props?.SortEvent(state.sort);
                            }
                          }}
                        >
                          {state.sort.indexOf(v.id) >= 0 ? (
                            <>
                              {state.sort.startsWith("-") ? (
                                <SortAlphaDownAlt />
                              ) : (
                                <SortAlphaDown />
                              )}
                            </>
                          ) : (
                            ""
                          )}{" "}
                          {v.label}
                        </span>
                      ) : (
                        v.label
                      )}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {props.Columns.map((v, i) => {
                  return (
                    <td key={i}>
                      <input
                        hidden={v.search !== true}
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          props?.SearchEvent(v.id, e.target.value);
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {props.Data.map((row, iR) => {
                return (
                  <tr key={iR}>
                    {props.Columns.map((col, iC) => {
                      return (
                        <td key={iC}>
                          {col.value === undefined
                            ? col.id === "#"
                              ? iR + 1
                              : row[col.id]
                            : col.value(row[col.id])}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>
            <Pagination.Item onClick={props.Events.first}>
              {"Next Page"}
            </Pagination.Item>
            <Pagination.Item onClick={props.Events.pre}>
              {"Previous Page"}
            </Pagination.Item>
            <Pagination.Item active>
              {"Page "}
              {props.Pagination.pageNumber + 1}
            </Pagination.Item>
            <Pagination.Item onClick={props.Events.next}>
              {"Next Page"}
            </Pagination.Item>
            <Pagination.Item onClick={props.Events.last}>
              {"Last Page"}
            </Pagination.Item>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default GridView;
