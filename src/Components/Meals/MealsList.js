import classes from "./MealsList.module.css";
import MealsItem from "./MealsItem/MealsItem";
import Card from "../UI/Card";
import { useCallback, useEffect, useState } from "react";

// const DUMMY_MEALS=[
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//       },
//       {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//       },
//       {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//       },
//       {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//       },
// ]


const MealsList=()=>{

  const [meals,setMeals]=useState([]);

  const [err,setErr]=useState();

  const [isLoading,setIsLoading]=useState(true);

  const fetchMeals=useCallback(async ()=>{
        const response=await fetch("https://food-app-a6f82-default-rtdb.firebaseio.com/meals.json");

        if(!response.ok){
          throw new Error("Something went wrong!");
        }

        const data=await response.json();
        console.log(data);

        let loadedMeals=[];

        for(const key in data){
          loadedMeals.push({
            id:key,
            name:data[key].name,
            description:data[key].description,
            price:data[key].price,
          })
        }

        setMeals(loadedMeals);
        setIsLoading(false);
  },[]);

    useEffect(()=>{
        fetchMeals().catch((error)=>{
          setIsLoading(false);
          setErr(error.message);
        });
    },[fetchMeals]);

    if(isLoading){
      return <section className={classes.section}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    }

    if(err){
      return <section className={classes.section}>
        <Card>
          <p className={classes.error}>{err}</p>
        </Card>
      </section>
    }

    const mealsList=meals.map((meal)=>{
        return <MealsItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}  />
    });
    return(
        <section className={classes["meals-list"]}>
          <Card>
            <ul className={classes.list}>
                {mealsList}
            </ul>
            </Card>
        </section>
    );
};
export default MealsList;