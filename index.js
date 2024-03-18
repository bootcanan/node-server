const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());
require("dotenv").config();

// create user data

const users = [
  {
    id: 1,
    email: "john@gmail.com",
    username: "johnd",
    password: "m38rmF$",
    firstname: "john",
    lastname: "doe",
    phone: "1-570-236-7033",
  },
  {
    id: 2,
    email: "morrison@gmail.com",
    username: "mor_2314",
    password: "83r5^_",
    firstname: "david",
    lastname: "morrison",
    phone: "1-570-236-7033",
  },
  {
    id: 3,
    email: "kevin@gmail.com",
    username: "kevinryan",
    password: "kev02937@",

    firstname: "kevin",
    lastname: "ryan",
    phone: "1-567-094-1345",
  },
  {
    id: 4,
    email: "don@gmail.com",
    username: "donero",
    password: "ewedon",

    firstname: "don",
    lastname: "romer",
    phone: "1-765-789-6734",
  },
  {
    id: 5,
    email: "derek@gmail.com",
    username: "derek",
    password: "jklg*_56",

    firstname: "derek",
    lastname: "powell",
    phone: "1-956-001-1945",
  },
  {
    id: 6,
    email: "david_r@gmail.com",
    username: "david_r",
    password: "3478*#54",

    firstname: "david",
    lastname: "russell",
    phone: "1-678-345-9856",
  },
  {
    id: 7,
    email: "miriam@gmail.com",
    username: "snyder",
    password: "f238&@*$",

    firstname: "miriam",
    lastname: "snyder",
    phone: "1-123-943-0563",
  },
  {
    id: 8,
    email: "william@gmail.com",
    username: "hopkins",
    password: "William56$hj",

    firstname: "william",
    lastname: "hopkins",

    phone: "1-478-001-0890",
  },
  {
    id: 9,
    email: "kate@gmail.com",
    username: "kate_h",
    password: "kfejk@*_",

    firstname: "kate",
    lastname: "hale",

    phone: "1-678-456-1934",
  },
  {
    id: 10,
    email: "jimmie@gmail.com",
    username: "jimmie_k",
    password: "klein*#%*",

    firstname: "jimmie",
    lastname: "klein",
    phone: "1-104-001-4567",
  },
];

//create end point
app.get("/", function (req, res) {
  res.send("nooooooo");
});

//create end point for all users
app.get("/api/users", function (req, res) {
  res.send(users);
});

//create end point for one user

app.get("/api/users/:id", function (req, res) {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    res.status(404).send("The user with the given id was not found");
  } else {
    res.send(user);
  }
});

app.post("/api/users", function (req, res) {
  const schema = Joi.object({
    id: Joi.number(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const user = {
    id: users.length + 1,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
  };
  const result = schema.validate(user);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  users.push(user);

  res.send(user);
});



app.put("/api/users/:id", function (req, res) {
    const user = users.find((u) => u.id === parseInt(req.params.id));
  
    if (!user) return res.status(404).send("The user with the given id was not found");
    user.email= req.body.email;
    user.username=req.body.username;
    user.password= req.body.password;
    user.firstname= req.body.firstname;
    user.lastname= req.body.lastname;
    user.phone=req.body.phone;

    res.send(user);


    const schema = Joi.object({
        id: Joi.number(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
      });
    
   
      const result = schema.validate(user);
      if (result.error) {
        res.status(400).send(result.error);
        return;
      }


  });

  app.delete("/api/users/:id", function (req, res) {
    const user = users.find((u) => u.id === parseInt(req.params.id));
  
    if (!user) return res.status(404).send("The user with the given id was not found");

  const index=users.indexOf(user);
  users.splice(index,1),
res.send(user);

  })







const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, function () {
  console.log(`server node is running on port ${port}`);
});
