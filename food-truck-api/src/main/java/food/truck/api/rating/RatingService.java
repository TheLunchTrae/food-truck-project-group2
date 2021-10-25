package food.truck.api.rating;

import food.truck.api.foodtruck.FoodTruck;
import org.springframework.web.bind.annotation.*;

public class RatingService {
    //@Autowired
    private RatingRepository ratingRepository;

    //TODO - implement all of these
    //Get all a truck's ratings
    @GetMapping("/api/rating/get")
    public void getRatings(@RequestBody FoodTruck foodTruck){}

    //Add rating associated with the food truck
    @PostMapping("/api/rating/add")
    public void addRating(@RequestBody FoodTruck foodTruck){}

}
