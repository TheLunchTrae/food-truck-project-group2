package food.truck.api.foodtruck;

import food.truck.api.other.FoodItem;
import food.truck.api.user.User;
import food.truck.api.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
public class FoodTruckController {
    private UserService userService;
    private FoodTruckService foodTruckService;

    @Autowired
    public FoodTruckController(UserService userService, FoodTruckService foodTruckService){
        this.userService = userService;
        this.foodTruckService = foodTruckService;
    }

    @PostMapping("/api/addTruck")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity addFoodTruck(@RequestBody FoodTruck foodTruck, @RequestHeader(name="token")Long token){
        FoodTruck postFoodTruck;
        foodTruck.setOwnerId(token);
        System.out.println(foodTruck);
        //NOTE - MUST HAVE OWNER ID SET ON THE FRONT END!!!!!!
        if ((postFoodTruck = foodTruckService.addFoodTruck(foodTruck)) != null){
            return ResponseEntity.ok()
                    .body(postFoodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Truck Already Exists");
        }
    }

    @PostMapping("/api/modifyTruck")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity modifyFoodTruck(@RequestBody FoodTruck foodTruckDiff){
        FoodTruck postFoodTruck;
        //NOTE - MUST HAVE OWNER ID SET ON THE FRONT END!!!!!!
        if ((postFoodTruck = foodTruckService.modifyFoodTruck(foodTruckDiff)) != null){
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(postFoodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Food truck modification failed");
        }
    }

    //Call via editTruck frontend page
    @PostMapping("/api/modifyTruck/menu/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity modifyFoodTruckMenuAddFoodItem(@RequestBody FoodItem foodItem, @PathVariable long id){
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(id)) != null){
            foodTruck = foodTruckService.modifyFoodTruckMenuAddFoodItem(foodTruck, foodItem);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }
    //Call via editTruck frontend page
    @PostMapping("/api/modifyTruck/route/{id}")
    public ResponseEntity modifyFoodTruckAddRouteLocation(@RequestBody String location, @PathVariable long id){
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(id)) != null){
            foodTruck = foodTruckService.modifyFoodTruckAddRouteLocation(foodTruck, location);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }

    //NOTE - don't need to call via front end for now (just test via postman)
    @PostMapping("/api/addRating/{id}")
    public ResponseEntity addRatingToFoodTruck(@RequestBody Integer rating, @PathVariable long id){
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(id)) != null){
            foodTruck = foodTruckService.addRatingToFoodTruck(foodTruck, rating);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }




    @GetMapping("/api/getTruckName/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getFoodTruckNameWithId(@PathVariable long id){
        String foodTruckName;
        if ((foodTruckName = foodTruckService.getFoodTruckNameWithId(id)) != null){
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruckName);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }

    @GetMapping("/api/getTruck/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getFoodTruckWithId(@PathVariable long id){
        FoodTruck postFoodTruck;
        if ((postFoodTruck = foodTruckService.getFoodTruckWithId(id)) != null){
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(postFoodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }

    @GetMapping("/api/search/recommended")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getRecommendedTrucks(@RequestHeader(name="token")Long id){
        User user = userService.getUserWithId(id);
        if (user != null){
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruckService.getRecommendedTrucks(user));
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find user with id");
        }
    }

}
