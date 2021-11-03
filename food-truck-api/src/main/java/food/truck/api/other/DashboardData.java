package food.truck.api.other;

import food.truck.api.foodtruck.FoodTruck;
import lombok.Data;

@Data
public class DashboardData {
    //TODO - change from string to actual classes
    private String[] subscriptions;
    private String[] ratings;
    private FoodTruck[] foodTrucks;
}
