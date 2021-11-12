package food.truck.api.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

import java.sql.Date;

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

    @Column(name = "USER_TOKEN")
    String userToken;

    @Column(name = "FOOD_TYPE_PREFERENCE")
    String foodTypePreference;

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
