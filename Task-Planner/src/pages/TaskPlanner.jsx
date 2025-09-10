import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Tag,
  Select,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Empty,
} from "antd";
import { Plus } from "lucide-react";
import { usePlanner } from "../store/usePlanner";
import moment from "moment";

function TaskPlanner() {
  //for reseting the form value after submision;
  const [form] = Form.useForm();
  //for zustand value;
  const { task, addTask, deleteTask } = usePlanner();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());

  const highestTasks = task.filter((item) => item.priority == "highest");
  const lowestTasks = task.filter((item) => item.priority == "lowest");
  const mediumTasks = task.filter((item) => item.priority == "medium");

  const createTask = (value) => {
    value.status = "pending";
    value.id = Date.now();
    value.createdAt = new Date();
    addTask(value);
    //console.log(task);
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const clearTime = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(clearTime);
    };
  }, []);

  return (
    <div className="bg-gray-200 h-screen overflow-hidden">
      <nav className=" bg-gradient-to-r from-rose-600 via-slate-800 to-slate-900 text-white bg-white h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8">
        <div className="flex items-center">
          <button className="text-white text-2xl w-10 h-10 bg-[radial-gradient(circle_at_center,_#30cfd0_0%,_#330867_100%)] rounded-full font-bold">
            PL
          </button>
          <h1 className="text-2xl fond-bold ml-px">ANNER</h1>
        </div>
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold lg:block hidden">{timer}</h1>
          <DatePicker className="!py-1.5" />
          <button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 front-medium py-1.5 px-3 rounded text-sm items-center hover:scale-105 transition duration-300 focus:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </nav>

      <section className="fixed top-[60px] left-0  h-[calc(100%-120px)] w-full overflow-x-auto overflow-y-visible grid grid-cols-3 gap-6 p-8">
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Highest"
            className="!bg-gradient-to-br !from rose-500 !via-pink-500 !to-rose-500 !font-medium !z-[20000]"
          />

          <div className="bg-white rounded-lg  h-full min-h-0 overflow-auto p-6">
            <div className="flex flex-col gap-12">
              {highestTasks.length === 0 && (
                <>
                  <Empty description="there is no tasks added"></Empty>
                  <button
                    onClick={() => setOpen(true)}
                    className=" w-fit bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 front-medium py-1.5 px-3 rounded text-sm items-center hover:scale-105 transition duration-300 focus:shadow-lg mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </>
              )}
              {highestTasks.map((item, index) => {
                return (
                  <Card hoverable key={index}>
                    <Card.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <Tag className="capitalize">{item.status}</Tag>
                        <Tag
                          className="!bg-rose-500 !border-rose-500 !text-white"
                          onClick={() => deleteTask(item.id)}
                        >
                          Delete
                        </Tag>
                      </div>
                      <Select size="small" placeholder="change status">
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inporgres">
                          In Progess
                        </Select.Option>
                        <Select.Option value="completed">
                          Cpmpleted
                        </Select.Option>
                      </Select>
                    </div>
                    <label className="text-slate-600 text-xs flex mt-3">
                      {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                    </label>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Medium"
            className="!bg-gradient-to-br !from indigo-500 !via-blue-500 !to-indigo-500 !font-medium !z-[20000]"
          />

          <div className="bg-white rounded-lg  h-full min-h-0 overflow-auto">
            <div className="flex flex-col gap-12">
              {mediumTasks.length === 0 && (
                <>
                  <Empty description="there is no tasks added"></Empty>
                  <button
                    onClick={() => setOpen(true)}
                    className=" w-fit bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 front-medium py-1.5 px-3 rounded text-sm items-center hover:scale-105 transition duration-300 focus:shadow-lg mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </>
              )}
              {mediumTasks.map((item, index) => {
                return (
                  <Card hoverable key={index}>
                    <Card.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <Tag className="capitalize">{item.status}</Tag>
                        <Tag
                          className="!bg-rose-500 !border-rose-500 !text-white"
                          onClick={() => deleteTask(item.id)}
                        >
                          Delete
                        </Tag>
                      </div>
                      <Select size="small" placeholder="change status">
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inporgres">
                          In Progess
                        </Select.Option>
                        <Select.Option value="completed">
                          Cpmpleted
                        </Select.Option>
                      </Select>
                    </div>
                    <label className="text-slate-600 text-xs flex mt-3">
                      {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                    </label>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Lowest"
            className="!bg-gradient-to-br !from amber-500 !via-orange-500 !to-amber-500 !font-medium !z-[20000]"
          />

          <div className="bg-white rounded-lg  h-full min-h-0 overflow-auto">
            <div className="flex flex-col gap-12">
              {lowestTasks.length === 0 && (
                <>
                  <Empty description="there is no tasks added"></Empty>
                  <button
                    onClick={() => setOpen(true)}
                    className=" w-fit bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 front-medium py-1.5 px-3 rounded text-sm items-center hover:scale-105 transition duration-300 focus:shadow-lg mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </>
              )}
              {lowestTasks.map((item, index) => {
                return (
                  <Card hoverable key={index}>
                    <Card.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <Tag className="capitalize">{item.status}</Tag>
                        <Tag
                          className="!bg-rose-500 !border-rose-500 !text-white"
                          onClick={() => deleteTask(item.id)}
                        >
                          Delete
                        </Tag>
                      </div>
                      <Select size="small" placeholder="change status">
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inporgres">
                          In Progess
                        </Select.Option>
                        <Select.Option value="completed">
                          Cpmpleted
                        </Select.Option>
                      </Select>
                    </div>
                    <label className="text-slate-600 text-xs flex mt-3">
                      {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                    </label>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className=" text-white bg-gradient-to-l from-rose-600 via-slate-800 to-slate-900  h-[60px] fixed bottom-0 left-0 w-full">
        <h1 className="text-2xl font-bold">Total Tasks - 22</h1>
      </footer>

      <Modal
        open={open}
        footer={null}
        title="Add New Task"
        onCancel={handleCancel}
      >
        <Form onFinish={createTask}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="enter your task name" size="large"></Input>
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea
              placeholder="Task Description Goes Here"
              rows={5}
            ></Input.TextArea>
          </Form.Item>

          <Form.Item name="priority" rules={[{ required: true }]}>
            <Select placeholder="choose priority" size="large">
              <Select.Option value="highest">Highest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="lowest">Lowest</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" size="large">
              submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskPlanner;

//time 54 min
