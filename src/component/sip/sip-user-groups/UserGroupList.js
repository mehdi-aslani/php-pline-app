import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GridView from "../../grid-view/GridView";
import RestApi from "../../services/RestApi";

const UserGroupList = () => {
  const [state, setState] = useState({ content: [] });
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
    },
    {
      label: "Description",
      id: "description",
      search: true,
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

  const getData = (page = 0, size = pageSize) => {
    const searchUrl = new URLSearchParams(searchParams).toString();

    RestApi.getRequest(
      `/sip-user-groups/index?page=${page}&size=${size}&${searchUrl}`
    )
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
    if (window.confirm("Are you sure you want to delete this User Group?")) {
      RestApi.postRequest("/sip-user-groups/delete", { id: id }).then(
        (result) => {
          if (result.delete) {
            toast.success("The User Group was deleted");
            getData();
          } else {
            toast.success("An error occurred while deleting the User Group");
          }
        }
      );
      getData();
    }
  };

  const Edit = (id) => {
    navigate("/sip-user-groups/edit/" + id);
  };

  useEffect(() => {
    getData();
  }, []);

  const search = (f, v) => {
    searchParams[f] = v;
    getData();
  };

  return (
    <div>
      <Row>
        <Col>
          <Button as={Link} to="/sip-user-groups/create">
            New Sip User Group
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4>List of Sip User Groups</h4>
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
            Search={search}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserGroupList;
