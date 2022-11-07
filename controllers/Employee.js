
import User from "../models/Users.js";
import asyncHandler from "../utils/asyncHandler.js";

const getAllEmployee = asyncHandler(async (req, res, next) => {
  const condition = req.query;

  const allEmployee = await User.find()
    .select({ email: 1, userName: 1, email: 1, firstName: 1, lastName: 1, profilePic: 1, role: 1, date: 1 });
  if (!allEmployee.length)
    return res
      .status(400)
      .send(
        "There are no existing employee.Please Create a new Employee."
      );

  res.status(200).send(allEmployee);
}
);

const addNewEmployee = asyncHandler(async (req, res, next) => {
  const { body, userId } = req;
  console.log("Hello users");

  console.log(userId);
  const newEmployee = await User.create({ ...body, employee: userId });
  res.status(201).send(newEmployee);
});

const addEmployees = asyncHandler(async (req, res, next) => {
  const { body,
    user } = req;
  console.log("Hello users");
  const newEmployee = await User.insertMany(req.body.users, function (err, docs) {
    if (err){ 
        return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });

  res.status(201).send(newEmployee);
});

const getSingleEmployee = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  const employee = await User.findById(id).select({ email: 1, userName: 1, email: 1, firstName: 1, lastName: 1, profilePic: 1, role: 1, date: 1 });
  if (!employee)
    return res
      .status(400)
      .send(
        `There are no existing employee with this id${id}`
      );
  res.send(employee);
});

const updateEmployee = asyncHandler(async (req, res, next) => {
  const {
    userId,
    body,
    params: { id }
  } = req;
  const foundEmployee = await User.findById(id);
  if (!foundEmployee)
    return res
      .status(400)
      .send(
        `Employee with this ${id} doesn't exist`
      );
  const updateEmployee = await User.findOneAndUpdate({ _id: id }, body, { new: true });

  res.send(updateEmployee);
});

const deletePost = asyncHandler(async (req, res, next) => {
  const {
    userId,
    params: { id }
  } = req;
  const found = await User.findById(id);
  if (!found)
    return res
      .status(400)
      .send(
        `Employee with this ${id} doesn't exist`
      );
  await User.deleteOne({ _id: id });
  res.send({ success: `Employee with id of ${id} was deleted` });
});

export {
  getAllEmployee,
  addNewEmployee,
  addEmployees,
  getSingleEmployee,
  updateEmployee,
  deletePost
};
