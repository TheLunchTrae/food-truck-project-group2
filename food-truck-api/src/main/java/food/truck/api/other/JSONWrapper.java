package food.truck.api.other;
import lombok.Data;

@Data
public class JSONWrapper {
    String location;
    Integer rating;
    FoodItem foodItem;
}
