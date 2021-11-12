package food.truck.api.other;

import lombok.Data;

@Data
public class Event {
    private long userId;
    private String eventName;
    private String val;

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
