package food.truck.api.user;

import lombok.Data;

import javax.persistence.*;

@Data
@Embeddable
public class Rating {
    //UserId of user who set rating
    private Long userId;
    private Integer value;
    //May be null
    private String review;

    public Rating() {}
    public Rating(long truckId, int value, String review){
        this.userId = truckId;
        this.value = value;
        //Review may be null(assuming none was entered)
        this.review = review;
    }
}
