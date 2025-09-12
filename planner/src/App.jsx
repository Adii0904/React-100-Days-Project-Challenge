import { useEffect, useState } from 'react'
import 'animate.css';
import { Badge, Button, Card, DatePicker, Empty, Form, Input, Modal, Popconfirm, Select, Tag } from 'antd';
import { Delete, Plus } from 'lucide-react';
import { usePlanner } from './store/usePlanner';
import '@ant-design/v5-patch-for-react-19';
import moment from 'moment';

const desc = "Learn How to Quickly Generate Placeholder Text Using a Lorem Ipsum Tool. Explore How Lorem Ipsum Generators Can Liven up Your Web Layout Wireframes and Mockups. 100+ Templates. A/B Testing & Surveys."

const App = () => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [timer, setTimer] = useState(new Date().toLocaleTimeString())
  const {tasks, addTask, deleteTask, updateStatus, deleteAllTask } = usePlanner()
  const highestTasks = tasks.filter((item)=>item.priority === "highest")
  const mediumTasks = tasks.filter((item)=>item.priority === "medium")
  const lowestTasks = tasks.filter((item)=>item.priority === "lowest")

  const createTask = (value)=>{
    value.status = "pending"
    value.id = Date.now()
    value.createdAt = new Date()
    addTask(value)
    handleClose()
  }

  const handleClose = ()=>{
    setOpen(false)
    form.resetFields()
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimer(new Date().toLocaleTimeString())
    }, 1000)
    
    return ()=>{
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='bg-gray-200 h-screen overflow-hidden'>
      <nav className='bg-gradient-to-r from-rose-500 via-slate-800 to-slate-900 text-white bg-white h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8'>
          <div className='flex items-center'>
            <button className='w-10 h-10 bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_50%,_hsl(288.0,_60.877127978136066%,_57.31748127924382%)_100%)] rounded-full font-bold text-white'>
              PL
            </button>
            <h1 className='text-2xl font-bold ml-px'>anner</h1>
          </div>
          
          <div className='flex gap-5 items-center'>
            <h1 className='text-2xl font-bold lg:block hidden'>{timer}</h1>
            <DatePicker className='!py-1.5' />
            <button onClick={()=>setOpen(true)} className='focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 font-medium'>
                <Plus className='w-4 h-4' />
                Add task
            </button>

            <Popconfirm title="Do you want to delete all tasks ?" onConfirm={()=>deleteAllTask()}>
              <button className='focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-rose-600 via-red-500 to-rose-600 text-white flex gap-1 font-medium'>
                  <Delete className='w-4 h-4' />
                  Delete all tasks
              </button>
            </Popconfirm>
          </div>

      </nav>

      <section className='fixed top-[60px] left-0 h-[calc(100%-120px)] w-full overflow-x-auto overflow-y-visible grid lg:grid-cols-3 gap-8 p-8'>
        <div className='lg:h-full lg:min-h-0 h-[300px]'>
          <Badge.Ribbon 
            text="Highest" 
            className='!bg-gradient-to-br !from-rose-500 !via-pink-500 !to-rose-500 !font-medium !z-[20000]' 
          />

          <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8'>
              <div className='flex flex-col gap-8'>
                {
                  highestTasks.length === 0 &&
                  (
                    <>
                      <Empty description="There is no task added as highest priority" />
                      <button onClick={()=>setOpen(true)} className='w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 font-medium'>
                          <Plus className='w-4 h-4' />
                          Add task
                      </button>
                    </>
                  )
                }
                {
                  highestTasks.map((item, index)=>(
                    <Card hoverable key={index}>
                      <Card.Meta 
                        title={<label className='capitalize-first'>{item.title}</label>}
                        description={<label className='capitalize-first'>{item.description}</label>}
                      />
                      <div className='mt-4 flex justify-between items-center'>
                        <div>
                          {
                            item.status === "pending"
                            &&
                            <Tag className='capitalize'>{item.status}</Tag>
                          }
                          {
                            item.status === "inProgress"
                            &&
                            <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                          }
                          {
                            item.status === "completed"
                            &&
                            <Tag className='capitalize' color='green'>{item.status}</Tag>
                          }
                          <Popconfirm title="Do you want to delete this tasks ?" onConfirm={()=>deleteTask(item.id)}>
                            <Tag className='!bg-rose-500 !border-rose-500 !text-white'>Delete</Tag>
                          </Popconfirm>
                        </div>
                        <Select size='small' placeholder="Change status" onChange={(status)=>updateStatus(item.id, status)}>
                          <Select.Option value="pending">Pending</Select.Option>
                          <Select.Option value="inProgress">inProgress</Select.Option>
                          <Select.Option value="completed">Completed</Select.Option>
                        </Select>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
                    </Card>
                  ))
                }
              </div>
          </div>
        </div>

        <div className='lg:h-full lg:min-h-0 h-[300px]'>
          <Badge.Ribbon 
            text="Medium" 
            className='!bg-gradient-to-br !from-indigo-500 !via-blue-500 !to-indigo-500 !font-medium !z-[20000]' 
          />

          <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8'>
              <div className='flex flex-col gap-8'>
                {
                  mediumTasks.length === 0 &&
                  (
                    <>
                      <Empty description="There is no task added as medium priority" />
                      <button onClick={()=>setOpen(true)} className='w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 font-medium'>
                          <Plus className='w-4 h-4' />
                          Add task
                      </button>
                    </>
                  )
                }
                {
                  mediumTasks.map((item, index)=>(
                    <Card hoverable key={index}>
                      <Card.Meta 
                        title={<label className='capitalize-first'>{item.title}</label>}
                        description={<label className='capitalize-first'>{item.description}</label>}
                      />
                      <div className='mt-4 flex justify-between items-center'>
                        <div>
                          {
                            item.status === "pending"
                            &&
                            <Tag className='capitalize'>{item.status}</Tag>
                          }
                          {
                            item.status === "inProgress"
                            &&
                            <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                          }
                          {
                            item.status === "completed"
                            &&
                            <Tag className='capitalize' color='green'>{item.status}</Tag>
                          }
                          <Popconfirm title="Do you want to delete this tasks ?" onConfirm={()=>deleteTask(item.id)}>
                            <Tag className='!bg-rose-500 !border-rose-500 !text-white'>Delete</Tag>
                          </Popconfirm>
                        </div>
                        <Select size='small' placeholder="Change status" onChange={(status)=>updateStatus(item.id, status)}>
                          <Select.Option value="pending">Pending</Select.Option>
                          <Select.Option value="inProgress">inProgress</Select.Option>
                          <Select.Option value="completed">Completed</Select.Option>
                        </Select>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
                    </Card>
                  ))
                }
              </div>
          </div>
        </div>

        <div className='lg:h-full lg:min-h-0 h-[300px]'>
          <Badge.Ribbon 
            text="Lowest" 
            className='!bg-gradient-to-br !from-amber-500 !via-orange-500 !to-amber-500 !font-medium !z-[20000]' 
          />

          <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8'>
              <div className='flex flex-col gap-8'>
                {
                  lowestTasks.length === 0 &&
                  (
                    <>
                      <Empty description="There is no task added as lowest priority" />
                      <button onClick={()=>setOpen(true)} className='w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex gap-1 font-medium'>
                          <Plus className='w-4 h-4' />
                          Add task
                      </button>
                    </>
                  )
                }
                {
                  lowestTasks.map((item, index)=>(
                    <Card hoverable key={index}>
                      <Card.Meta 
                        title={<label className='capitalize-first'>{item.title}</label>}
                        description={<label className='capitalize-first'>{item.description}</label>}
                      />
                      <div className='mt-4 flex justify-between items-center'>
                        <div>
                          {
                            item.status === "pending"
                            &&
                            <Tag className='capitalize'>{item.status}</Tag>
                          }
                          {
                            item.status === "inProgress"
                            &&
                            <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                          }
                          {
                            item.status === "completed"
                            &&
                            <Tag className='capitalize' color='green'>{item.status}</Tag>
                          }
                          <Popconfirm title="Do you want to delete this tasks ?" onConfirm={()=>deleteTask(item.id)}>
                            <Tag className='!bg-rose-500 !border-rose-500 !text-white'>Delete</Tag>
                          </Popconfirm>
                        </div>
                        <Select size='small' placeholder="Change status" onChange={(status)=>updateStatus(item.id, status)}>
                          <Select.Option value="pending">Pending</Select.Option>
                          <Select.Option value="inProgress">inProgress</Select.Option>
                          <Select.Option value="completed">Completed</Select.Option>
                        </Select>
                      </div>
                      <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
                    </Card>
                  ))
                }
              </div>
          </div>
        </div>
      </section>

      <footer className='text-white bg-gradient-to-l from-rose-500 via-slate-800 to-slate-900 bg-white h-[60px] fixed bottom-0 left-0 w-full flex items-center justify-between px-8'>
            <h1 className='text-2xl font-bold'>Total tasks - {tasks.length}</h1>
            <a href="https://codingott.com" className='hover:underline'>www.codingott.com</a>
      </footer>
      <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false}>
        <h1 className='text-lg font-medium mb-3'>New task</h1>
        <Form onFinish={createTask} form={form} initialValues={{description: desc}}>
          <Form.Item
            name="title"
            rules={[{required: true}]}
          >
            <Input 
              placeholder='Task name'
              size='large'
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{required: true}]}
          >
            <Input.TextArea 
              placeholder='Task description goes here'
              rows={5}
            />
          </Form.Item>

          <Form.Item
            name="priority"
            rules={[{required: true}]}
          >
            <Select size='large' placeholder="Choose priority">
              <Select.Option value="highest">Highest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="lowest">Lowest</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType='submit' type='primary' size='large'>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
