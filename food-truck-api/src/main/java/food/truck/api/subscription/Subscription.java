package food.truck.api.subscription;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = Subscription.TABLE_NAME)
public class Subscription {
    public static final String TABLE_NAME = "SUBSCRIPTION";
    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "SUBSCRIPTION_ID")
    Long id;

    @Column(name = "CUSTOMER_ID")
    Long customerId;

    @Column(name = "FOOD_TRUCK_ID")
    Long foodTruckId;
}
