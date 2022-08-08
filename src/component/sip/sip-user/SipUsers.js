import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import YiiGridView from "../../grid-view/YiiGridView";
import RestApi from "../../services/RestApi";

const SipUsers = () => {
  const [state, setState] = useState({ items: [] });
  const [searchParams] = useState({});
  const [sortParams, setSortParams] = useState({ sort: "" });
  const navigate = useNavigate();
  const columns = [
    {
      label: "Row",
      id: "#",
      search: false,
    },
    {
      label: "User ID",
      id: "uid",
      search: true,
    },
    {
      label: "SIP Profile",
      id: "profile_name",
      search: true,
    },
    {
      label: "SIP User Group",
      id: "sip_user_group_name",
      search: true,
    },
    {
      label: "Enable",
      id: "enable",
      search: true,
      filter: [
        {
          label: "Enable",
          value: "1"
        },
        {
          label: "Disable",
          value: "0"
        }
      ],
      sort: true,
      value: (v) => {
        return v ? "Enable" : "Disable";
      },
    },
    {
      label: "Edit",
      id: "id",
      value: (value) => {
        return (
          <Button
            onClick={() => {
              Edit(value);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      label: "Delete",
      id: "id",
      value: (value) => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              Delete(value);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const getData = (href = "") => {
    if (href === "") {
      href = "/sip-users?";
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
      RestApi.deleteRequest("/sip-user/" + id).then((result) => {
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
    navigate("/sip-users/edit/" + id);
  };

  useEffect(() => {
    getData();
  }, []);

  const search = (f, v) => {
    searchParams["VwSipUsersSearch[" + f + "]"] = v;
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
          <Button as={Link} to="/sip-users/create">
            New Sip User
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4>List of Sip Users</h4>
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
    </div>
  );
};

export default SipUsers;
