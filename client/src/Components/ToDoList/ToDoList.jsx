/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiCheck, BiPlay, BiTrash } from "react-icons/bi";
const TodoTemplate = ({ title, description, date, updateStatus }) => {
  return (
    <div className="flex flex-col  justify-between p-4 relative odd:bg-gray-100 mb-5  border-2 rounded-md">
      <div>
        <h1 className="text-2xl font-semibold text-blue-500">{title}</h1>
        <p className="text-blue-500">{description}</p>
      </div>
      <h1>date: {date}</h1>
      {/* <div className="flex gap-x-4 justify-start mt-5">
        <button className="bg-green-500 px-2 flex items-center gap-x-1 py-1 text-white   rounded-md">
          Start <BiPlay color="white" size={"1.3rem"} />
        </button>
        <button
          onClick={() => {
            updateStatus("done");
          }}
          className="bg-blue-500 px-2 flex items-center gap-x-3 py-1 text-white   rounded-md"
        >
          Mark as done <BiCheck color="white" size={"1.3rem"} />
        </button>
        <button className="bg-red-500 px-2 flex items-center gap-x-3 py-1 text-white   rounded-md">
          Delete <BiTrash color="white" size={"1.3rem"} />
        </button>
      </div> */}
      {/* <div className="bg-blue-300 absolute -bottom-5 w-full z-50"></div> */}
    </div>
  );
};

const CreateNoteTemplate = (props) => {
  const { setNoteTitle, setNoteDescription, CreateNote, noteDesc, noteTitle } =
    props;
  return (
    <div className=" rounded-md flex flex-col gap-y-5 border-blue-500 drop-shadow w-full h-full">
      <div>
        <h1>Title: </h1>
        <input
          className="rounded-md border-blue-300 border-2 drop-shadow p-2 w-full"
          placeholder="Title"
          onChange={(e) => {
            setNoteTitle(e.target.value);
          }}
          value={noteTitle}
        />
      </div>
      <div>
        <h1>Description: </h1>
        <textarea
          className="h-full resize-none rounded-md border-blue-300  drop-shadow border-2 p-2 w-full"
          placeholder="Description"
          onChange={(e) => {
            setNoteDescription(e.target.value);
          }}
          rows={12}
          value={noteDesc}
        />
      </div>
      <div className="w-full flex items-center justify-center mt-5">
        <button
          type="submit"
          className="w-1/2 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => CreateNote()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
const ToDoList = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState("");
  const [updatedNow, setUpdatedNow] = useState(false);
  const [activeTab, setActiveTab] = useState("taskList");
  const commonClasses = "rounded-t-md py-2 hover:bg-blue-100 cursor-pointer";
  const date = new Date();

  const getTodos = async (token) => {
    const res = await axios.get("/api/todo/", {
      headers: { Authorization: token },
    });
    setTodos(res.data.reverse());
  };

  const updateStatus = async (id) => {
    const res = await axios.put(
      `/api/todo/${id}`,
      { status: "Done" },
      {
        headers: { Authorization: token },
      }
    );
    setUpdatedNow(!updatedNow);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) getTodos(token);
    setTodos(todos);
  }, [updatedNow]);
  const CreateNote = async () => {
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const newNote = {
          title: noteTitle,
          description: noteDesc,
          date: date.getDay() + "-" + date.getDate(),
        };
        await axios.post("/api/todo", newNote, {
          headers: { Authorization: token },
        });
      }
      toast.success("Note created successfully");
      setNoteDescription("");
      setNoteTitle("");
      setUpdatedNow(!updatedNow);
    } catch (error) {
      toast.error.response.data.msg && toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="px-4 py-12 mx-4 rounded-md bg-white drop-shadow">
      <div>
        <h1 className="text-center text-blue-500 font-semibold text-2xl my-4">
          ToDo List
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-x-10">
        <div className="col-span-6 decoration-dashed">
          <div className="relative">
            <h1 className="rounded-t-md p-2 mb-2  bg-blue-100">
              Create a new note:
            </h1>
            <div
              className={`border bg-blue-500 z-50 border-blue-500 mt-2 absolute bottom-0  w-full`}
            ></div>
          </div>
          <CreateNoteTemplate
            setNoteTitle={setNoteTitle}
            setNoteDescription={setNoteDescription}
            CreateNote={CreateNote}
            noteDesc={noteDesc}
            noteTitle={noteTitle}
          />
        </div>
        <div className="col-span-6">
          <div className="relative mb-4">
            <ul className=" grid grid-cols-2 w-full gap-x-4 text-center">
              <li
                className={`bg-${
                  activeTab === "taskList" ? "blue" : "gray"
                }-100 ${commonClasses}}`}
                onClick={() => setActiveTab("taskList")}
              >
                Task List
              </li>
              {/* <li
                className={`bg-${
                  activeTab === "ongoingList" ? "blue" : "gray"
                }-100 ${commonClasses}`}
                onClick={() => setActiveTab("ongoingList")}
              >
                Ongoing List
              </li> */}
            </ul>
            <div
              className={`border bg-blue-500 z-50 border-blue-500 mt-2 absolute bottom-0 ${
                activeTab === "taskList" ? "left" : "right"
              }-0 w-[25%]`}
            ></div>
          </div>
          {todos.map((todo) => (
            <TodoTemplate
              updateStatus={updateStatus}
              title={todo.title}
              description={todo.description}
              date={todo.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
