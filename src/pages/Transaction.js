import React , {useEffect, useState} from "react";
import { Container, Table } from "react-bootstrap";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import Rp from "rupiah-format";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function Transaction() {

  // let { data: transaction } = useQuery("transactionsCache", async () => {
  //   const response = await API.get("/transaction1");
  //   return response.data.data;
  // });

  // console.log(transaction)

  const [transactions, SetTransactions] = useState([]);
 

  const getTransactions = async () => {
    try {
      let response = await API.get("/transactions");
      SetTransactions(response.data.data);
    } catch (e) {
      console.log(transactions);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);



  return (
    <>
      <NavbarAdmin />
      <Container className="mt-5 pt-5">
        <h2 className="text-main mt-5">Income Transaction</h2>
        <Table bordered style={{ borderColor: "#828282" }} className="mt-5 pt-5">
          <thead className="bg-second">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Income</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item, index) => (
              <tr
                
                key={index}
                
                className={item?.carts.length === 0 ? "fd" : ""}
              >
                <td>{index + 1}</td>
                <td>{item?.user.name}</td>
                <td>{item?.user.address}</td>
                <td>{item?.user.email}</td>
                <td>{item?.total}</td>
                <td>{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
