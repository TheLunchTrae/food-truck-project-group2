package food.truck.api.other;

import food.truck.api.foodtruck.Location;
import lombok.Data;

import java.util.List;

@Data
public class Preferences {
    private List<String> foodTypes;
    private Location location;
    //NOTE - must be integer, not rating (only concerned with rating value)
    private Integer rating;
    private Float price;
}
