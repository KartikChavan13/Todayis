import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "", fatherName: "", motherName: "", siblings: "", aadhar: "", pan: "", dob: "", status: "", address: "",});


  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/details");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        
        await axios.put(`http://localhost:5000/details/${editingId}`, formData);
        setEditingId(null);
      } else {
        
        await axios.post("http://localhost:5000/details", formData);
      }
      loadUsers();
      setFormData({
        name: "", fatherName: "", motherName: "", siblings: "", aadhar: "", pan: "", dob: "", status: "", address: "",
      });
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  
  const handleEdit = (user) => {
    setFormData(user);
    setEditingId(user.id);
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/details/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div >
      <h1 className=" flex justify-center  " ><p className="bg-green-400 rounded-3xl p-3 m-5">Family Information Form</p></h1> 
<div className="flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="  bg-teal-200 p-5 rounded-2xl" >
        <p className=" ml-20 ">Name:</p>
        <input 
        className=" bg-blue-200 rounded-2xl p-2 ml-5 w-50"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <div className=" ">
        <p className="flex ml-20">father name: <p className="ml-30  ">mother name</p></p>
        <input
        className=" bg-blue-200 rounded-2xl ml-5 p-2 w-50 "
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          placeholder="Father's Name"
        />
           
        <input
        className=" bg-blue-200 rounded-2xl p-2  w-50 ml-10"
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          placeholder="Mother's Name"
        />
        </div>
<div className="ml-15">Number of Siblings:</div>
        <input
        className=" bg-blue-200 rounded-2xl p-2 ml-5 w-50"
          type="number"
          name="siblings"
          value={formData.siblings}
          onChange={handleChange}
          placeholder="Number of Siblings"
        />
        <div> <p className="flex ml-15">Aadhar number <p className="ml-31"></p>pan Number </p>
        <input
        className=" bg-blue-200 rounded-2xl ml-5 p-2 w-50"
          type="text"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          placeholder="Aadhar Number"
        />
        <input
        className=" bg-blue-200 rounded-2xl ml-10 p-2 w-50"
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="PAN Number"
        />
        </div>
        <div> <p className="flex ml-14"> Date of Birth <p className="ml-35"></p> Married status</p>
        <input
        className=" bg-blue-200 rounded-2xl p-2 ml-5 w-50"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
        className=" bg-blue-200 ml-10 rounded-2xl p-2 w-50"
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="Married Status"
        />
        </div>
        <div className="ml-15">Address</div>
        <textarea
         className=" bg-blue-200 ml-5 rounded-2xl p-2 w-110"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        ></textarea>
        <div>
        <button className="bg-green-300 hover:bg-green-500 rounded-2xl p-3 ml-10" type="submit">{editingId ? "Update" : "Submit"}</button>
        </div> </form>
        </div>
<center>
      <h1 className=" font-bold p-5 ">All Records</h1>
      <table border="1" cellPadding="100" className=" bg-amber-50 w-[80%] p-5" >
        <thead className="bg-gray-200 ">
          <tr>
            <th>Name</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Siblings</th>
            <th>Aadhar</th>
            <th>PAN</th>
            <th>DOB</th>
            <th>Status</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.fatherName}</td>
              <td>{user.motherName}</td>
              <td>{user.siblings}</td>
              <td>{user.aadhar}</td>
              <td>{user.pan}</td>
              <td>{user.dob}</td>
              <td>{user.status}</td>
              <td>{user.address}</td>
              <td>
                <button className="bg-green-300 rounded-2xl p-2 " onClick={() => handleEdit(user)}>Edit</button>
                <button className="bg-red-300  rounded-2xl p-2 ml-2" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  );
};

export default Form;
