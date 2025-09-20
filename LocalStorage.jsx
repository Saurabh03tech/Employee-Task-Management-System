// src/utils/LocalStorage.js
const Employee = [
  {
    id: 1,
    firstname: "Rajesh",
    lastname: "Kumar",
    email: "employee1@example.com",
    password: "123",
    role: "employee",
    joinDate: "2024-12-01",
    avatar: "",
    taskSummary: { active: 1, newTask: 1, completed: 1, failed: 1 },
    tasks: [
      {
        title: "Design login page",
        date: "2025-07-08",
        description: "Create a clean login page using Bootstrap.",
        category: "design",
        status: "in-progress",
        priority: "High",
      },
      {
        title: "Fix navbar issues",
        date: "2025-07-05",
        description: "Resolve dropdown and alignment bugs in navbar.",
        category: "development",
        status: "completed",
        priority: "Medium",
      },
      {
        title: "Prepare team report",
        date: "2025-07-01",
        description: "Generate report of team performance for last week.",
        category: "management",
        status: "failed",
        priority: "Low",
      }
    ]
  },
  {
    id: 2,
    firstname: "Priya",
    lastname: "Sharma",
    email: "employee2@example.com",
    password: "123",
    role: "employee",
    joinDate: "2025-01-15",
    avatar: "",
    taskSummary: { active: 2, newTask: 1, completed: 1, failed: 1 },
    tasks: [
      {
        title: "Optimize images",
        date: "2025-07-07",
        description: "Compress and optimize all assets on homepage.",
        category: "performance",
        status: "in-progress",
        priority: "High",
      },
      {
        title: "Backend API integration",
        date: "2025-07-03",
        description: "Connect frontend to task management backend API.",
        category: "development",
        status: "in-progress",
        priority: "High",
      },
      {
        title: "Update documentation",
        date: "2025-07-02",
        description: "Improve README and technical documentation.",
        category: "documentation",
        status: "completed",
        priority: "Low",
      }
    ]
  },
  {
    id: 3,
    firstname: "Amit",
    lastname: "Verma",
    email: "employee3@example.com",
    password: "123",
    role: "employee",
    joinDate: "2025-03-20",
    avatar: "",
    taskSummary: { active: 2, newTask: 1, completed: 0, failed: 1 },
    tasks: [
      {
        title: "Setup CI/CD pipeline",
        date: "2025-07-09",
        description: "Configure GitHub Actions for automated testing.",
        category: "devops",
        status: "in-progress",
        priority: "High",
      },
      {
        title: "Resolve login bug",
        date: "2025-07-06",
        description: "Fix issue with session persistence on login.",
        category: "development",
        status: "failed",
        priority: "High",
      },
      {
        title: "Research new tools",
        date: "2025-07-04",
        description: "Check out latest monitoring tools for system health.",
        category: "research",
        status: "new",
        priority: "Medium",
      }
    ]
  },
  {
    id: 4,
    firstname: "Sneha",
    lastname: "Patel",
    email: "employee4@example.com",
    password: "123",
    role: "employee",
    joinDate: "2025-04-05",
    avatar: "",
    taskSummary: { active: 1, newTask: 2, completed: 1, failed: 0 },
    tasks: [
      {
        title: "Create onboarding slides",
        date: "2025-07-10",
        description: "Design PPT for onboarding new hires.",
        category: "management",
        status: "new",
        priority: "Medium",
      },
      {
        title: "Improve search function",
        date: "2025-07-08",
        description: "Enhance search algorithm for faster results.",
        category: "development",
        status: "in-progress",
        priority: "High",
      },
      {
        title: "Weekly status mail",
        date: "2025-07-03",
        description: "Send out weekly status report email to manager.",
        category: "communication",
        status: "completed",
        priority: "Low",
      }
    ]
  },
  {
    id: 5,
    firstname: "Arjun",
    lastname: "Mehta",
    email: "employee5@example.com",
    password: "123",
    role: "employee",
    joinDate: "2025-02-12",
    avatar: "",
    taskSummary: { active: 2, newTask: 0, completed: 2, failed: 1 },
    tasks: [
      {
        title: "Database schema update",
        date: "2025-07-09",
        description: "Modify schema for new reporting feature.",
        category: "database",
        status: "in-progress",
        priority: "High",
      },
      {
        title: "Code review",
        date: "2025-07-07",
        description: "Review pull requests from junior developers.",
        category: "development",
        status: "completed",
        priority: "Medium",
      },
      {
        title: "Prepare deployment guide",
        date: "2025-07-02",
        description: "Document deployment steps for QA team.",
        category: "documentation",
        status: "failed",
        priority: "Low",
      },
      {
        title: "API testing",
        date: "2025-07-01",
        description: "Write automated tests for new API endpoints.",
        category: "testing",
        status: "completed",
        priority: "High",
      }
    ]
  },
  {
    id: 6,
    firstname: "Neha",
    lastname: "Rao",
    email: "employee6@example.com",
    password: "123",
    role: "employee",
    joinDate: "2025-05-01",
    avatar: "",
    taskSummary: { active: 1, newTask: 1, completed: 2, failed: 0 },
    tasks: [
      {
        title: "UI color updates",
        date: "2025-07-08",
        description: "Update color scheme as per new brand guidelines.",
        category: "design",
        status: "in-progress",
        priority: "Medium",
      },
      {
        title: "Accessibility audit",
        date: "2025-07-05",
        description: "Check application for WCAG compliance.",
        category: "testing",
        status: "completed",
        priority: "High",
      },
      {
        title: "Team meeting notes",
        date: "2025-07-04",
        description: "Summarize action points from weekly meeting.",
        category: "management",
        status: "completed",
        priority: "Low",
      },
      {
        title: "Mobile responsiveness",
        date: "2025-07-02",
        description: "Fix issues on smaller screens.",
        category: "development",
        status: "new",
        priority: "High",
      }
    ]
  }
];

const Admin = {
  id: 1,
  email: "admin@example.com",
  password: "123",
  role: "admin",
  joinDate: "2024-01-01"
};

export const setLocalStorage = () => {
  if (!localStorage.getItem("Employee")) {
    localStorage.setItem("Employee", JSON.stringify(Employee));
  }
  if (!localStorage.getItem("Admin")) {
    localStorage.setItem("Admin", JSON.stringify(Admin));
  }
};

export const getLocalStorage = () => {
  const empRaw = localStorage.getItem("Employee");
  const adminRaw = localStorage.getItem("Admin");

  let employee = [];
  let admin = null;

  try {
    employee = empRaw ? JSON.parse(empRaw) : [];
  } catch (e) {
    employee = [];
  }

  try {
    admin = adminRaw ? JSON.parse(adminRaw) : null;
  } catch (e) {
    admin = null;
  }

  return { employee, admin };
};
