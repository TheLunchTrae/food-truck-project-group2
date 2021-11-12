package food.truck.api.foodtruck;

import food.truck.api.other.FoodItem;
import lombok.Data;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Data
@Entity
@Table(name = FoodTruck.TABLE_NAME)
public class FoodTruck {
    public static final String TABLE_NAME = "FOOD_TRUCKS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "TRUCK_ID")
    Long truckId;

    @Column(name = "TRUCK_NAME")
    String truckName;

    //TODO - make dependent on owner table
    @Column(name = "OWNER_ID")
    Long ownerId;

    //TODO - route won't be String in future, this is temporary
    //@Column(name = "ROUTE")
    //String route;
    @ElementCollection
    List<String> route;

    @ElementCollection
    List<Integer> ratings;

    @ElementCollection
    List<FoodItem> menu;
    //String menu;

    @Column(name = "SCHEDULE")
    String schedule;

    @Column(name = "DESCRIPTION")
    String description;

    //Adds a food item to the menu
    public void addFoodItem(FoodItem foodItem){
        //Initialize if menu doesn't exist
        if (this.menu == null){
            menu = new LinkedList<FoodItem>();
        }
        this.menu.add(foodItem);
    }

    //Add location (as a string) to the route list
    public void addRouteLocation(String location){
        //Initialize if route doesn't exist
        if (this.route == null){
            route = new LinkedList<String>();
        }
        this.route.add(location);
    }

    //Add a rating - TODO error check
    public void addRating(int rating){
        //Initialize if ratings doesn't exist
        if (this.ratings == null){
            ratings = new LinkedList<Integer>();
        }
        this.ratings.add(rating);
    }

    //Return the average ratings
    public float averageRating(){
        int sum = 0;
        for (Integer i : ratings){
            sum += i;
        }
        return sum / ratings.size();
    }

    public String toString(){
        return truckName + "," + route + "," + schedule + "," + menu + "," + description;
    }

}
