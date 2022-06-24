import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  CheckSquare,
  PencilSquare,
  Trash,
  XSquare,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GridView from "../../grid-view/GridView";
import { getRequest, postRequest } from "../../services/PlineTools";

const SipTrunkList = () => {
  const [state, setState] = useState({ content: [] });
  const [sortParams, setSortParams] = useState({ sort: "" });
  const [searchParams] = useState({});
  const navigate = useNavigate();

  const pageSize = 10;
  const columns = [
    {
      label: "Row",
      id: "#",
      search: false,
    },
    {
      label: "Name",
      id: "name",
      search: true,
      sort: true,
    },
    {
      label: "Username",
      id: "username",
      search: true,
      sort: true,
    },
    {
      label: "Realm",
      id: "realm",
      search: true,
      sort: true,
    },
    {
      label: "Proxy",
      id: "proxy",
      search: true,
      sort: true,
    },
    {
      label: "Enable",
      id: "enable",
      sort: true,
      value: (value) => {
        if (value) {
          return (
            <CheckSquare style={{ color: "purple", fontWeight: "bold" }} />
          );
        } else {
          return <XSquare style={{ color: "red", fontWeight: "bold" }} />;
        }
      },
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

  const getData = (page = 0, size = pageSize) => {
    let searchUrl = "&" + new URLSearchParams(searchParams).toString();

    if (sortParams.sort.trim() !== "") searchUrl += `&sort=${sortParams.sort}`;

    getRequest(`/sip-trunks/index?page=${page}&size=${size}${searchUrl}`)
      .then((data) => {
        setState(data);
      })
      .catch((error) => {
        toast.error(
          "An error occurred while executing your request. Contact the system administrator\n" +
            error
        );
      });
  };

  const Delete = (id) => {
    if (window.confirm("Are you sure you want to delete this Trunk?")) {
      postRequest("/sip-trunks/delete", { id: id }).then((result) => {
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
    navigate("/sip-trunks/edit/" + id);
  };

  useEffect(() => {
    getData();
  }, []);

  const search = (f, v) => {
    searchParams[f] = v;
    getData();
  };

  const sort = (f) => {
    setSortParams({ sort: f });
    getData();
  };

  return (
    <div>
      <Row>
        <Col>
          <Button as={Link} to="/sip-trunks/create">
            New Trunk
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4>List of SIP Trunks</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <GridView
            Columns={columns}
            Data={state.content}
            Events={{
              first: () => {
                getData(0);
              },
              pre: () => {
                if (state.pageable?.pageNumber - 1 >= 0)
                  getData(state.pageable?.pageNumber - 1);
              },
              next: () => {
                if (state?.totalPages > state.pageable?.pageNumber + 1)
                  getData(state.pageable?.pageNumber + 1);
              },
              last: () => {
                getData(state?.totalPages - 1);
              },
            }}
            Pagination={{
              totalElements: state?.totalElements,
              totalPages: state?.totalPages,
              size: state.pageable?.pageSize,
              offset: state.pageable?.offset,
              pageNumber: state.pageable?.pageNumber,
            }}
            SearchEvent={search}
            SortEvent={sort}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SipTrunkList;
