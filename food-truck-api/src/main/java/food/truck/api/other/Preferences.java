package food.truck.api.other;

import lombok.Data;

@Data
public class Preferences {
    //TODO - possibly modify
    private long userId;
    private String foodType;
    private String location;
    private int rating;
    private float price;
}
