package food.truck.api.foodtruck;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Location {
    private Double latitude;
    private Double longitude;
    public Location(){}
    public Location(double latitude, double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
