import {useEffect, useState} from "react";
import { Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

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
                            <th className={sort['FirstName'] ? sort['FirstName'] : 'all'} onClick={()=>sortTable('FirstName')}>First Name</th>
                            <th className={sort['LastName'] ? sort['LastName'] : 'all'} onClick={()=>sortTable('LastName')}>Last Name</th>
                            <th className={sort['FatherName'] ? sort['FatherName'] : 'all'} onClick={()=>sortTable('FatherName')}>Father Name</th>
                            <th className={sort['Login'] ? sort['Login'] : 'all'} onClick={()=>sortTable('Login')}>Login</th>
                            <th className={sort['Password'] ? sort['Password'] : 'all'} onClick={()=>sortTable('Password')}>Password</th>
                            <th className={sort['Phone'] ? sort['Phone'] : 'all'} onClick={()=>sortTable('Phone')}>Phone</th>
                            <th className={sort['Email'] ? sort['Email'] : 'all'} onClick={()=>sortTable('Email')}>Email</th>
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
