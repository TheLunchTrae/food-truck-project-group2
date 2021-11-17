package food.truck.api.other;

import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.user.Rating;
import lombok.Data;

import java.util.List;

@Data
public class DashboardData {
    //TODO - change from string to actual classes
    private List<Long> subscriptions;
    private List<Rating> ratings;
    private List<FoodTruck> foodTrucks;
}
