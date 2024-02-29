import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async() =>{
      const response = await fetch('https://react-http-d75ae-default-rtdb.firebaseio.com/meals.json');
      console.log(response);
      if(!response.ok){
        throw new Error('Something went wrong...!!');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for(const key in responseData){
        loadedMeals.push({
          id:key, 
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch(error=>{     //AS it is an async function, try catch will not work as there is no await keyword allowed!!
      setIsLoading(false);
      setHttpError(error.message);
    });
    
    },[])

  if(isLoading){
    return(
      <section className={classes.MealIsLoading}><p>Loading...</p></section>
    );
  }  

  if(httpError){
    return(
      <section className={classes.MealIsLoading}><p>{httpError}</p></section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
