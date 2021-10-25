package food.truck.api.notification;

import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.user.User;
import org.springframework.web.bind.annotation.*;

public class NotificationService {
    //@Autowired
    private NotificationRepository notificationRepository;

    //TODO - implement all of these
    //Get's a user's notifications
    @GetMapping("/api/notification/get")
    public void getNotifications(@RequestBody User user){}

    //Sends marketing notifications to every user (will require special queries)
    //In practice this will involve inserting a notification to the DB with the given
    //message (of type marketing - TODO - add message as parameter?) and a query
    //is called on a user when they log in for every marketing notification present
    //and subscription notifications to any food trucks they have subscribed to
    @PostMapping("/api/notification/marketing")
    public void sendMarketingNotifications(@RequestBody FoodTruck foodTruck){}

    @PostMapping("/api/notification/subscription")
    public void sendSubscriptionNotifications(@RequestBody FoodTruck foodTruck){
        //Will involve calling SubscriptionService.getSubscriptions(foodTruck)
        //to get all user-subscriptions associated with this food truck
    }
}
