package food.truck.api.other;
import food.truck.api.foodtruck.FoodItem;
import food.truck.api.foodtruck.Location;
import food.truck.api.user.Rating;
import lombok.Data;

@Data
public class JSONWrapper {
    Location location;
    Rating rating;
    FoodItem foodItem;
}
