package food.truck.api.other;

import lombok.Data;

@Data
public class Event {
    private long userId;
    private String eventName;
    private String val;
}
