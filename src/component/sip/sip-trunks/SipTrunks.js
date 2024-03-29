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
import YiiGridView from "../../grid-view/YiiGridView";
import RestApi from "../../services/RestApi";

const SipTrunks = () => {
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
      search: true,
      filter: [
        { value: 0, label: "Disable" },
        { value: 1, label: "Enable" },
      ],
      value: (value) => {
        if (value) {
          return "Enable";
        } else {
          return "Disable";
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

  const getData = (href = "") => {
    if (href === "") {
      href = "/sip-trunks?";
    }
    let searchUrl = "&" + new URLSearchParams(searchParams).toString();
    if (searchUrl === "&") searchUrl = "";

    if (sortParams.sort.trim() !== "") searchUrl += `&sort=${sortParams.sort}`;

    RestApi.getRequest(`${href}${searchUrl}`)
      .then((result) => {
        setState(result.data);
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
      RestApi.deleteRequest("/sip-trunks/" + id).then((result) => {
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
    searchParams["TblSipTrunksSearch[" + f + "]"] = v;
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
          <Button as={Link} to="/sip-trunks/create">
            New SIP Trunk
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

export default SipTrunks;
