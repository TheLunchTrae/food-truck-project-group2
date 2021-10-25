package food.truck.api.subscription;

import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.user.User;
import org.springframework.web.bind.annotation.*;

public class SubscriptionService {
    //@Autowired
    private SubscriptionRepository subscriptionRepository;
    //TODO - implement all of these

    //Add user's subscription to a food truck - or not if it already exists?
    @PostMapping("/api/subscription")
    public void addSubscription(@RequestBody User user, @RequestBody FoodTruck foodTruck){}

    //Gets all users who have subscribed to a particular food truck
    //NOTE - this does not involve any requests because it will only be called by
    //NotificationService when looking up who to send subscriptions to
    public void getSubscriptions(FoodTruck foodTruck) {

    }

}
