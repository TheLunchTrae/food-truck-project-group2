package food.truck.api.rating;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = Rating.TABLE_NAME)
public class Rating {
    public static final String TABLE_NAME = "NOTIFICATION";
    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "RATING_ID")
    Long id;

    //NOTE - a star rating is optional - keep this in mind
    @Column(name = "STAR_RATING")
    int starRating;

    @Column(name = "REVIEW")
    String review;
}
