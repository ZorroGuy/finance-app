import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Table,
  Navbar,
  Nav,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COLORS = ["#007bff", "#ff0000", "#ffc107"];

const HomePage = () => {
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState({ rent: "", food: "", other: "" });
  const [expenseLimit, setExpenseLimit] = useState("");
  const [data, setData] = useState([]);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("financeData")) || [];
    setData(storedData);
  }, []);

  const handleSubmit = () => {
    if (!salary || !expenseLimit) {
      alert("Salary and Expense Limit are required!");
      return;
    }

    const totalExpenses = Object.values(expenses).reduce(
      (a, b) => Number(a) + Number(b),
      0
    );
    setWarning(totalExpenses > Number(expenseLimit));

    const newEntry = {
      month,
      salary: Number(salary),
      expenses: totalExpenses,
      rent: expenses.rent || 0,
      food: expenses.food || 0,
      other: expenses.other || 0,
    };

    const newData = [...data, newEntry];
    setData(newData);
    localStorage.setItem("financeData", JSON.stringify(newData));
    setSalary("");
    setExpenses({ rent: "", food: "", other: "" });
    setExpenseLimit("");
  };

  const handleDelete = (indexToRemove) => {
    const updatedData = data.filter((_, index) => index !== indexToRemove);
    setData(updatedData);
    localStorage.setItem("financeData", JSON.stringify(updatedData));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const filteredData = data.filter((item) => item.month === month);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">Finance Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Reports</Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">Profile</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Settings</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="p-4">
        <Row>
          <Col md={6}>
            <Card className="p-4 mb-4">
              <h5>Enter Your Financial Details</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Month</Form.Label>
                  <Form.Select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {months.map((m, index) => (
                      <option key={index} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rent</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenses.rent}
                    onChange={(e) =>
                      setExpenses({ ...expenses, rent: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Food</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenses.food}
                    onChange={(e) =>
                      setExpenses({ ...expenses, food: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Other Expenses</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenses.other}
                    onChange={(e) =>
                      setExpenses({ ...expenses, other: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Expense Limit</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenseLimit}
                    onChange={(e) => setExpenseLimit(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
              {warning && (
                <p className="text-danger mt-2">
                  Warning: Expenses exceeded the limit!
                </p>
              )}
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-4 mb-4">
              <h5>Salary vs. Expenses</h5>
              <BarChart width={500} height={300} data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="salary" fill="#007bff" />
                <Bar dataKey="expenses" fill="#ff0000" />
              </BarChart>
            </Card>
            <Card className="p-4 mb-4">
              <h5>Expense Breakdown</h5>
              <PieChart width={400} height={300}>
                <Pie
                  data={filteredData}
                  dataKey="expenses"
                  nameKey="month"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {filteredData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Card>
          </Col>
        </Row>
        <Card className="p-4">
          <h5>Transaction History</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Month</th>
                <th>Salary</th>
                <th>Rent</th>
                <th>Food</th>
                <th>Other</th>
                <th>Expenses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>{item.salary}</td>
                  <td>{item.rent}</td>
                  <td>{item.food}</td>
                  <td>{item.other}</td>
                  <td>{item.expenses}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default HomePage;
