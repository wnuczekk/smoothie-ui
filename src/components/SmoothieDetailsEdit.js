import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import TopBar from '../TopBar';

const SmoothieDetailsEdit = () => {
  const initialFormState = {
    name: '',
    ingredients: [{name: '', weight: '' }],
    nutritionValues: {}
  };
  const [smoothie, setSmoothie] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/smoothies/${id}`)
        .then(response => response.json())
        .then(data => setSmoothie(data))
    }
  }, [id, setSmoothie]);

  const addIngredient = () => {
    const ingredients = smoothie.ingredients.concat([{ name: '', weight: ''}]);

    setSmoothie({ ...smoothie, ingredients })
  }

  const removeIngredient = (idx) => () => {
    const ingredients = smoothie.ingredients.filter((s, sidx) => idx !== sidx);

    setSmoothie({ ...smoothie, ingredients })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setSmoothie({ ...smoothie, [name]: value })
  }
  
  const handleChangeNutritions = (event) => {
    const { name, value } = event.target

    const nutritionValues = { ...smoothie.nutritionValues, [name]: value };

    setSmoothie({ ...smoothie, nutritionValues })
  }

  const handleIngrediendChange = (idx, name) => (event) => {
    const ingredients = smoothie.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, [name]: event.target.value };
    });
    
    setSmoothie({ ...smoothie, ingredients })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/smoothies${smoothie.id ? `/${smoothie.id}` : ''}`, {
      method: (smoothie.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(smoothie)
    });
    setSmoothie(initialFormState);
    navigate('/smoothies/edit');
  }

  const title = <h2>{smoothie.id ? 'Edit Smoothie' : 'Add Smoothie'}</h2>;

  return (
    <div>
      <TopBar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup className="col-md-4">
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={smoothie.name}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <div id="ingredients" className="col-md-4">
            <Label for="ingredients">Ingredients (name, weight)</Label>
            {smoothie.ingredients.map((ingredient, idx) => (
            <FormGroup className="col-md-4 d-flex flex-row">
              <Input className="col-md-2" type="text" name="name" id="ingredient" value={ingredient.name}
                    onChange={handleIngrediendChange(idx, "name")}/>
              <Input className="col-md-2" type="number" name="weight" id="ingredient" value={ingredient.weight}
                    onChange={handleIngrediendChange(idx, "weight")}/>
              <Button type="button" onClick={removeIngredient(idx)} className="small">remove</Button>
            </FormGroup>
            ))}
            <Button color="primary" onClick={addIngredient}>Add</Button>
          </div>            
         
          <div id="nutritionValues">
            <Label for="nutritionValues">Nutritions (in grams)</Label>
            <div className="row form-inline">
              <FormGroup className="col-md-4">
                <Label for="fat">Fat</Label>
                <Input type="number" name="fat" id="fat" value={smoothie.nutritionValues.fat}
                      onChange={handleChangeNutritions}/>
              </FormGroup>
            </div>
            <div className="form-inline">
              <FormGroup className="col-md-4">
                <Label for="carbohydrates">Carbohydrates</Label>
                <Input type="number" name="carbohydrates" id="carbohydrates" value={smoothie.nutritionValues.carbohydrates}
                      onChange={handleChangeNutritions} />
              </FormGroup>
            </div>
            <div className="form-inline">
              <FormGroup className="col-md-4">
                <Label for="protein">Protein</Label>
                <Input type="number" name="protein" id="protein" value={smoothie.nutritionValues.protein}
                      onChange={handleChangeNutritions} />
              </FormGroup>
            </div>
            <div className="form-inline">
              <FormGroup className="col-md-4">
                <Label for="minerals">Minerals</Label>
                <Input type="number" name="minerals" id="minerals" value={smoothie.nutritionValues.minerals}
                      onChange={handleChangeNutritions} />
              </FormGroup>
            </div>
            <div className="form-inline">
              <FormGroup className="col-md-4">
                <Label for="vitamins">Vitamins</Label>
                <Input type="number" name="vitamins" id="vitamins" value={smoothie.nutritionValues.vitamins}
                      onChange={handleChangeNutritions}/>
              </FormGroup>
            </div>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/smoothies/edit">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default SmoothieDetailsEdit;