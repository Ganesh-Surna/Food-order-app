import classes from "./MealsList.module.css";
import MealsItem from "./MealsItem/MealsItem";
import Card from "../UI/Card";

const meals=[
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
      },
      {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
      },
      {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
      },
      {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
      },
]

const MealsList=()=>{
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