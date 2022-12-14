
import User from "../models/Users.js";
import asyncHandler from "../utils/asyncHandler.js";


const getAllEmployee = asyncHandler(async (req, res, next) => {
  const allEmployee = await User.find();
  if (!allEmployee.length)
    return res
      .status(400)
      .send(
        "There are no existing employee.Please Create a new Employee."
      );
  res.status(200).send(res.paginationEmployee);
}
);

const addEmployees = asyncHandler(async (req, res, next) => {
  const newEmployees = await User.insertMany(req.body.users);
  res.status(201).json(newEmployees);
});

const getSingleEmployee = asyncHandler(async (req, res, next) => {
  const {
    params: { id }
  } = req;
  const employee = await User.findById(id).select({ email: 1, userName: 1, 
    firstName: 1, lastName: 1, profilePic: 1, role: 1, date: 1, country:1, city:1, street:1, postcode:1, housenumber:1});
  if (!employee)
    return res
      .status(400)
      .json(
        `There are no existing employee with this id${id}`
      );
  res.json(employee);
});

const updateEmployee = asyncHandler(async (req, res, next) => {
  const {
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

const deleteEmployee = asyncHandler(async (req, res, next) => {
  const {
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
  addEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee
};
