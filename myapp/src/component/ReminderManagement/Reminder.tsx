import React, { useState, useEffect } from "react";
import {
  DatePicker,
  Input,
  Button,
  List,
  notification,
  message,
  Form,
  TabPaneProps,
  Flex,
  Popconfirm,
  TableProps,
} from "antd";
import moment, { Moment } from "moment";
import axios from "axios";
import { ReminderApi } from "../../apis/Reminders";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export type TReminder = {
  id: string;
  content: string;
  date: string;
};

const Reminder = () => {
  const [reminder, setReminder] = useState<TReminder[]>([]);
  const [content, setContent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  const [form] = Form.useForm();

  const fetchAllReminders = async (params: any = {}) => {
    const data = await ReminderApi.getAllReminders({
      ...params,
    });
  };

  const handleDeleteReminder = async (record: TReminder) => {
    await ReminderApi.deleteReminderById(record.id);
    await fetchAllReminders();
    message.info("Đã xóa nhắc nhở.");
  };

  const onFinish = async (values: Omit<TReminder, "id">) => {
    const payload: TReminder = {
      ...values,
      id: uuidv4(),
    };

    const { content, date } = values;
    if (dayjs(date).isBefore(dayjs(), "day")) {
      message.error("Không được chọn ngày trước ngày hiện tại!");
      return;
    }

    await ReminderApi.saveReminder(payload);
    await fetchAllReminders();
    form.resetFields(); // reset form
  };

  useEffect(() => {
    fetchAllReminders();
  }, []);

  const columns: TableProps<TReminder>["columns"] = [
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Ngày nhắc nhở",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TReminder) => {
        return (
          <Flex gap={10}>
            <Popconfirm
              title="Delete Student"
              description="Are you sure to delete this Student?"
              onConfirm={() => handleDeleteReminder(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button color="danger" variant="outlined">
                Delete
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="content"
          label="Nội dung nhắc nhở"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung nhắc nhở!" },
          ]}
        >
          <Input
            placeholder="Nhập nội dung nhắc nhở"
            style={{ width: "300px" }}
          />
        </Form.Item>
        <Form.Item
          style={{ display: "flex" }}
          name="date"
          label="Ngày nhắc nhở"
          rules={[{ required: true, message: "Vui lòng chọn ngày nhắc nhở!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
          <Button type="primary" htmlType="submit">
            Lưu Ngày
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Reminder;
