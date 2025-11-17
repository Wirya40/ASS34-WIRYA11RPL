"use client";

import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

 
  const fetchStudents = async () => {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  
  const handleOk = async () => {
    const values = await form.validateFields();
    if (values.id) {
     
      await fetch(`/api/students/${values.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      message.success("Student updated!");
    } else {
     
      await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      message.success("Student added!");
    }
    form.resetFields();
    setIsModalOpen(false);
    fetchStudents();
  };

  
  const handleDelete = async (id) => {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    message.success("Student deleted!");
    fetchStudents();
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "City", dataIndex: "city" },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this student?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Student Management</h1>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          form.resetFields();
          setIsModalOpen(true);
        }}
      >
        Add Student
      </Button>

      <Table columns={columns} dataSource={students} rowKey="id" bordered />

      <Modal
        title="Student Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please enter city" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
