const getAllJobs = async (req, res, next) => {
  res.send("Get All Jobs");
};
const getJob = async (req, res, next) => {
  res.send("Get Job");
};
const createJob = async (req, res, next) => {
  res.send("Create Job");
};
const updateJob = async (req, res, next) => {
  res.send("Update Job");
};
const deleteJob = async (req, res, next) => {
  res.send("Delete Job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
