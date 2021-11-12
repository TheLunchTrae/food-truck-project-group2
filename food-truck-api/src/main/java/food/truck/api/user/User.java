package food.truck.api.user;

import javax.persistence.*;

import lombok.Data;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {
    public static final String TABLE_NAME = "USER";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "USER_ID")
    Long id;

    @Column(name = "USERNAME")
    String userName;

    @Column(name = "EMAIL_ADDRESS")
    String emailAddress;

    @Column(name = "PASSWORD")
    String password;

    @Column(name = "USER_TYPE")
    String userType;

    @Column(name = "SIGNUP_DATE")
    Date signupDate;

    @Column(name = "TOKEN")
    String token;

    @ElementCollection
    @Column(name="FOOD_TYPE_PREFERENCES")
    private List<String> foodTypePreferences;

    @Column(name = "RATING_PREFERENCE")
    Integer ratingPreference;

    @Column(name = "PRICE_PREFERENCE")
    Float pricePreference;

    @Column(name = "LOCATION_PREFERENCE")
    String locationPreference;

    public String toString() {
        return emailAddress + "," + password + "," + userType;
    }
}
