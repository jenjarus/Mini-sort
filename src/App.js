import {useEffect, useState} from "react";
import { Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const HeaderTabs = ({sort, sortTable, sorts, children}) => {
    return (
        <th className={sort[sorts] ? sort[sorts] : 'all'} onClick={()=>sortTable(sorts)}>{children}</th>
    );
};

function App() {
    const [tableData, setTableData] = useState([]);
    const [sort, setSort] = useState({});

    const api = async () => {
        const baseUrl = 'https://api.randomdatatools.ru/?count=25&unescaped=false&params=LastName,FirstName,FatherName,Phone,Login,Password,Email';

        const api_url = await fetch(baseUrl);
        const data = await api_url.json();
        setTableData(data);
    };

    const sortTable = (param) => {
        let newTable = tableData;

        if (sort[param] === 'asc') {
            newTable.sort((prev, next) => {
                if (prev[param] > next[param]) return -1;
                if (prev[param] > next[param]) return 1;
            });
            setSort({[param] : 'desc'});
        } else {
            newTable.sort((prev, next) => {
                if (prev[param] < next[param]) return -1;
                if (prev[param] < next[param]) return 1;
            });
            setSort({[param] : 'asc'});
        }

        setTableData(newTable);
    };

    useEffect(() => {
        api();
    },[]);

  return (
    <div className="App">
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <HeaderTabs sorts={'FirstName'} sort={sort} sortTable={sortTable}>First Name</HeaderTabs>
                            <HeaderTabs sorts={'LastName'} sort={sort} sortTable={sortTable}>Last Name</HeaderTabs>
                            <HeaderTabs sorts={'FatherName'} sort={sort} sortTable={sortTable}>FatherName</HeaderTabs>
                            <HeaderTabs sorts={'Login'} sort={sort} sortTable={sortTable}>Login</HeaderTabs>
                            <HeaderTabs sorts={'Password'} sort={sort} sortTable={sortTable}>Password</HeaderTabs>
                            <HeaderTabs sorts={'Phone'} sort={sort} sortTable={sortTable}>Phone</HeaderTabs>
                            <HeaderTabs sorts={'Email'} sort={sort} sortTable={sortTable}>Email</HeaderTabs>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((el, i) =>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{el.FirstName}</td>
                                <td>{el.LastName}</td>
                                <td>{el.FatherName}</td>
                                <td>{el.Login}</td>
                                <td>{el.Password}</td>
                                <td>{el.Phone}</td>
                                <td>{el.Email}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
