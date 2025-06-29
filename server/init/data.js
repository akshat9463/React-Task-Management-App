// data/tasksData.js
const tasks = [
  {
    title: "Design Login Page",
    description: "Create a responsive login form with Tailwind CSS",
    status: "Pending",
    priority: "High",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // +2 days
  },
  {
    title: "Connect Redux Store",
    description: "Set up Redux Toolkit for state management",
    status: "In Progress",
    priority: "Medium",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // +4 days
  },
  {
    title: "Build Task Cards",
    description: "Display each task as a card in the dashboard",
    status: "Completed",
    priority: "Low",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
  }
];

module.exports = {data: tasks}
