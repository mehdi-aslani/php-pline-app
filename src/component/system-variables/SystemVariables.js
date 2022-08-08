import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import YiiGridView from "../grid-view/YiiGridView";
import RestApi from "../services/RestApi";
import { Tools } from "../services/Tools";

const SystemVariables = () => {
  const [state, setState] = useState({ items: [] });
  const [sortParams, setSortParams] = useState({ sort: "" });
  const [searchParams] = useState({});
  const navigate = useNavigate();

  const columns = [
    {
      label: "Row",
      id: "#",
      search: false,
    },
    {
      label: Tools.stringToLabel("name"),
      id: "name",
      search: true,
      sort: true,
    },
    {
      label: Tools.stringToLabel("value"),
      id: "value",
      search: true,
      sort: true,
    },
    {
      label: Tools.stringToLabel("description"),
      id: "desc",
      search: true,
      sort: true,
    },
    {
      label: "Edit",
      id: "id",
      value: (value) => {
        return (
          <p
            className="edit"
            onClick={() => {
              Edit(value);
            }}
          >
            <PencilSquare />
          </p>
        );
      },
    },
    {
      label: "Delete",
      id: "id",
      value: (value) => {
        return (
          <p
            className="delete"
            variant="danger"
            onClick={() => {
              Delete(value);
            }}
          >
            <Trash />
          </p>
        );
      },
    },
  ];

  const getData = (href = "") => {
    if (href === "") {
      href = "/variables?";
    }
    let searchUrl = "&" + new URLSearchParams(searchParams).toString();
    if (searchUrl === "&") searchUrl = "";

    if (sortParams.sort.trim() !== "") searchUrl += `&sort=${sortParams.sort}`;

    RestApi.getRequest(`${href}${searchUrl}`)
      .then((data) => {
        setState(data.data);
      })
      .catch((error) => {
        toast.error(
          "An error occurred while executing your request. Contact the system administrator\n" +
            error
        );
      });
  };

  const Delete = (id) => {
    if (window.confirm("Are you sure you want to delete this Item?")) {
      RestApi.deleteRequest("/variables/" + id).then((result) => {
        if (result.error) {
          toast.error("An error occurred while deleting the Trunk");
        } else {
          toast.success("The Trunk was deleted");
          getData();
        }
      });
    }
  };

  const Edit = (id) => {
    navigate("/variables/edit/" + id);
  };

  useEffect(() => {
    getData();
  }, []);

  const search = (f, v) => {
    searchParams["TblVariablesSearch[" + f + "]"] = v;
    getData();
  };

  const sort = (f) => {
    setSortParams({ sort: f });
    getData();
  };

  return (
    <>
      <Row>
        <Col>
          <Button as={Link} to="/variables/create">
            New Variable
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4>List of System Variables</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <YiiGridView
            Columns={columns}
            Data={state.items}
            Events={{
              first: () => {
                if (state._links.first?.href === undefined) return;
                getData(state._links.first?.href);
              },
              pre: () => {
                if (state._links.prev?.href === undefined) return;
                getData(state._links.prev?.href);
              },
              self: () => {
                if (state._links.self?.href === undefined) return;
                getData(state._links.self?.href);
              },
              next: () => {
                if (state._links.next?.href === undefined) return;
                getData(state._links.next?.href);
              },
              last: () => {
                if (state._links.last?.href === undefined) return;
                getData(state._links.last?.href);
              },
            }}
            Pagination={{
              totalCount: state._meta?.totalCount,
              pageCount: state._meta?.pageCount,
              currentPage: state._meta?.currentPage,
              perPage: state._meta?.perPage,
            }}
            SearchEvent={search}
            SortEvent={sort}
          />
        </Col>
      </Row>
    </>
  );
};

export default SystemVariables;
