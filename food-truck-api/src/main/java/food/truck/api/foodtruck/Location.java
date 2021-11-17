package food.truck.api.foodtruck;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Location {
    private Double xCoordinate;
    private Double yCoordinate;
    public Location(){}
    public Location(double xCoordinate, double yCoordinate){
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}
