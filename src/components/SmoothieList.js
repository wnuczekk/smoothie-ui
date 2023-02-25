import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import TopBar from '../TopBar';

const SmoothieList = () => {

  const [smoothies, setSmoothies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { option } = useParams();

  const edit = option === 'edit'
  const view = option === 'view'

  useEffect(() => {
    setLoading(true);

    fetch('/smoothies')
      .then(response => response.json())
      .then(data => {
        setSmoothies(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/smoothies/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedSmoothies = [...smoothies].filter(i => i.id !== id);
      setSmoothies(updatedSmoothies);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }  

  const smoothieList = smoothies.map(smoothie => {
    return <tr key={smoothie.id}>
      <td style={{whiteSpace: 'nowrap'}}>{smoothie.name}</td>
      <td>
        {edit &&
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/smoothies/edit/" + smoothie.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(smoothie.id)}>Delete</Button>
        </ButtonGroup>
        }
        {view &&
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/smoothies/view/" + smoothie.id}>Details</Button>
          <Button size="sm" color="danger" onClick={() => alert("Added to basket")}>Order</Button>
        </ButtonGroup>
        }
      </td>
    </tr>
  });

  return (
    <div>
      <TopBar/>
      <Container fluid>
        {edit &&
          <div className="float-end">
            <Button color="success" tag={Link} to="/smoothies/edit/new">Add smoothie</Button>
          </div>
        }
        {edit &&
         <h3>Manage Smoothies</h3>
        }        
        {view &&
         <h3>Smoothies</h3>
        }
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {smoothieList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default SmoothieList;