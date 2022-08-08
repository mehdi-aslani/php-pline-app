import React, { useState, useEffect } from "react";
import GridView from "../grid-view/GridView";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const pageSize = 10;

function ListContact() {
  const columns = [
    {
      label: "نام",
      id: "name",
      search: true,
    },
    {
      label: "نام خانوادگی",
      id: "family",
      search: true,
    },
    {
      label: "موبایل",
      id: "mobile",
      search: true,
    },
    {
      label: "کد مخاطب",
      id: "hotkey",
      search: true,
    },
    {
      label: "وضعیت",
      id: "enable",
      value: (value) => {
        return value ? "فعال" : "غیر فعال";
      },
    },
    {
      label: "ویرایش",
      id: "id",
      value: (value) => {
        return (
          <Button
            onClick={() => {
              Edit(value);
            }}
          >
            ویرایش
          </Button>
        );
      },
    },
    {
      label: "حذف",
      id: "id",
      value: (value) => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              Delete(value);
            }}
          >
            حذف
          </Button>
        );
      },
    },
  ];

  const [state, setState] = useState({ content: [] });
  const [searchParams] = useState({});

  const navigate = useNavigate();

  const getData = (page = 0, size = pageSize) => {
    const searchUrl = new URLSearchParams(searchParams).toString();
    window.global
      .get(`/contacts/get?page=${page}&size=${size}&${searchUrl}`)
      .then((data) => {
        setState(data);
      })
      .catch((error) => {
        toast.error(
          "ارتباط با سرور دچار مشکل شده است لطفا با راهبر سیستم تماس بگیرید" +
            "\n" +
            error
        );
      });
  };

  const Delete = (id) => {
    if (window.confirm("برای حذف این مخاطب مطمئن هستید؟")) {
      window.global.post("/contacts/delete", { id: id }).then((result) => {
        if (result.delete) {
          toast.success("مخاطب مورد نظر حذف شد");
          getData();
        } else {
          toast.success("در حذف مخاطب خطایی رخ داده است");
        }
      });
      getData();
    }
  };

  const Edit = (id) => {
    navigate("/contact/edit/" + id);
  };

  useEffect(() => {
    getData();
  });

  const search = (f, v) => {
    searchParams[f] = v;
    getData();
  };

  return (
    <div>
      <Row>
        <Col>
          <Button as={Link} to="/contact/create">
            ایجاد مخاطب جدید
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4>لیست مخاطبان و کدها</h4>
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
}

export default ListContact;
