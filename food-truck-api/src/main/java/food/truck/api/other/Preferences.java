package food.truck.api.other;

import lombok.Data;

@Data
public class Preferences {
    private String foodType;
    private String location;
    private Integer rating;
    private Float price;
}
