package food.truck.api.foodtruck;

import food.truck.api.other.JSONWrapper;
import food.truck.api.other.TruckAndStringHolder;
import food.truck.api.user.Rating;
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
    public ResponseEntity addFoodTruck(@RequestBody TruckAndStringHolder truckAndString, @RequestHeader(name="token")Long token){
        FoodTruck postFoodTruck;
        truckAndString.getFoodTruck().setOwnerId(token);
        truckAndString.getFoodTruck().setMenu(FoodTruckService.parseMenu(truckAndString.getString()));
        System.out.println(truckAndString.getFoodTruck());
        //NOTE - MUST HAVE OWNER ID SET ON THE FRONT END!!!!!!
        if ((postFoodTruck = foodTruckService.addFoodTruck(truckAndString.getFoodTruck())) != null){
            return ResponseEntity.ok()
                    .body(postFoodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Truck Already Exists");
        }
    }

    //idk what the response should be - also may want to confirm owner token as permission? idk
    @GetMapping("/api/deleteTruck/{id}")
    public ResponseEntity deleteFoodTruck(@PathVariable long id){
        FoodTruck ft = foodTruckService.deleteFoodTruck(id);
        if (ft != null){
            return ResponseEntity.ok()
                    //.header("Content-Type", "application/json")
                    .body("success");
        } else {
            return ResponseEntity.ok()
                    .body("Deleting food truck failed");
        }
    }

    @PostMapping("/api/modifyTruck")
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
    @PostMapping("/api/modifyTruck/menu")
    public ResponseEntity modifyFoodTruckMenuAddFoodItem(@RequestBody FoodItem foodItem, @RequestHeader Long truckId){
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(truckId)) != null){
            foodTruck = foodTruckService.modifyFoodTruckMenuAddFoodItem(foodTruck, foodItem);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }

    //IMPORTANT NOTE - assumption is that backend sends the index of the item to be removed (having mapped them to the front page)
    @GetMapping("/api/modifyTruck/menu/remove/{itemIndex}")
    public ResponseEntity modifyFoodTruckMenuDeleteFoodItem(@PathVariable int itemIndex, @RequestHeader Long truckId){
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(truckId)) != null){
            foodTruck = foodTruckService.modifyFoodTruckMenuDeleteFoodItem(foodTruck, itemIndex);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }


    //Call via editTruck frontend page
    @PostMapping("/api/modifyTruck/route")
    public ResponseEntity modifyTruckRoute(@RequestBody Location location, @RequestHeader Long truckId){
        //System.out.println(location + ' '+ truckID);
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(truckId)) != null){
            foodTruck = foodTruckService.modifyFoodTruckAddRouteLocation(foodTruck, location);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }

    //IMPORTANT NOTE - assumption is that backend sends the index of the item to be removed (having mapped them to the front page)
    @GetMapping("/api/modifyTruck/route/remove/{locationIndex}")
    public ResponseEntity modifyFoodTruckDeleteRouteLocation(@PathVariable int locationIndex, @RequestHeader Long truckId){
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(truckId)) != null){
            foodTruck = foodTruckService.modifyFoodTruckDeleteRouteLocation(foodTruck, locationIndex);
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find food truck with id");
        }
    }

    //NOTE - don't need to call via front end for now (just test via postman)
    //TODO - add user token as header
    @PostMapping("/api/addRating")
    public ResponseEntity addRatingToFoodTruck(@RequestBody Rating rating, @RequestHeader Long truckID){
        FoodTruck foodTruck;
        if ((foodTruck = foodTruckService.getFoodTruckWithId(truckID)) != null){
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

    //TODO - add other search filters
    @GetMapping("/api/searchQuery/{search}")
    public ResponseEntity getTruckSearchResults(@PathVariable String search, @RequestHeader(name="token")Long id) {
        User user = userService.getUserWithId(id);
        if (user != null) {
            return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(foodTruckService.getTruckSearchResults(search));
        } else {
            return ResponseEntity.ok()
                .body("Failed to find user with id");
        }
    }

    //In progress
    @PostMapping("/api/map/nearestTrucks")
    public ResponseEntity getNearestTrucks(@RequestHeader Long userId){
        User user = userService.getUserWithId(userId);
        if (user != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(foodTruckService.getNearestTrucks(user.getLocationPreference(), user.getDistancePreference()));
        } else {
            return ResponseEntity.ok()
                    .body("Failed to find user with id");
        }
    }
}
