package food.truck.api.other;

import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.rating.Rating;
import food.truck.api.subscription.Subscription;
import lombok.Data;

import java.util.List;

@Data
public class DashboardData {
    //TODO - change from string to actual classes
    private List<Subscription> subscriptions;
    private List<Rating> ratings;
    private List<FoodTruck> foodTrucks;
}
