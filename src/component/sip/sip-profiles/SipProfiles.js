import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import YiiGridView from "../../grid-view/YiiGridView";
import RestApi from "../../services/RestApi";

const SipProfiles = () => {
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
      label: "Name",
      id: "name",
      search: true,
      sort: true,
    },
    {
      label: "Description",
      id: "description",
      search: true,
      sort: true,
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
      href = "/sip-profiles?";
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
      RestApi.deleteRequest("/sip-profiles/" + id)
        .then((result) => {
          getData();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            error.response.data.forEach((value) => {
              toast.info(value.message);
            });
          }
        });
    }
  };

  const Edit = (id) => {
    navigate("/sip-profiles/edit/" + id);
  };

  useEffect(() => {
    getData();
  }, []);

  const search = (f, v) => {
    searchParams["TblSipProfilesSearch[" + f + "]"] = v;
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
          <Button as={Link} to="/sip-profiles/create">
            New SIP Profile
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4>List of SIP Profiles</h4>
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

export default SipProfiles;
