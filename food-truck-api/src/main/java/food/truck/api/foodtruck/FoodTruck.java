package food.truck.api.foodtruck;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = FoodTruck.TABLE_NAME)
public class FoodTruck {
    public static final String TABLE_NAME = "FOOD_TRUCKS";

    private int truck_id;

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )

    @Column(name = "USER_ID")
    Long id;

    @Column(name = "EMAIL_ADDRESS")
    String emailAddress;

    @Column(name = "PASSWORD")
    String password;

    @Column(name = "USER_TYPE")
    String userType;

}
