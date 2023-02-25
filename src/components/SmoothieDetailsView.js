import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Label } from 'reactstrap';
import TopBar from '../TopBar';

const SmoothieDetails = () => {
  const initialFormState = {
    name: '',
    ingredients: [{name: '', weight: '' }],
    nutritionValues: {}
  };
  const [smoothie, setSmoothie] = useState(initialFormState);
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/smoothies/${id}`)
        .then(response => response.json())
        .then(data => setSmoothie(data))
    }
  }, [id, setSmoothie]);

  const title = <h2>{smoothie.name}</h2>;

  return (
    <div>
      <TopBar/>
      <Container>
        {title}
        <Form>          
          <div id="ingredients" className="col-md-6">
            <Label for="ingredients">Ingredients (name, weight):</Label>
            {smoothie.ingredients.map((ingredient, idx) => (
            <FormGroup className="form-inline col-md-6 d-flex flex-row">
              <Label for="weight">{ingredient.name}:</Label>
              <div className="col-md-2" name="weight" id="weight">{ingredient.weight}</div>
            </FormGroup>
            ))}
          </div>            
         
          <div id="nutritionValues">
            <Label for="nutritionValues">Nutritions (in grams)</Label>
            <div className="form-inline col-md-4 d-flex flex-row">
              <Label for="fat">Fat:</Label> 
              <div name="fat" id="fat">{smoothie.nutritionValues.fat}</div>
            </div>
            <div className="form-inline col-md-4 d-flex flex-row">
              <Label for="carbohydrates">Carbohydrates</Label>
              <div name="carbohydrates" id="carbohydrates">{smoothie.nutritionValues.carbohydrates}</div>              
            </div>
            <div className="form-inline col-md-4 d-flex flex-row">
              <Label for="protein">Protein:</Label>
              <div name="protein" id="protein">{smoothie.nutritionValues.protein}</div>              
            </div>
            <div className="form-inline col-md-4 d-flex flex-row">
              <Label for="minerals">Minerals:</Label>
              <div name="minerals" id="minerals">{smoothie.nutritionValues.minerals}</div>              
            </div>
            <div className="form-inline col-md-4 d-flex flex-row">
                <Label for="vitamins">Vitamins:</Label>
                <div name="vitamins" id="vitamins">{smoothie.nutritionValues.vitamins}</div>
            </div>
          </div>
          <FormGroup>
            <Button color="secondary" tag={Link} to="/smoothies/view">Close</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default SmoothieDetails;