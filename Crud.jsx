import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  FormLabel,
  Text,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
const objdata = {
  name: "",
  email: "",
  phone: "",
};
const Crud = () => {
  const [data, setdata] = useState(objdata);
  const [udata, setudata] = useState([]);
  const { name, email, phone } = data;
  const handlechange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleclick = async (e) => {
    const res = await axios.post("http://localhost:8080/users", data);

    setdata({
      name: "",
      email: "",
      phone: "",
    });
    da();
    console.log(res);
  };

  const da = async () => {
    const res = await axios.get("http://localhost:8080/users");
    setudata(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    da();
  }, []);

  const handledelete = async (id) => {
    const res = await axios.delete(`http://localhost:8080/users/${id}`);
    setudata((pre) => pre.filter((el) => el.id !== id));
    alert("data deleted successfully!");
  };
  const handleedit = async (id) => {
    let editdata = udata.find((el) => el.id === id);
    setdata(editdata);
    const editedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    let res = await axios.put(`http://localhost:8080/users/${id}`, editedData);
    console.log(res);
    da();
  };
  return (
    <Box padding="10px" border="1px solid red" w="40%" m="auto" mt={10}>
      <Heading>Crud opration</Heading>
      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input
          name="name"
          value={name}
          onChange={handlechange}
          type="text"
          color="red"
          placeholder="type your name"
        />
        <FormLabel py="5px">Email:</FormLabel>
        <Input
          name="email"
          value={email}
          onChange={handlechange}
          type="text"
          placeholder="type your Email"
        />
        <FormLabel py="5px">Phone:</FormLabel>
        <Input
          name="phone"
          value={phone}
          onChange={handlechange}
          type="text"
          placeholder="type your Number"
        />
        <Button onClick={handleclick} mt="10px">
          Add data
        </Button>
      </FormControl>

      <Box>
        {udata.map((el) => (
          <Box key={el.id} border="1px solid black">
            <Text>{el.name}</Text>
            <Text>{el.email}</Text>
            <Text>{el.phone}</Text>
            <Button onClick={() => handleedit(el.id)}>Edit</Button>
            <Button onClick={() => handledelete(el.id)}>Delete</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Crud;
