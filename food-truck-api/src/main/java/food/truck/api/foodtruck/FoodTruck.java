package food.truck.api.foodtruck;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = FoodTruck.TABLE_NAME)
public class FoodTruck {
    public static final String TABLE_NAME = "FOOD_TRUCKS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )

    @Column(name = "TRUCK_ID")
    Long truckId;

    @Column(name = "TRUCK_NAME")
    String name;

    @Column(name = "OWNER_ID")
    Long ownerId;

    //TODO - route won't be String in future, this is temporary
    @Column(name = "ROUTE")
    String route;

    @Column(name = "SCHEDULE")
    String schedule;

    //TODO - menu probably won't be String in future
    @Column(name = "MENU")
    String menu;

    @Column(name = "DESCRIPTION")
    String description;

    public String toString(){
        return name + "," + route + "," + schedule + "," + menu + "," + "," + description;
    }

}
