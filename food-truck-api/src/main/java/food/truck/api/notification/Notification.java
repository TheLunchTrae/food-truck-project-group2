package food.truck.api.notification;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = Notification.TABLE_NAME)
public class Notification {
    public static final String TABLE_NAME = "NOTIFICATION";
    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "NOTIFICATION_ID")
    Long id;

    //NOTE - may only be of "marketing" or "subscription" types
    @Column(name = "TYPE")
    String type;

    @Column(name = "MESSAGE")
    String message;
}
