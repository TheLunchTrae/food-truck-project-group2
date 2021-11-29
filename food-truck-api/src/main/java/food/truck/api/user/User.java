package food.truck.api.user;

import javax.persistence.*;

import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.foodtruck.Location;
import lombok.Data;

import java.sql.Date;
import java.util.*;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {
    public static final String TABLE_NAME = "USERS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "USER_ID")
    Long id;

    @Column(name = "USERNAME")
    String userName;

    @Column(name = "EMAIL_ADDRESS")
    String emailAddress;

    @Column(name = "PASSWORD")
    String password;

    @Column(name = "USER_TYPE")
    String userType;

    @Column(name = "SIGNUP_DATE")
    Date signupDate;

    @Column(name = "TOKEN")
    String token;

    //List of truckIds that user is subscribed to
    @ElementCollection
    List<Long> subscriptions;

    @ElementCollection
    List<String> foodTypePreferences;

    //NOTE - this is just over the rating value (why it's not a Rating class)
    @Column(name = "RATING_PREFERENCE")
    Integer ratingPreference;

    @Column(name = "PRICE_PREFERENCE")
    Float pricePreference;

    @Column(name = "LOCATION_PREFERENCE")
    Location locationPreference;

    //TODO - CODE EVERYWHERE TO ALLOW USER TO SET THIS
    @Column(name = "DISTANCE_PREFERENCE")
    Integer distancePreference;

    public void addFoodTypePreferences(List<String> foodTypePreferences){
        if (this.foodTypePreferences == null){
            this.foodTypePreferences = new LinkedList<>();
        }
        for (String foodType : foodTypePreferences){
            //Don't add preference if it's already there
            if (!this.foodTypePreferences.contains(foodType)){
                this.foodTypePreferences.add(foodType);
            }
        }
    }

    public void addSubscription(long truckId){
        if (subscriptions == null){
            subscriptions = new LinkedList<>();
        }
        //Don't add subscription if already present
        if (!subscriptions.contains(truckId)){
            subscriptions.add(truckId);
        }
    }

    public void deleteSubscription(long truckId){
        //Only remove if it contains the truck
        if (subscriptions.contains(truckId))
            subscriptions.remove(truckId);
    }

    //TODO - iterate over all food trucks & their ratings, return those w/matching userid
    public List<Rating> getUserRatings(){
        return null;
    }
    public List<Long> getSubscriptions(){
        return subscriptions;
    }

    public String toString() {
        return emailAddress + "," + password + "," + userType;
    }
}
