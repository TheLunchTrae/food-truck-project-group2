package food.truck.api.foodtruck;

import food.truck.api.user.Rating;
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

    @ElementCollection
    List<Location> route;

    @ElementCollection
    List<Rating> ratings;

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

    //Removes a food item from the menu
    public void deleteFoodItem(int itemIndex){
        //Don't do if out of bounds
        if (itemIndex >= menu.size()){
            return;
        }
        System.out.println("Removing "+menu.get(itemIndex));
        this.menu.remove(itemIndex);
    }


    //Add location (as XY coordinates) to the route list
    public void addRouteLocation(Location location){
        //Initialize if route doesn't exist
        if (this.route == null){
            route = new LinkedList<>();
        }
        this.route.add(location);
    }

    //Remove route location from the route
    public void deleteRouteLocation(int routeIndex){
        //Don't do if out of bounds
        if (routeIndex >= route.size()){
            return;
        }
        System.out.println("Removing "+route.get(routeIndex));
        this.route.remove(routeIndex);
    }

    //TODO - implement
    public Location findNearestRouteLocation(Location userLocation){
        if (userLocation == null){
            return null;
        }


        return null;
    }

    //Add a rating - TODO error check
    public void addRating(Rating rating){
        //Initialize if ratings doesn't exist
        if (this.ratings == null){
            ratings = new LinkedList<>();
        }
        this.ratings.add(rating);
    }

    //Return the average ratings
    public float averageRating(){
        int sum = 0;
        for (Rating r : ratings){
            sum += r.getValue();
        }
        if (ratings.size() > 0) {
            return sum / ratings.size();
        } else {
            return 0;
        }
    }

    //Return average price of the food items
    public float averagePrice(){
        int sum = 0;
        for (FoodItem fi : menu){
            sum += fi.getFoodItemPrice();
        }
        if (ratings.size() > 0) {
            return sum / ratings.size();
        } else {
            return 0;
        }
    }

    public List<Rating> getRatings(){
        return ratings;
    }

    public String toString(){
        return truckName + "," + route + "," + schedule + "," + menu + "," + description;
    }

}
